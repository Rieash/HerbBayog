"""
Verify class alignment between model and backend
"""
import os
import sys
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'herbbayog.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

# Get class names from dataset
from pathlib import Path
dataset_dir = Path("training/training_data/herbbayog_complete_dataset")
if dataset_dir.exists():
    dataset_classes = sorted([d.name for d in dataset_dir.iterdir() if d.is_dir()])
else:
    dataset_classes = []

# Get class names from model info
model_info_path = Path("models/model_info.json")
if model_info_path.exists():
    with open(model_info_path) as f:
        model_info = json.load(f)
    model_classes = model_info.get('class_names', [])
else:
    model_classes = []

# Get class names from backend
from herbal_plants.views import class_names as backend_classes

print("=" * 70)
print("🔍 Class Alignment Verification")
print("=" * 70)

print(f"\n📊 Dataset classes: {len(dataset_classes)}")
print(f"📊 Model classes: {len(model_classes)}")
print(f"📊 Backend classes: {len(backend_classes)}")

print(f"\n📝 Dataset Classes (first 10):")
for i, cls in enumerate(dataset_classes[:10]):
    print(f"  {i}: {cls}")

print(f"\n📝 Model Classes (first 10):")
for i, cls in enumerate(model_classes[:10]):
    print(f"  {i}: {cls}")

print(f"\n📝 Backend Classes (first 10):")
for i, cls in enumerate(backend_classes[:10]):
    print(f"  {i}: {cls}")

# Check for mismatches
print(f"\n⚠️ Checking for mismatches...")
if dataset_classes == model_classes == backend_classes:
    print("✅ All class lists match perfectly!")
else:
    print("❌ MISMATCH DETECTED!")
    
    if dataset_classes != model_classes:
        print(f"  Dataset vs Model: Different")
        for i, (d, m) in enumerate(zip(dataset_classes, model_classes)):
            if d != m:
                print(f"    Index {i}: Dataset='{d}' vs Model='{m}'")
    
    if model_classes != backend_classes:
        print(f"  Model vs Backend: Different")
        for i, (m, b) in enumerate(zip(model_classes, backend_classes)):
            if m != b:
                print(f"    Index {i}: Model='{m}' vs Backend='{b}'")

print("\n" + "=" * 70)
