import json

with open('backend/herbal_plants/plant_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('=' * 60)
print('HERBBAYOG - ALL 112 PLANTS')
print('=' * 60)
print()

for i, name in enumerate(sorted(data.keys()), 1):
    print(f'{i:3}. {name}')

print()
print('=' * 60)
print(f'TOTAL: {len(data)} plants')
print('=' * 60)
