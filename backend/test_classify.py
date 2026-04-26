"""
Test classification directly to diagnose the error
"""
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'herbbayog.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from herbal_plants.views import model, class_names, preprocess_image
from PIL import Image
import numpy as np

print("=" * 60)
print("DIAGNOSTIC TEST")
print("=" * 60)
print(f"Model loaded: {model is not None}")
print(f"Class names: {len(class_names)}")
print(f"Classes: {class_names[:5]}...")

# Test with a dummy image
print("\nTesting with dummy image...")
try:
    img = Image.new('RGB', (224, 224), color='green')
    processed = preprocess_image(img)
    print(f"Preprocessed shape: {processed.shape}")
    
    if model is not None:
        predictions = model.predict(processed, verbose=0)
        print(f"Prediction shape: {predictions.shape}")
        pred_idx = np.argmax(predictions[0])
        confidence = np.max(predictions[0])
        predicted = class_names[pred_idx]
        print(f"Result: {predicted} ({confidence*100:.2f}%)")
        print("✅ TEST PASSED")
    else:
        print("❌ Model is None")
except Exception as e:
    print(f"❌ ERROR: {e}")
    import traceback
    print(traceback.format_exc())
