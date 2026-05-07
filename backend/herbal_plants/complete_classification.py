import json

# Read the current plant data
with open('plant_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Define which plants are herbal vs non-herbal
herbal_plants = {
    'Lagundi', 'Sambong', 'Bayabas', 'Ampalaya', 'Malunggay', 'Yerba Buena', 'Bawang',
    'Niyog-niyogan', 'Pansit-pansitan', 'Alagaw', 'Basil', 'Balanoi', 'Bignay', 'Calamansi',
    'Dayap', 'Duhat', 'Eucalyptus', 'Ginger', 'Guava', 'Kalamansi', 'Lemon', 'Lime',
    'Mango', 'Onion', 'Oregano', 'Pandan', 'Sili', 'Sugarcane', 'Tamarind', 'Tsaang Gubat'
}

# Update each plant with herbal classification
for plant_name, plant_data in data.items():
    if 'is_herbal' not in plant_data:
        plant_data['is_herbal'] = plant_name in herbal_plants
        plant_data['local_to_calbayog'] = True  # All herbal plants are local to Calbayog

# Save the updated data
with open('plant_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Updated {len(data)} plants with herbal classification")
print(f"Herbal plants: {len(herbal_plants)}")
print(f"Non-herbal plants: {len(data) - len(herbal_plants)}")
