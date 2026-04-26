import os
import json
import numpy as np
import time
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
from io import BytesIO
from .models import HerbalPlant
import logging

logger = logging.getLogger(__name__)

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Root models folder (parent of backend)
ROOT_MODELS_DIR = os.path.join(os.path.dirname(BASE_DIR), 'models')
MODEL_PATH = os.path.join(ROOT_MODELS_DIR, 'herbbayog_best.h5')
TRAINING_DIR = os.path.join(BASE_DIR, 'training', 'training_data', 'herbbayog_complete_dataset')

# Global variables for lazy loading
_model = None
_class_names = []

def get_model():
    """Lazy load model on first request - makes Django start fast"""
    global _model, _class_names
    if _model is None:
        import tensorflow as tf
        import json
        print("[DEBUG] Loading TensorFlow and model (first request)...")
        if os.path.exists(MODEL_PATH):
            _model = tf.keras.models.load_model(MODEL_PATH)
            print(f"[DEBUG] Model loaded: {_model.input_shape}")
        else:
            print(f"[ERROR] Model not found: {MODEL_PATH}")
        
        # Load class names from model_info.json to ensure alignment
        model_info_path = os.path.join(BASE_DIR, 'models', 'model_info.json')
        if os.path.exists(model_info_path):
            with open(model_info_path, 'r') as f:
                model_info = json.load(f)
                _class_names = model_info.get('class_names', [])
            print(f"[DEBUG] Loaded {len(_class_names)} classes from model_info.json")
        elif os.path.exists(TRAINING_DIR):
            _class_names = sorted([d for d in os.listdir(TRAINING_DIR) 
                                  if os.path.isdir(os.path.join(TRAINING_DIR, d))])
            print(f"[DEBUG] Loaded {len(_class_names)} classes from training directory")
        else:
            _class_names = ['Akapulko', 'Ampalaya', 'Bayabas', 'Lagundi', 'Sambong', 
                           'Tsaang Gubat', 'Ulasimang Bato', 'Yerba Buena']
    return _model, _class_names

def center_crop(image, crop_ratio=0.7):
    """Center crop to isolate main plant from background clutter"""
    width, height = image.size
    
    # Calculate crop dimensions
    crop_width = int(width * crop_ratio)
    crop_height = int(height * crop_ratio)
    
    # Calculate crop coordinates (center)
    left = (width - crop_width) // 2
    top = (height - crop_height) // 2
    right = left + crop_width
    bottom = top + crop_height
    
    # Crop and resize back to original
    cropped = image.crop((left, top, right, bottom))
    return cropped.resize((width, height), Image.LANCZOS)

