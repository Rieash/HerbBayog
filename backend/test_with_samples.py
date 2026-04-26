"""
Quick test with sample images from the dataset
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

def test_with_sample_images():
    """Test model with actual sample images from dataset"""
    dataset_dir = Path("training/training_data/herbbayog_complete_dataset")
    
    print("=" * 70)
    print("🧪 Testing with Actual Dataset Images")
    print("=" * 70)
    
    test_plants = ['Bayabas', 'Lagundi', 'Sambong', 'Ampalaya', 'Akapulko']
    
    for plant_name in test_plants:
        plant_dir = dataset_dir / plant_name
        if not plant_dir.exists():
            print(f"\n❌ {plant_name}: Directory not found")
            continue
        
        # Get first 3 images
        image_files = list(plant_dir.glob("*.jpg"))[:3]
        if not image_files:
            print(f"\n❌ {plant_name}: No images found")
            continue
        
        print(f"\n🌿 {plant_name}:")
        
        for img_file in image_files:
            try:
                # Load and preprocess
                img = Image.open(img_file)
                processed = preprocess_image(img)
                
                # Predict
                predictions = model.predict(processed, verbose=0)
                pred_idx = np.argmax(predictions[0])
                confidence = np.max(predictions[0])
                predicted = class_names[pred_idx]
                
                status = "✅ CORRECT" if predicted == plant_name else f"❌ WRONG (got {predicted})"
                print(f"  {img_file.name}: {predicted} ({confidence*100:.1f}%) {status}")
                
            except Exception as e:
                print(f"  Error: {e}")

if __name__ == "__main__":
    test_with_sample_images()
