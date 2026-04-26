#!/usr/bin/env python3
"""
Verify plant database and clean up issues
"""
import json
import os

print('=' * 80)
print('HERBBAYOG DATABASE VERIFICATION & CLEANUP')
print('=' * 80)

# Load database
with open('backend/herbal_plants/plant_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

plants = list(data.keys())
total = len(plants)

print(f'\n📊 INITIAL COUNT: {total} plants')

# Check for duplicates (case-insensitive)
seen = {}
duplicates = []
for name in plants:
    lower = name.lower()
    if lower in seen:
        duplicates.append((name, seen[lower]))
    else:
        seen[lower] = name

if duplicates:
    print(f'\n⚠️  DUPLICATES FOUND: {len(duplicates)}')
    for dup, orig in duplicates:
        print(f'   - {dup} (duplicate of {orig})')
        # Remove duplicate
        if dup in data:
            del data[dup]
            print(f'     → Removed: {dup}')
else:
    print('\n✓ No duplicates found')

# Check for missing detailed descriptions
missing_desc = []
for name, info in data.items():
    if not info.get('detailed_description') or len(info.get('detailed_description', '')) < 20:
        missing_desc.append(name)
        # Add description
        scientific = info.get('scientific_name', '')
        category = info.get('category', 'Medicinal')
        doh = 'DOH-endorsed' if info.get('doh_approved') else 'traditionally used'
        uses = ', '.join(info.get('medicinal_uses', [])[:3])
        info['detailed_description'] = f"{name} ({scientific}) is a {category.lower()} plant {doh} in Philippine traditional medicine. It is known for {uses}."

if missing_desc:
    print(f'\n⚠️  PLANTS MISSING DESCRIPTIONS: {len(missing_desc)}')
    print('   → Added descriptions to all')
else:
    print('\n✓ All plants have detailed descriptions')

# Check images
image_dir = 'frontend/public/images/plants'
available_images = set(os.listdir(image_dir))
missing_images = []

for name in data.keys():
    expected_img = name.lower().replace(' ', '-') + '.jpg'
    exists = any(expected_img == img.lower() or 
                 name.lower().replace(' ', '_') == img.lower().replace('.jpg', '').replace('.webp', '').replace('.avif', '') or
                 name.lower() == img.lower().replace('.jpg', '').replace('.webp', '').replace('.avif', '')
                 for img in available_images)
    if not exists:
        missing_images.append(name)
        # Copy default image
        default = os.path.join(image_dir, 'default-plant.jpg')
        target = os.path.join(image_dir, expected_img)
        if os.path.exists(default) and not os.path.exists(target):
            import shutil
            shutil.copy(default, target)

if missing_images:
    print(f'\n⚠️  PLANTS MISSING IMAGES: {len(missing_images)}')
    print('   → Created placeholder images')
else:
    print('\n✓ All plants have images')

# Save cleaned database
with open('backend/herbal_plants/plant_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

final_count = len(data)
print(f'\n📊 FINAL COUNT: {final_count} plants')
print(f'   Removed: {total - final_count} duplicates')

# Print final list
print('\n' + '=' * 80)
print('FINAL PLANT LIST (Alphabetical)')
print('=' * 80)
for i, name in enumerate(sorted(data.keys()), 1):
    scientific = data[name].get('scientific_name', 'N/A')
    category = data[name].get('category', 'Unknown')
    print(f'{i:3}. {name:<25} ({scientific:<30}) [{category}]')

print('=' * 80)
print(f'TOTAL: {final_count} UNIQUE PLANTS')
print('=' * 80)
