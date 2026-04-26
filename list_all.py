import json

with open('backend/herbal_plants/plant_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

plants = sorted(data.keys())

print('=' * 60)
print(f'HERBBAYOG - ALL {len(plants)} PLANTS')
print('=' * 60)
print()

for i, name in enumerate(plants, 1):
    print(f'{i:3}. {name}')

print()
print('=' * 60)
