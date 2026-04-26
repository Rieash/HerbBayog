import json

with open('backend/herbal_plants/plant_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add detailed descriptions for plants missing them
count = 0
for name, info in data.items():
    if not info.get('detailed_description'):
        scientific = info.get('scientific_name', '')
        category = info.get('category', 'Medicinal')
        doh = 'DOH-endorsed' if info.get('doh_approved') else 'traditionally used'
        uses = ', '.join(info.get('medicinal_uses', [])[:3])
        
        # Generate detailed description
        detailed = f"{name} ({scientific}) is a {category.lower()} plant {doh} in Philippine traditional medicine. It is known for its medicinal properties including {uses}. This plant has been used by Filipino communities for generations and continues to be an important part of traditional healing practices."
        
        info['detailed_description'] = detailed
        count += 1

# Save
with open('backend/herbal_plants/plant_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added detailed descriptions to {count} plants')
print()
print('Sample updated entries:')
for name in list(data.keys())[:3]:
    print(f'  - {name}: {data[name]["detailed_description"][:80]}...')
