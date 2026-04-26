"""Extract PlantVillage dataset"""
import zipfile
import os

os.chdir(r'd:\HerbBayog\backend\training')

print("Extracting plantvillage.zip...")
with zipfile.ZipFile('plantvillage.zip', 'r') as zip_ref:
    zip_ref.extractall('plantvillage')
print("Extracted to plantvillage/")

# List contents
print("\nDataset structure:")
for root, dirs, files in os.walk('plantvillage'):
    level = root.replace('plantvillage', '').count(os.sep)
    indent = ' ' * 2 * level
    print(f'{indent}{os.path.basename(root)}/')
    subindent = ' ' * 2 * (level + 1)
    for file in files[:3]:  # Show first 3 files
        print(f'{subindent}{file}')
    if len(files) > 3:
        print(f'{subindent}... and {len(files)-3} more files')
    if level >= 2:  # Don't go too deep
        break