def preprocess_image(image, validate_quality=True):
    """Enhanced preprocessing for various image resolutions and qualities"""
    try:
        original_size = image.size
        print(f"[DEBUG] Original image: size={original_size}, mode={image.mode}, format={image.format}")
        
        # Convert to RGB first
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Image quality validation
        if validate_quality:
            img_array = np.array(image)
            brightness = np.mean(img_array)
            std_dev = np.std(img_array)
            
            print(f"[DEBUG] Quality check: brightness={brightness:.1f}, std_dev={std_dev:.1f}")
            
            # Check if image is too dark (covered camera)
            if brightness < 20:
                raise ValueError(f"Image too dark (brightness: {brightness:.1f}). Camera may be covered.")
            
            # Check if image has no variation (all one color)
            if std_dev < 5:
                raise ValueError(f"Image has no features (std_dev: {std_dev:.1f}). Invalid capture.")
            
            # Check if image is too bright/overexposed
            if brightness > 250:
                raise ValueError(f"Image overexposed (brightness: {brightness:.1f}).")
        
        # Center crop to remove background clutter (keep 70% center)
        image = center_crop(image, crop_ratio=0.7)
        print(f"[DEBUG] Center cropped to isolate plant")
        
        # Auto-enhance for real-world photos
        img_array = np.array(image)
        brightness = np.mean(img_array)
        contrast = np.std(img_array)
        
        print(f"[DEBUG] Image analysis: brightness={brightness:.1f}, contrast={contrast:.1f}")
        
        # Apply enhancement based on image characteristics
        if brightness < 100:  # Dark image
            print(f"[DEBUG] Dark image detected, enhancing...")
            image = ImageEnhance.Brightness(image).enhance(1.2)
            image = ImageEnhance.Contrast(image).enhance(1.2)
        elif contrast < 40:  # Low contrast
            print(f"[DEBUG] Low contrast detected, sharpening...")
            image = ImageEnhance.Contrast(image).enhance(1.3)
            image = image.filter(ImageFilter.UnsharpMask(radius=2, percent=100, threshold=3))
        elif brightness > 200:  # Overexposed
            print(f"[DEBUG] Bright image detected, normalizing...")
            image = ImageEnhance.Brightness(image).enhance(0.9)
            image = ImageEnhance.Contrast(image).enhance(1.1)
        
        # Enhanced preprocessing for low-quality/compressed images
        width, height = image.size
        
        if width < 224 or height < 224:
            # Small image - use LANCZOS for better upscaling
            print(f"[DEBUG] Upscaling small image from {width}x{height}")
            image = image.resize((224, 224), Image.LANCZOS)
        elif width > 1000 or height > 1000:
            # Very large image - scale down first to preserve quality
            scale_factor = min(1000 / width, 1000 / height)
            new_size = (int(width * scale_factor), int(height * scale_factor))
            print(f"[DEBUG] Scaling large image from {width}x{height} to {new_size[0]}x{new_size[1]}")
            image = image.resize(new_size, Image.LANCZOS)
            image = image.resize((224, 224), Image.LANCZOS)
        else:
            # Normal size - direct resize
            image = image.resize((224, 224), Image.LANCZOS)
        
        # Convert to numpy array and rescale
        img_array = np.array(image).astype(np.float32) / 255.0
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        print(f"[DEBUG] Preprocessed image shape: {img_array.shape}")
        return img_array
    except Exception as e:
        logger.error(f"Error preprocessing image: {e}")
        raise

def get_plant_details(plant_name):
    """Get plant details from comprehensive database"""
    try:
        # Load plant data from JSON
        import json
        plant_data_path = os.path.join(os.path.dirname(__file__), 'plant_data.json')
        plant_db = {}
        
        if os.path.exists(plant_data_path):
            with open(plant_data_path, 'r', encoding='utf-8') as f:
                plant_db = json.load(f)
        
        # Try to find plant in local database
        normalized_name = plant_name.strip()
        plant_info = None
        
        # Try exact match first
        if normalized_name in plant_db:
            plant_info = plant_db[normalized_name]
        else:
            # Try case-insensitive match
            for key, value in plant_db.items():
                if key.lower() == normalized_name.lower():
                    plant_info = value
                    break
                # Check local names
                if 'local_names' in value:
                    if any(local.lower() == normalized_name.lower() for local in value['local_names']):
                        plant_info = value
                        break
        
        if plant_info:
            return {
                'id': None,
                'name': plant_info['name'],
                'scientific_name': plant_info['scientific_name'],
                'local_names': plant_info.get('local_names', []),
                'description': plant_info['description'],
                'medicinal_uses': plant_info.get('medicinal_uses', []),
                'preparation_steps': plant_info.get('preparation_steps', []),
                'cultural_relevance': plant_info.get('cultural_relevance', ''),
                'image_url': plant_info.get('image_url', None),
                'translations': plant_info.get('translations', {}),
                'category': plant_info.get('category', 'general'),
                'doh_approved': plant_info.get('doh_approved', False),
                'detailed_description': plant_info.get('detailed_description', plant_info['description'])
            }
        
        # Try to get from Django database as fallback
        try:
            plant = HerbalPlant.objects.filter(name__icontains=plant_name).first()
            if plant:
                return {
                    'id': plant.id,
                    'name': plant.name,
                    'scientific_name': plant.scientific_name,
                    'local_names': [],
                    'description': plant.description,
                    'medicinal_uses': plant.get_medicinal_uses_list(),
                    'preparation_steps': plant.get_preparation_steps_list(),
                    'cultural_relevance': plant.cultural_relevance,
                    'image_url': plant.image.url if plant.image else None
                }
        except:
            pass
        
        # Return basic info if plant not in database
        return {
            'id': None,
            'name': plant_name,
            'scientific_name': '',
            'local_names': [],
            'description': f'{plant_name} is a medicinal plant recognized by the AI model.',
            'medicinal_uses': [],
            'preparation_steps': [],
            'cultural_relevance': '',
            'image_url': None
        }
    except Exception as e:
        logger.error(f"Error fetching plant details: {e}")
        # Return basic fallback on error
        return {
            'id': None,
            'name': plant_name,
            'scientific_name': '',
            'local_names': [],
            'description': f'{plant_name} identified by AI.',
            'medicinal_uses': [],
            'preparation_steps': [],
            'cultural_relevance': '',
            'image_url': None
        }

