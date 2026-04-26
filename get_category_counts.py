import json

with open('backend/herbal_plants/plant_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doh_plants = {name: info for name, info in data.items() if info.get('doh_approved', False)}

print('=== DOH-APPROVED PLANTS ===')
print(f'Total: {len(doh_plants)} plants')
print()

print('=== CATEGORIES ===')
for name, info in doh_plants.items():
    cat = info.get('category', 'general')
    print(f'{name}: {cat}')

print()
print('=== MEDICINAL USES FOR FILTERING ===')
for name, info in doh_plants.items():
    uses = info.get('medicinal_uses', [])
    uses_lower = [u.lower() for u in uses]
    print(f'{name}: {uses_lower}')
