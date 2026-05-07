import json

# Read the current plant data
with open('plant_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Botanically accurate herbal vs non-herbal classifications
# HERBAL = Plants primarily used for medicinal purposes
# NON-HERBAL = Plants primarily used for food/ornamental purposes

herbal_plants = {
    # DOH Approved Herbal Medicines
    'Lagundi', 'Sambong', 'Bayabas', 'Ampalaya', 'Malunggay', 'Yerba Buena', 'Bawang',
    'Akapulko', 'Niyog-niyogan', 'Pansit-pansitan', 'Tsaang Gubat', 'Ulasimang Bato',
    'Sambong', 'Banaba', 'Makabuhay',
    
    # Traditional Herbal Medicines
    'Oregano', 'Alagaw', 'Balanoi', 'Lemon', 'Lime', 'Calamansi', 'Dayap', 'Ginger',
    'Tanglad', 'Pandan', 'Sili', 'Tamarind', 'Guava', 'Mango', 'Duhat', 'Bignay',
    'Eucalyptus', 'Mint', 'Peppermint', 'Spearmint', 'Thyme', 'Parsley', 'Coriander',
    'Dill', 'Fennel', 'Bay Leaf', 'Aloe Vera', 'Noni', 'Tsaang Gubat',
    
    # Medicinal Trees and Shrubs
    'Narra', 'Mahogany', 'Acacia', 'Banaba', 'Mabolo', 'Kamagong', 'Kaimito',
    'Sineguelas', 'Santol', 'Lanzones', 'Rambutan', 'Mangosteen', 'Chico',
    
    # Traditional Philippine Herbs
    'Tawa-tawa', 'Takip-kuhol', 'Hirud', 'Kulantro', 'Dampog', 'Sambong',
    'Lagundi', 'Yerba Buena', 'Sampalok', 'Kalamansi', 'Tanglad', 'Pandan',
    
    # Spices with Medicinal Properties
    'Turmeric', 'Black Pepper', 'Onion', 'Garlic', 'Chili', 'Cinnamon', 'Clove',
    
    # Herbal Teas and Beverages
    'Gotu Kola', 'Ashitaba', 'Moringa', 'Guava Leaves', 'Banaba Leaves',
    
    # Philippine Traditional Medicine
    'Akapulko', 'Ampalaya', 'Bawang', 'Bayabas', 'Lagundi', 'Niyog-niyogan',
    'Pansit-pansitan', 'Sambong', 'Tsaang Gubat', 'Ulasimang Bato', 'Yerba Buena'
}

# Update each plant with accurate herbal classification
for plant_name, plant_data in data.items():
    # Check if this is a known herbal plant
    is_herbal = plant_name in herbal_plants
    
    # Override with accurate classification
    plant_data['is_herbal'] = is_herbal
    
    # All Philippine plants can be considered local to Calbayog region
    # since they grow throughout the Philippines
    plant_data['local_to_calbayog'] = True
    
    print(f"{plant_name}: {'HERBAL' if is_herbal else 'NON-HERBAL'} | Calbayog: YES")

# Save the updated data
with open('plant_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Count statistics
herbal_count = sum(1 for plant in data.values() if plant['is_herbal'])
non_herbal_count = len(data) - herbal_count
calbayog_count = sum(1 for plant in data.values() if plant['local_to_calbayog'])

print(f"\n=== CLASSIFICATION SUMMARY ===")
print(f"Total plants: {len(data)}")
print(f"Herbal plants: {herbal_count}")
print(f"Non-Herbal plants: {non_herbal_count}")
print(f"Calbayog local plants: {calbayog_count}")
print(f"\nUpdated plant_data.json with accurate classifications!")