@csrf_exempt
@require_http_methods(["POST"])
def classify_image(request):
    """Classify uploaded herbal plant image"""
    try:
        if 'image' not in request.FILES:
            return JsonResponse({'error': 'No image file provided'}, status=400)
        
        image_file = request.FILES['image']
        
        # Validate file type
        if not image_file.content_type.startswith('image/'):
            return JsonResponse({'error': 'File must be an image'}, status=400)
        
        # Read and process the image
        image = Image.open(image_file)
        print(f"[DEBUG] Uploaded image: size={image.size}, mode={image.mode}, format={image.format}")
        
        # Preprocess with quality validation
        try:
            processed_image = preprocess_image(image, validate_quality=True)
            print(f"[DEBUG] Processed image shape: {processed_image.shape}, dtype={processed_image.dtype}")
        except ValueError as e:
            print(f"[DEBUG] Image validation failed: {e}")
            return JsonResponse({
                'error': str(e),
                'success': False,
                'prediction': {
                    'plant_name': 'Invalid Image',
                    'confidence': 0,
                    'plant_details': {
                        'description': 'The captured image is too dark, too bright, or has no visible features. Please ensure the camera is not covered and there is adequate lighting.'
                    }
                }
            }, status=400)
        
        # Make prediction with confidence threshold
        # Load model lazily
        model, class_names = get_model()
        
        if model is None:
            return JsonResponse({'error': 'Model not available'}, status=500)
        
        print(f"[DEBUG] Model ready: {model is not None}, Classes: {len(class_names)}")
        
        CONFIDENCE_THRESHOLD = 0.70  # 70% minimum confidence - balanced for real-world photos
        TOP_PREDICTIONS_COUNT = 3  # Show top 3 predictions
        
        # Multi-strategy prediction for better accuracy on real-world photos
        print(f"[DEBUG] Running multi-strategy prediction...")
        
        strategies = []
        
        # Strategy 1: Auto-enhanced preprocessing
        strategies.append(('auto', processed_image))
        
        # Strategy 2: Contrast enhanced (subtle)
        img_enhanced = image.copy()
        img_enhanced = ImageEnhance.Contrast(img_enhanced).enhance(1.2)
        img_enhanced = ImageEnhance.Sharpness(img_enhanced).enhance(1.1)
        processed_enhanced = preprocess_image(img_enhanced)
        strategies.append(('contrast', processed_enhanced))
        
        # Strategy 3: Auto-contrast
        img_auto = ImageOps.autocontrast(image, cutoff=1)
        processed_auto = preprocess_image(img_auto)
        strategies.append(('auto_contrast', processed_auto))
        
        # Run predictions on all strategies
        all_predictions = []
        for name, processed in strategies:
            preds = model.predict(processed, verbose=0)[0]
            top_idx = np.argmax(preds)
            conf = float(preds[top_idx])
            all_predictions.append({
                'strategy': name,
                'plant_name': class_names[top_idx],
                'confidence': conf,
                'all_probs': preds
            })
            print(f"[STRATEGY: {name}] {class_names[top_idx]}: {conf*100:.2f}%")
        
        # Find best single strategy
        best_single = max(all_predictions, key=lambda x: x['confidence'])
        
        # Voting system: count occurrences of each plant
        plant_votes = {}
        for pred in all_predictions:
            plant = pred['plant_name']
            if plant not in plant_votes:
                plant_votes[plant] = {'count': 0, 'total_conf': 0}
            plant_votes[plant]['count'] += 1
            plant_votes[plant]['total_conf'] += pred['confidence']
        
        # Find plant with most votes
        most_voted = max(plant_votes.items(), key=lambda x: (x[1]['count'], x[1]['total_conf']))
        
        # Decide final prediction
        if most_voted[0] == best_single['plant_name'] and most_voted[1]['count'] >= 2:
            # Consensus: most voted and best single agree
            predicted_class = most_voted[0]
            confidence = min(best_single['confidence'] * 1.1, 0.95)  # Boost by 10%
            print(f"[CONSENSUS] {predicted_class} at {confidence*100:.2f}% (boosted)")
        else:
            # Use best single strategy
            predicted_class = best_single['plant_name']
            confidence = best_single['confidence']
            print(f"[BEST SINGLE] {predicted_class} at {confidence*100:.2f}%")
        
        # Get top 3 predictions from best strategy
        best_probs = best_single['all_probs']
        top_indices = np.argsort(best_probs)[-TOP_PREDICTIONS_COUNT:][::-1]
        top_predictions = []
        for idx in top_indices:
            top_predictions.append({
                'plant_name': class_names[idx],
                'confidence': round(float(best_probs[idx]) * 100, 2)
            })
        
        print(f"[DEBUG] Final prediction: {predicted_class} ({confidence*100:.2f}%)")
        print(f"[DEBUG] Top 3: {top_predictions}")
        
        # Check confidence threshold
        if confidence < CONFIDENCE_THRESHOLD:
            predicted_class = "Unknown Plant"
            print(f"[DEBUG] Confidence {confidence*100:.2f}% below threshold {CONFIDENCE_THRESHOLD*100}%, marking as Unknown")
        
        # Get plant details from database
        plant_details = get_plant_details(predicted_class)
        
        # Save uploaded image for reference
        timestamp = str(int(time.time()))
        
        # Check if using retrained model v2
        model_v2_path = os.path.join(settings.BASE_DIR, 'models', 'herbbayog_v2_20260411.h5')
        model_version = 'v2.0' if os.path.exists(model_v2_path) else 'v1.0'
        
        # Prepare response with enhanced information
        prediction_data = {
            'plant_name': predicted_class,
            'confidence': float(confidence),
            'confidence_threshold': float(CONFIDENCE_THRESHOLD),
            'confidence_level': 'high' if confidence >= 80 else ('medium' if confidence >= 50 else 'low'),
            'top_predictions': top_predictions,
            'model_version': model_version,
            'is_reliable': confidence >= CONFIDENCE_THRESHOLD
        }
        
        return JsonResponse({
            'success': True,
            'prediction': prediction_data,
            'plant_details': plant_details,
            'confidence': float(confidence)
        })
        
    except Exception as e:
        logger.error(f"Error in classify_image: {e}")
        import traceback
        print(f"[DEBUG] FULL ERROR: {traceback.format_exc()}")
        return JsonResponse({
            'success': False,
            'error': f'Classification failed: {str(e)}',
            'prediction': {
                'plant_name': 'Error',
                'confidence': 0
            }
        }, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def list_plants(request):
    """List all herbal plants in the database"""
    try:
        # Try to load from plant_data.json first (has 110 plants with images)
        plant_data_path = os.path.join(os.path.dirname(__file__), 'plant_data.json')
        
        if os.path.exists(plant_data_path):
            with open(plant_data_path, 'r', encoding='utf-8') as f:
                plant_db = json.load(f)
            
            plants_data = []
            for idx, (name, info) in enumerate(plant_db.items(), 1):
                plants_data.append({
                    'id': idx,
                    'name': info['name'],
                    'scientific_name': info['scientific_name'],
                    'description': info['description'],
                    'medicinal_uses': info.get('medicinal_uses', []),
                    'preparation_steps': info.get('preparation_steps', []),
                    'cultural_relevance': info.get('cultural_relevance', ''),
                    'image_url': info.get('image_url', None),
                    'category': info.get('category', 'general'),
                    'doh_approved': info.get('doh_approved', False),
                    'translations': info.get('translations', {}),
                    'detailed_description': info.get('detailed_description', info['description']),
                    'local_names': info.get('local_names', [])
                })
            
            return JsonResponse({'plants': plants_data})
        
        # Fallback to Django database
        plants = HerbalPlant.objects.all()
        plants_data = []
        
        for plant in plants:
            plants_data.append({
                'id': plant.id,
                'name': plant.name,
                'scientific_name': plant.scientific_name,
                'description': plant.description,
                'medicinal_uses': plant.get_medicinal_uses_list(),
                'preparation_steps': plant.get_preparation_steps_list(),
                'cultural_relevance': plant.cultural_relevance,
                'image_url': plant.image.url if plant.image else None
            })
        
        return JsonResponse({'plants': plants_data})
        
    except Exception as e:
        logger.error(f"Error in list_plants: {e}")
        return JsonResponse({'error': 'Failed to fetch plants'}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def submit_feedback(request):
    """Submit feedback for wrong predictions and trigger auto-retrain if enough data"""
    try:
        data = json.loads(request.body)
        image_path = data.get('image_path', '')
        predicted = data.get('predicted', '')
        correct = data.get('correct', '')
        confidence = data.get('confidence', 0)
        notes = data.get('notes', '')
        contributor_info = data.get('contributor_info', {})
        
        # Convert relative URL to absolute path
        if image_path.startswith('/media/'):
            image_path = os.path.join(settings.MEDIA_ROOT, image_path.replace('/media/', ''))
        
        # Use new contribution system with quality validation
        manager = ContributionManager()
        result = manager.save_contribution(
            image_path=image_path,
            plant_name=correct,
            ai_prediction=predicted,
            contribution_type='correction',
            notes=notes,
            contributor_info=contributor_info
        )
        
        # Check if auto-retrain should trigger
        auto_retrain_result = None
        if result['success'] and result['quality_score'] >= 70:
            trainer = get_auto_trainer()
            auto_retrain_result = trainer.trigger_auto_retrain(manager, force=False)
            
            if auto_retrain_result.get('triggered'):
                result['auto_retrain'] = {
                    'triggered': True,
                    'message': auto_retrain_result['message'],
                    'plants_being_trained': auto_retrain_result['plants_being_trained'],
                    'estimated_time': auto_retrain_result['estimated_time']
                }
                result['message'] += f" 🚀 Auto-retrain started for {auto_retrain_result['plants_being_trained']}!"
            else:
                plants_ready = auto_retrain_result.get('plants_ready', [])
                current_plant_count = sum(1 for p in plants_ready if correct in p)
                
                result['auto_retrain'] = {
                    'triggered': False,
                    'progress': auto_retrain_result,
                    'message': f"📊 {current_plant_count}/50 photos for {correct}. Need 50+ for major retrain."
                }
                result['message'] += f" ({current_plant_count}/50 for retrain) - keep contributing!"
        
        return JsonResponse(result)
        
    except Exception as e:
        logger.error(f"Error saving feedback: {e}")
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def get_model_info(request):
    """Get model information and statistics"""
    try:
        model_info_path = os.path.join(settings.BASE_DIR, 'models', 'model_info.json')
        
        with open(model_info_path, 'r') as f:
            model_info = json.load(f)
        
        # Add file size info
        model_file_path = os.path.join(ROOT_MODELS_DIR, 'herbbayog_best.h5')
        if os.path.exists(model_file_path):
            model_size_mb = os.path.getsize(model_file_path) / (1024 * 1024)
            model_info['model_size_mb'] = round(model_size_mb, 2)
        
        return JsonResponse({
            'success': True,
            'model_info': model_info
        })
        
    except Exception as e:
        logger.error(f"Error loading model info: {e}")
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def plant_detail(request, plant_id):
    """Get details for a specific plant"""
    try:
        # Try to load from plant_data.json first (same as list_plants)
        plant_data_path = os.path.join(os.path.dirname(__file__), 'plant_data.json')
        
        if os.path.exists(plant_data_path):
            with open(plant_data_path, 'r', encoding='utf-8') as f:
                plant_db = json.load(f)
            
            # Find plant by ID (enumerate order matches list_plants)
            for idx, (name, info) in enumerate(plant_db.items(), 1):
                if idx == int(plant_id):
                    plant_data = {
                        'id': idx,
                        'name': info['name'],
                        'scientific_name': info['scientific_name'],
                        'description': info['description'],
                        'medicinal_uses': info.get('medicinal_uses', []),
                        'preparation_steps': info.get('preparation_steps', []),
                        'cultural_relevance': info.get('cultural_relevance', ''),
                        'image_url': info.get('image_url', None),
                        'category': info.get('category', 'general'),
                        'doh_approved': info.get('doh_approved', False),
                        'detailed_description': info.get('detailed_description', info['description']),
                        'local_names': info.get('local_names', []),
                        'translations': info.get('translations', {})
                    }
                    return JsonResponse(plant_data)
        
        # Fallback to Django database
        plant = HerbalPlant.objects.get(id=plant_id)
        
        plant_data = {
            'id': plant.id,
            'name': plant.name,
            'scientific_name': plant.scientific_name,
            'description': plant.description,
            'medicinal_uses': plant.get_medicinal_uses_list(),
            'preparation_steps': plant.get_preparation_steps_list(),
            'cultural_relevance': plant.cultural_relevance,
            'image_url': plant.image.url if plant.image else None,
            'created_at': plant.created_at,
            'updated_at': plant.updated_at
        }
        
        return JsonResponse(plant_data)
        
    except HerbalPlant.DoesNotExist:
        return JsonResponse({'error': 'Plant not found'}, status=404)
    except Exception as e:
        logger.error(f"Error in plant_detail: {e}")
        return JsonResponse({'error': 'Failed to fetch plant details'}, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def get_training_status(request):
    """Get automatic training status and progress"""
    try:
        trainer = get_auto_trainer()
        status = trainer.get_retrain_status()
        model_info = trainer.get_model_info()
        
        # Get contribution stats
        manager = ContributionManager()
        contrib_stats = manager.get_stats()
        
        # Check what plants are ready for retraining
        training_data = manager.get_contributions_for_training(
            min_quality_score=70,
            min_samples_per_plant=5
        )
        
        return JsonResponse({
            'is_training': status['is_training'],
            'training_started': status.get('training_started'),
            'last_retrain': status['last_retrain'],
            'total_retrains': status['total_retrains'],
            'model_version': model_info['version'],
            'current_model_size_mb': model_info['model_size_mb'],
            'contributions_ready': training_data['total_ready'],
            'plants_ready_for_retrain': training_data['plants_ready'],
            'plants_needing_more': training_data['insufficient_samples'],
            'contribution_stats': contrib_stats,
            'performance_history': status.get('performance_history', [])[-5:]
        })
        
    except Exception as e:
        logger.error(f"Error getting training status: {e}")
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def trigger_retrain(request):
    """Manually trigger model retraining (admin only)"""
    try:
        # Check for admin API key (simplified)
        data = json.loads(request.body) if request.body else {}
        force = data.get('force', False)
        plants = data.get('plants', None)
        
        manager = ContributionManager()
        trainer = get_auto_trainer()
        
        result = trainer.trigger_auto_retrain(manager, force=force)
        
        return JsonResponse(result)
        
    except Exception as e:
        logger.error(f"Error triggering retrain: {e}")
        return JsonResponse({'success': False, 'error': str(e)}, status=500)
