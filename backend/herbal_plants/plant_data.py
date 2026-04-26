"""
Plant database utilities
Loads plant data from JSON file
"""
import json
import os

# Load plant database
_current_dir = os.path.dirname(__file__)
PLANT_DATA_PATH = os.path.join(_current_dir, 'plant_data.json')

PLANT_DATABASE = {}

if os.path.exists(PLANT_DATA_PATH):
    try:
        with open(PLANT_DATA_PATH, 'r', encoding='utf-8') as f:
            PLANT_DATABASE = json.load(f)
        print(f"[PlantData] Loaded {len(PLANT_DATABASE)} plants from database")
    except Exception as e:
        print(f"[PlantData] Error loading database: {e}")
        PLANT_DATABASE = {}
else:
    print(f"[PlantData] Database file not found: {PLANT_DATA_PATH}")

def get_plant_by_name(name):
    """
    Get plant information by name (case-insensitive)
    Also checks scientific names and common API names for matching
    Returns None if not found
    """
    if not name:
        return None
    
    # Common name mappings from PlantNet API to our database names
    COMMON_NAME_MAPPINGS = {
        'quick-stick': 'Kakawate',
        'quick stick': 'Kakawate',
        'quickstick': 'Kakawate',
        'candlesticks': 'Akapulko',
        'candlestick': 'Akapulko',
        'candle bush': 'Akapulko',
        'candlebush': 'Akapulko',
        'ringworm bush': 'Akapulko',
        'ringwormbush': 'Akapulko',
        'cuban-oregano': 'Oregano',
        'cuban oregano': 'Oregano',
        'cubanoregano': 'Oregano',
        'kangkung': 'Kangkong',
        'water spinach': 'Kangkong',
        'waterspinach': 'Kangkong',
        'swamp cabbage': 'Kangkong',
        'swampcabbage': 'Kangkong',
        'lemongrass': 'Tanglad',
        'lemon grass': 'Tanglad',
        'citronella grass': 'Tanglad',
        'guava': 'Bayabas',
        'bitter melon': 'Ampalaya',
        'bittermelon': 'Ampalaya',
        'bitter gourd': 'Ampalaya',
        'sweet potato': 'Kamote',
        'sweetpotato': 'Kamote',
        'garlic': 'Bawang',
        'ginger': 'Ginger',
        'turmeric': 'Turmeric',
        'basil': 'Basil',
        'oregano': 'Oregano',
        'calamansi': 'Calamansi',
        'kalamansi': 'Calamansi',
        'mango': 'Mango',
        'papaya': 'Papaya',
        'jackfruit': 'Jackfruit',
        'coconut': 'Coconut',
        'pineapple': 'Pineapple',
        'soursop': 'Guyabano',
        'graviola': 'Guyabano',
        'avocado': 'Avocado',
        'taro': 'Gabi',
        'malabar spinach': 'Alugbati',
        'vine spinach': 'Alugbati',
        'star fruit': 'Balimbing',
        'starfruit': 'Balimbing',
        'carambola': 'Balimbing',
        'sugar apple': 'Atis',
        'sugarapple': 'Atis',
        'custard apple': 'Atis',
    }
    
    # Try exact match first
    if name in PLANT_DATABASE:
        return PLANT_DATABASE[name]
    
    # Try case-insensitive match
    name_lower = name.lower().strip()
    
    # Check common name mappings first
    if name_lower in COMMON_NAME_MAPPINGS:
        mapped_name = COMMON_NAME_MAPPINGS[name_lower]
        if mapped_name in PLANT_DATABASE:
            return PLANT_DATABASE[mapped_name]
    
    for plant_name, plant_info in PLANT_DATABASE.items():
        if plant_name.lower() == name_lower:
            return plant_info
        # Check local names too
        local_names = plant_info.get('local_names', [])
        if any(name_lower == local_name.lower() for local_name in local_names):
            return plant_info
        # Check scientific name (for API results)
        scientific_name = plant_info.get('scientific_name', '').lower()
        if name_lower == scientific_name:
            return plant_info
    
    return None

def get_all_plants():
    """Return all plants in database"""
    return PLANT_DATABASE

def search_plants(query):
    """Search plants by name (partial match)"""
    query_lower = query.lower()
    results = []
    
    for plant_name, plant_info in PLANT_DATABASE.items():
        if query_lower in plant_name.lower():
            results.append({
                'name': plant_name,
                'info': plant_info
            })
    
    return results

# Export for easy access
__all__ = ['PLANT_DATABASE', 'get_plant_by_name', 'get_all_plants', 'search_plants']
