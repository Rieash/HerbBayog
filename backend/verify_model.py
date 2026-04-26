"""
Verify model integrity and class mapping
"""
import os
import json
import numpy as np
import tensorflow as tf
from PIL import Image

print("="*60)
print("MODEL VERIFICATION")
print("="*60)

# Load model info
with open('models/model_info.json', 'r') as f:
    info = json.load(f)

print("\n[1] Model Info:")
print(f"   Classes: {info['num_classes']}")
print(f"   Accuracy: {info['final_val_accuracy']}")
print(f"   Image size: {info['image_size']}")

# Find Lagundi index
class_names = info['class_names']
lagundi_idx = class_names.index('Lagundi')
print(f"\n[2] Lagundi Index: {lagundi_idx}")
print(f"   Class name at index {lagundi_idx}: {class_names[lagundi_idx]}")

# Load model
print("\n[3] Loading model...")
model = tf.keras.models.load_model('models/herbbayog_best.h5')
print(f"   Input shape: {model.input_shape}")
print(f"   Output shape: {model.output_shape}")

# Test with a completely black image (should give low confidence)
print("\n[4] Testing with black image:")
black_img = np.zeros((1, 224, 224, 3), dtype=np.float32)
preds = model.predict(black_img, verbose=0)[0]
top_idx = np.argmax(preds)
print(f"   Top prediction: {class_names[top_idx]} ({preds[top_idx]*100:.2f}%)")
print(f"   Lagundi confidence: {preds[lagundi_idx]*100:.2f}%")

# Test with white image
print("\n[5] Testing with white image:")
white_img = np.ones((1, 224, 224, 3), dtype=np.float32)
preds = model.predict(white_img, verbose=0)[0]
top_idx = np.argmax(preds)
print(f"   Top prediction: {class_names[top_idx]} ({preds[top_idx]*100:.2f}%)")
print(f"   Lagundi confidence: {preds[lagundi_idx]*100:.2f}%")

# Test with random noise
print("\n[6] Testing with random noise:")
noise_img = np.random.rand(1, 224, 224, 3).astype(np.float32)
preds = model.predict(noise_img, verbose=0)[0]
top_idx = np.argmax(preds)
print(f"   Top prediction: {class_names[top_idx]} ({preds[top_idx]*100:.2f}%)")
print(f"   Lagundi confidence: {preds[lagundi_idx]*100:.2f}%")

# Check if model has learned anything (compare to uniform distribution)
print("\n[7] Checking prediction distribution:")
uniform = 1.0 / len(class_names)
print(f"   Uniform probability: {uniform*100:.2f}% (1/{len(class_names)})")
print(f"   Random noise top confidence: {np.max(preds)*100:.2f}%")
if np.max(preds) > 0.15:  # If any class gets >15% on random noise
    print("   ⚠️ WARNING: Model gives high confidence on random noise!")
    print("   This suggests the model may be overconfident/broken.")
else:
    print("   ✓ Model shows appropriate uncertainty on random input")

print("\n[8] Summary:")
print(f"   Lagundi is at index {lagundi_idx} in {len(class_names)} classes")
print(f"   Model architecture: {model.layers[0].name}")
print(f"   Total layers: {len(model.layers)}")

print("\n" + "="*60)
print("VERIFICATION COMPLETE")
print("="*60)
