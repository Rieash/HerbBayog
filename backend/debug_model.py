"""
Debug model loading
"""
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'herbbayog.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'herbal_plants', '..', 'models', 'herbbayog_v1.h5')
MODEL_PATH = os.path.normpath(MODEL_PATH)

print(f"Model path: {MODEL_PATH}")
print(f"Exists: {os.path.exists(MODEL_PATH)}")

# Check models directory
models_dir = os.path.join(os.path.dirname(__file__), 'models')
print(f"\nModels directory: {models_dir}")
print(f"Exists: {os.path.exists(models_dir)}")

if os.path.exists(models_dir):
    print(f"Files: {os.listdir(models_dir)}")

# Try loading
import tensorflow as tf
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"\n✅ Model loaded successfully!")
    print(f"Input shape: {model.input_shape}")
    print(f"Output shape: {model.output_shape}")
except Exception as e:
    print(f"\n❌ Error loading model: {e}")
