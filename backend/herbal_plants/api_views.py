"""
API-based plant classification views
Uses FREE PlantNet API instead of local TensorFlow model
"""
import os
import tempfile
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .plantnet_api import identify_plant_plantnet
from .plant_data import get_plant_by_name, PLANT_DATABASE

# Configuration - use API instead of local model
USE_API = True  # Set to False to use local model

@csrf_exempt
def classify_image_api(request):
    """
    Classify plant image
    Tries FREE API first, falls back to local model
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)
    
    try:
        # Get uploaded image
        if 'image' not in request.FILES:
            return JsonResponse({
                'error': 'No image provided',
                'success': False
            }, status=400)
        
        image_file = request.FILES['image']
        
        # Save temporarily
        temp_path = os.path.join(tempfile.gettempdir(), image_file.name)
        with open(temp_path, 'wb+') as f:
            for chunk in image_file.chunks():
                f.write(chunk)
        
        result = None
        
        try:
            # Try FREE PlantNet API first
            print(f"[API] Trying PlantNet for: {image_file.name}")
            api_result = identify_plant_plantnet(temp_path)
            
            if api_result.get('success'):
                api_plant_name = api_result['plant_name']
                plant_info = get_plant_by_name(api_plant_name)
                
                # Use local database name if match found, otherwise use API name
                plant_name = plant_info['name'] if plant_info else api_plant_name
                
                # Format result to match frontend expectations
                result = {
                    'success': True,
                    'prediction': {
                        'plant_name': plant_name if plant_info else 'Unknown Plant',
                        'confidence': round(api_result['confidence'], 2),
                        'confidence_level': 'high' if api_result['confidence'] >= 0.8 else ('medium' if api_result['confidence'] >= 0.5 else 'low'),
                        'is_reliable': plant_info is not None and api_result['confidence'] >= 0.7,
                        'is_in_database': plant_info is not None,
                        'source': 'HerbBayog AI'
                    },
                    'plant_details': None
                }
                
                if plant_info:
                    # Add plant details to result
                    import copy
                    plant_details = copy.deepcopy(plant_info)
                    result['plant_details'] = plant_details
                    
                print(f"[API] Identified: {plant_name} (from {api_plant_name})")
            else:
                print(f"[API] PlantNet failed: {api_result.get('error')}")
                
        except Exception as api_error:
            print(f"[API] PlantNet error: {api_error}")
        
        # Fall back to local model if API failed
        if result is None:
            print(f"[API] Falling back to local model...")
            from .views import classify_image
            # Create a mock request object for the view
            from django.core.files.uploadedfile import InMemoryUploadedFile
            from io import BytesIO
            
            with open(temp_path, 'rb') as f:
                image_data = f.read()
            
            image_file = InMemoryUploadedFile(
                BytesIO(image_data),
                field_name='image',
                name='image.jpg',
                content_type='image/jpeg',
                size=len(image_data),
                charset=None
            )
            
            # Create mock request
            class MockRequest:
                def __init__(self):
                    self.FILES = {'image': image_file}
                    self.POST = {}
                    self.method = 'POST'
            
            mock_request = MockRequest()
            response = classify_image(mock_request)
            
            if hasattr(response, 'content'):
                import json
                result = json.loads(response.content)
                result['source'] = 'HerbBayog AI'  # Generic source name
                
                # Fix image URL for local model result
                if result.get('plant_details') and result['plant_details'].get('image_url'):
                    image_path = result['plant_details']['image_url']
                    if image_path.startswith('/'):
                        result['plant_details']['image_url'] = f"http://localhost:3000{image_path}"
                
                print(f"[API] Local model result: {result.get('plant_name')}")
            else:
                result = {'success': False, 'error': 'Local model failed'}
        
        # Clean up temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        return JsonResponse(result)
                
    except Exception as e:
        print(f"[API ERROR] {e}")
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)

def get_plant_database(request):
    """
    Return all plants in our database
    """
    return JsonResponse({
        'success': True,
        'count': len(PLANT_DATABASE),
        'plants': list(PLANT_DATABASE.keys())
    })
