"""
Test script to verify model predictions and class alignment
"""
import os
import sys
import django
import numpy as np
from PIL import Image

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'herbbayog.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from herbal_plants.views import model, class_names, preprocess_image, MODEL_PATH

print("=" * 60)
print("🧪 Testing HerbBayog AI Model")
print("=" * 60)

# Check model status
print(f"\n📊 Model Status:")
print(f"  Model path: {MODEL_PATH}")
print(f"  Model loaded: {model is not None}")
print(f"  Number of classes: {len(class_names)}")
print(f"  Classes: {class_names[:10]}... (showing first 10)")

# Check model info
model_info_path = os.path.join(os.path.dirname(MODEL_PATH), 'model_info.json')
if os.path.exists(model_info_path):
    import json
    with open(model_info_path) as f:
        info = json.load(f)
    print(f"\n📋 Model Info:")
    print(f"  Expected classes: {info.get('num_classes')}")
    print(f"  Architecture: {info.get('architecture')}")

# Check model input/output
if model is not None:
    print(f"\n🔍 Model Structure:")
    print(f"  Input shape: {model.input_shape}")
    print(f"  Output shape: {model.output_shape}")
    
    # Test with a dummy image
    print(f"\n🧪 Testing with dummy image:")
    dummy_image = Image.new('RGB', (224, 224), color='green')
    processed = preprocess_image(dummy_image)
    print(f"  Processed shape: {processed.shape}")
    
    predictions = model.predict(processed, verbose=0)
    print(f"  Predictions shape: {predictions.shape}")
    print(f"  Prediction values (first 10): {predictions[0][:10]}")
    
    predicted_index = np.argmax(predictions[0])
    confidence = np.max(predictions[0])
    print(f"\n✅ Prediction Result:")
    print(f"  Predicted index: {predicted_index}")
    print(f"  Predicted class: {class_names[predicted_index] if predicted_index < len(class_names) else 'OUT OF RANGE'}")
    print(f"  Confidence: {confidence * 100:.2f}%")
    
    # Top 5 predictions
    print(f"\n📊 Top 5 Predictions:")
    top_5_indices = np.argsort(predictions[0])[-5:][::-1]
    for i, idx in enumerate(top_5_indices):
        class_name = class_names[idx] if idx < len(class_names) else "UNKNOWN"
        conf = predictions[0][idx] * 100
        print(f"  {i+1}. {class_name}: {conf:.2f}%")

print("\n" + "=" * 60)
print("Test Complete!")
print("=" * 60)
