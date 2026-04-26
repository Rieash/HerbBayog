"""
Quick test to verify model predictions with actual dataset images
"""
import os
import sys
import django
import numpy as np
from PIL import Image
from pathlib import Path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'herbbayog.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from herbal_plants.views import model, class_names, preprocess_image

print("=" * 70)
print("🧪 Testing Retrained Model with Dataset Images")
print("=" * 70)

dataset_dir = Path("training/training_data/herbbayog_complete_dataset")

test_plants = ['Bayabas', 'Lagundi', 'Sambong', 'Ampalaya']

correct = 0
total = 0

for plant_name in test_plants:
    plant_dir = dataset_dir / plant_name
    if not plant_dir.exists():
        continue
    
    # Test with 5 random images
    image_files = list(plant_dir.glob("*.jpg"))[:5]
    
    print(f"\n🌿 {plant_name}:")
    
    for img_file in image_files:
        try:
            img = Image.open(img_file)
            processed = preprocess_image(img)
            predictions = model.predict(processed, verbose=0)
            pred_idx = np.argmax(predictions[0])
            confidence = np.max(predictions[0])
            predicted = class_names[pred_idx]
            
            is_correct = predicted == plant_name
            if is_correct:
                correct += 1
            total += 1
            
            status = "✅" if is_correct else f"❌ got {predicted}"
            print(f"  {img_file.name}: {predicted} ({confidence*100:.1f}%) {status}")
            
        except Exception as e:
            print(f"  Error: {e}")

print(f"\n{'=' * 70}")
print(f"📊 Results: {correct}/{total} correct ({correct/total*100:.1f}%)")
print(f"{'=' * 70}")
