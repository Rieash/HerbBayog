"""
API Endpoints for User Photo Submissions
"""
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.utils import timezone
from django.conf import settings
from PIL import Image
from io import BytesIO
import uuid

from .models import HerbalPlant, UserPhotoSubmission

def get_or_create_session(request):
    """Get or create session ID for non-logged users"""
    if not request.session.session_key:
        request.session.create()
    return request.session.session_key

@csrf_exempt
@require_http_methods(["POST"])
def submit_photo(request):
    """
    API endpoint for users to submit plant photos
    
    POST /api/submit-photo/
    {
        'image': file,
        'plant_name': 'Bayabas',
        'ai_prediction': 'Lagundi',  (optional - if correcting AI)
        'ai_confidence': 94.07,       (optional)
        'is_correction': true/false,  (optional)
        'latitude': 14.5995,          (optional)
        'longitude': 120.9842,        (optional)
        'location_name': 'Calbayog'   (optional)
    }
    """
    try:
        # Check if image provided
        if 'image' not in request.FILES:
            return JsonResponse({
                'success': False,
                'error': 'No image file provided'
            }, status=400)
        
        image_file = request.FILES['image']
        
        # Validate file type
        if not image_file.content_type.startswith('image/'):
            return JsonResponse({
                'success': False,
                'error': 'File must be an image'
            }, status=400)
        
        # Get form data
        plant_name = request.POST.get('plant_name', '').strip()
        ai_prediction = request.POST.get('ai_prediction', '').strip() or None
        ai_confidence = request.POST.get('ai_confidence')
        is_correction = request.POST.get('is_correction', 'false').lower() == 'true'
        latitude = request.POST.get('latitude')
        longitude = request.POST.get('longitude')
        location_name = request.POST.get('location_name', '').strip()
        
        if not plant_name:
            return JsonResponse({
                'success': False,
                'error': 'Plant name is required'
            }, status=400)
        
        # Convert confidence to float
        if ai_confidence:
            try:
                ai_confidence = float(ai_confidence)
            except ValueError:
                ai_confidence = None
        
        # Convert coordinates
        if latitude:
            try:
                latitude = float(latitude)
            except ValueError:
                latitude = None
        if longitude:
            try:
                longitude = float(longitude)
            except ValueError:
                longitude = None
        
        # Generate unique filename
        ext = os.path.splitext(image_file.name)[1]
        filename = f"submission_{uuid.uuid4().hex[:8]}_{plant_name.replace(' ', '_')}{ext}"
        
        # Save image
        file_path = default_storage.save(f'submissions/pending/{filename}', ContentFile(image_file.read()))
        
        # Create submission record
        submission = UserPhotoSubmission.objects.create(
            user=request.user if request.user.is_authenticated else None,
            session_id=get_or_create_session(request) if not request.user.is_authenticated else None,
            image=file_path,
            plant_name=plant_name,
            ai_prediction=ai_prediction,
            ai_confidence=ai_confidence,
            is_correction=is_correction,
            latitude=latitude,
            longitude=longitude,
            location_name=location_name,
            status='pending'
        )
        
        # Also save to contribution system for auto-retrain
        from .contribution import ContributionManager
        from .auto_trainer import get_auto_trainer
        
        manager = ContributionManager()
        image_full_path = os.path.join(settings.MEDIA_ROOT, file_path)
        
        print(f"[DEBUG] Processing contribution for {plant_name}: {image_full_path}")
        
        contrib_result = manager.save_contribution(
            image_path=image_full_path,
            plant_name=plant_name,
            ai_prediction=ai_prediction,
            contribution_type='correction' if is_correction else 'new_sample',
            notes=f"User submission via PhotoSubmission modal. Location: {location_name}",
            contributor_info={
                'source': 'photo_submission_modal',
                'submission_id': submission.id,
                'latitude': latitude,
                'longitude': longitude
            }
        )
        
        print(f"[DEBUG] Contribution result: {contrib_result}")
        
        # Check if auto-retrain should trigger
        auto_retrain_msg = ""
        contrib_stats = manager.get_stats()
        
        if contrib_result['success']:
            quality_score = contrib_result['quality_score']
            
            if quality_score >= 70:
                trainer = get_auto_trainer()
                auto_retrain_result = trainer.trigger_auto_retrain(manager, force=False)
                
                print(f"[DEBUG] Auto-retrain check: {auto_retrain_result}")
                
                if auto_retrain_result.get('triggered'):
                    auto_retrain_msg = f" 🚀 Major retrain triggered! Processing {auto_retrain_result['plants_being_trained']} with 50+ photos"
                else:
                    # Get current count for this specific plant
                    training_data = manager.get_contributions_for_training(min_quality_score=70, min_samples_per_plant=1)
                    plant_approved = [c for c in manager.get_contributions_for_training(min_quality_score=70, min_samples_per_plant=1).get('ready_for_training', {}).get(plant_name, []) if c['status'] == 'approved']
                    current_count = len(plant_approved)
                    auto_retrain_msg = f" ({current_count}/50 for major retrain) - keep contributing!"
            else:
                auto_retrain_msg = f" (Quality {quality_score}/100 - need 70+ for retrain)"
        else:
            auto_retrain_msg = f" (Failed: {contrib_result.get('error', 'Unknown error')})"
        
        print(f"[DEBUG] Final message: {auto_retrain_msg}")
        
        return JsonResponse({
            'success': True,
            'message': f'Photo submitted! Quality: {contrib_result.get("quality_score", "N/A")}/100.{auto_retrain_msg}',
            'submission_id': submission.id,
            'status': 'pending',
            'quality_score': contrib_result.get('quality_score'),
            'contribution_id': contrib_result.get('contribution_id'),
            'auto_retrain': auto_retrain_msg if auto_retrain_msg else None,
            'total_contributions': contrib_stats['total_contributions']
        })
        
    except Exception as e:
        import traceback
        print(f"[ERROR] submit_photo: {str(e)}")
        print(traceback.format_exc())
        return JsonResponse({
            'success': False,
            'error': 'Failed to submit photo'
        }, status=500)

@require_http_methods(["GET"])
def get_submission_status(request, submission_id):
    """Get status of a submission"""
    try:
        submission = UserPhotoSubmission.objects.get(id=submission_id)
        
        # Check ownership (only submitter or admin can view)
        is_owner = (
            (request.user.is_authenticated and submission.user == request.user) or
            (not request.user.is_authenticated and submission.session_id == get_or_create_session(request))
        )
        
        if not is_owner and not request.user.is_staff:
            return JsonResponse({
                'success': False,
                'error': 'Permission denied'
            }, status=403)
        
        return JsonResponse({
            'success': True,
            'submission': {
                'id': submission.id,
                'plant_name': submission.plant_name,
                'status': submission.status,
                'created_at': submission.created_at.isoformat(),
                'reviewed_at': submission.reviewed_at.isoformat() if submission.reviewed_at else None,
                'review_notes': submission.review_notes if is_owner or request.user.is_staff else None
            }
        })
        
    except UserPhotoSubmission.DoesNotExist:
        return JsonResponse({
            'success': False,
            'error': 'Submission not found'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
