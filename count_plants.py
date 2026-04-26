import json

with open('backend/herbal_plants/plant_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

plants = sorted(data.keys())
print(f'TOTAL PLANTS: {len(plants)}')
print()
for i, name in enumerate(plants, 1):
    print(f'{i}. {name}')
