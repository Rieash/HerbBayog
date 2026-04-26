"""
PlantNet API Integration for HerbBayog
FREE 500 requests/month
https://my.plantnet.org/
"""
import requests
from pathlib import Path

# PlantNet API Configuration
# Get your FREE API key: https://my.plantnet.org/
PLANTNET_API_KEY = '2b10jOQMt5oprsNBFRQkpUYu'  # Your API key
PLANTNET_URL = 'https://my-api.plantnet.org/v2/identify/all'

def identify_plant_plantnet(image_path):
    """
    Identify plant using PlantNet API
    FREE 500 requests per month
    """
    try:
        # Prepare the image
        with open(image_path, 'rb') as f:
            image_data = f.read()
        
        # Prepare request
        # No project specified = uses all available flora by default
        params = {
            'api-key': PLANTNET_API_KEY,
        }
        
        files = {
            'images': ('image.jpg', image_data, 'image/jpeg')
        }
        
        # Make request to PlantNet
        response = requests.post(
            PLANTNET_URL,
            params=params,
            files=files,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            
            # Extract best match
            if result.get('results') and len(result['results']) > 0:
                best_result = result['results'][0]
                species = best_result.get('species', {})
                
                return {
                    'success': True,
                    'plant_name': species.get('commonNames', ['Unknown'])[0] if species.get('commonNames') else species.get('scientificNameWithoutAuthor', 'Unknown'),
                    'scientific_name': species.get('scientificNameWithoutAuthor', 'Unknown'),
                    'confidence': best_result.get('score', 0) * 100,
                    'family': species.get('family', {}).get('scientificName', 'Unknown'),
                    'source': 'PlantNet API',
                    'gbif_id': species.get('gbif', {}).get('id')
                }
        
        elif response.status_code == 401:
            return {
                'success': False,
                'error': 'API Error: 401',
                'message': 'Invalid API key. Please check your PlantNet API key.'
            }
        elif response.status_code == 429:
            return {
                'success': False,
                'error': 'API Error: 429',
                'message': 'Rate limit exceeded. Free tier allows 500 requests/month.'
            }
        else:
            return {
                'success': False,
                'error': f'API Error: {response.status_code}',
                'message': response.text
            }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def search_plantnet_species(query):
    """
    Search for plant species using PlantNet
    """
    try:
        url = f'https://my-api.plantnet.org/v2/species?search={query}'
        headers = {
            'accept': 'application/json'
        }
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            return response.json()
        return None
    except:
        return None

# Test function
if __name__ == '__main__':
    # Test with a sample image
    test_image = r'd:\HerbBayog\frontend\public\images\plants\akapulko.jpg'
    
    if PLANTNET_API_KEY == 'YOUR_API_KEY_HERE':
        print('⚠️  Please add your PlantNet API key first!')
        print('Get your FREE key at: https://my.plantnet.org/')
    elif Path(test_image).exists():
        print('Testing PlantNet API...')
        result = identify_plant_plantnet(test_image)
        print(f'Result: {result}')
    else:
        print(f'Test image not found: {test_image}')
        print('PlantNet API is ready to use!')
