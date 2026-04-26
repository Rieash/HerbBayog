"""
Diagnose the current model - what it predicts and confidence levels
"""
import os
import sys
import numpy as np
from PIL import Image
import tensorflow as tf

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'herbbayog_best.h5')
MODEL_INFO_PATH = os.path.join(BASE_DIR, 'models', 'model_info.json')

print("=" * 60)
print("HERBBAYOG MODEL DIAGNOSTIC")
print("=" * 60)

# 1. Check model file
print("\n[1] Model File Check:")
if os.path.exists(MODEL_PATH):
    size_mb = os.path.getsize(MODEL_PATH) / (1024 * 1024)
    print(f"  ✓ Model exists: {MODEL_PATH}")
    print(f"  ✓ Size: {size_mb:.1f} MB")
else:
    print(f"  ✗ Model NOT found: {MODEL_PATH}")
    sys.exit(1)

# 2. Load model info
import json
print("\n[2] Model Info:")
with open(MODEL_INFO_PATH, 'r') as f:
    info = json.load(f)
print(f"  - Name: {info['model_name']}")
print(f"  - Architecture: {info['architecture']}")
print(f"  - Classes: {info['num_classes']}")
print(f"  - Final Accuracy: {info['final_val_accuracy']*100:.2f}%")
print(f"  - Image Size: {info['img_size']}")

class_names = info['class_names']
print(f"  - First 5 classes: {class_names[:5]}")
print(f"  - Lagundi index: {class_names.index('Lagundi')}")

# 3. Load the model
print("\n[3] Loading Model...")
print("  This may take 10-20 seconds...")
model = tf.keras.models.load_model(MODEL_PATH)
print(f"  ✓ Model loaded successfully!")
print(f"  - Input shape: {model.input_shape}")
print(f"  - Output shape: {model.output_shape}")

# 4. Create test image (random for now)
print("\n[4] Test Prediction (Random Image):")
test_image = np.random.rand(1, 224, 224, 3).astype(np.float32)
predictions = model.predict(test_image, verbose=0)
top_3_idx = np.argsort(predictions[0])[-3:][::-1]
print(f"  Random image predictions (should be low confidence):")
for i, idx in enumerate(top_3_idx):
    print(f"    {i+1}. {class_names[idx]}: {predictions[0][idx]*100:.2f}%")

# 5. Check if Lagundi data exists
print("\n[5] Training Data Check:")
TRAINING_DIR = os.path.join(BASE_DIR, 'training', 'training_data', 'herbbayog_complete_dataset')
if os.path.exists(TRAINING_DIR):
    lagundi_dir = os.path.join(TRAINING_DIR, 'Lagundi')
    if os.path.exists(lagundi_dir):
        lagundi_images = len([f for f in os.listdir(lagundi_dir) if f.endswith(('.jpg', '.jpeg', '.png'))])
        print(f"  ✓ Lagundi training images: {lagundi_images}")
    else:
        print(f"  ✗ Lagundi folder not found in training data")
else:
    print(f"  ✗ Training directory not found: {TRAINING_DIR}")

# 6. Summary
print("\n" + "=" * 60)
print("DIAGNOSTIC SUMMARY")
print("=" * 60)
print(f"Model loaded: ✓")
print(f"Classes: {len(class_names)}")
print(f"Expected behavior: Clear Lagundi photos should get 80-95% confidence")
print(f"Your result: 21% confidence (UNUSUALLY LOW)")
print("\nPossible causes:")
print("  1. Wrong model file loaded (check herbbayog_best.h5 vs v1)")
print("  2. Image preprocessing mismatch")
print("  3. Training data issue (check Lagundi images count)")
print("  4. Model corruption or wrong checkpoint")

print("\n" + "=" * 60)
