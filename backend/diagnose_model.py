"""
Diagnose model class indices
"""
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import tensorflow as tf
import numpy as np
from PIL import Image

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'herbbayog_best.h5')

print("Loading model...")
model = tf.keras.models.load_model(MODEL_PATH)
print(f"Model output shape: {model.output_shape}")
print(f"Number of classes: {model.output_shape[-1]}")

# Test with dummy images to see what classes the model actually learned
class_names = ["Akapulko", "Alagaw", "Aloe Vera Sabila", "Ampalaya", "Banaba", 
               "Bayabas", "Bignay", "Calamansi", "Cassava Kamoteng Kahoy", "Gotu Kola",
               "Gumamela", "Guyabano Soursop", "Ipil-ipil", "Kakawate Madre de Cacao",
               "Key Lime Dayap", "Lagundi", "Malunggay", "Mango", "Mayana",
               "Oleander Kaner", "Orange Dalandan", "Oregano", "Pandan", "Peanut Mani",
               "Pomelo Suha", "Saluyot", "Sambong", "Sampa-sampalukan", "Sampalok Tamarind",
               "Siling Labuyo", "Sweet Basil Balanoi", "Sweet Potato Kamote", "Tawa-tawa",
               "Touch-me-not Balsamina", "Tsaang Gubat", "Tubang Bakod", "Turmeric Luyang Dilaw",
               "Ulasimang Bato", "Yerba Buena"]

print("\nModel class indices (from model_info.json order):")
for i, name in enumerate(class_names):
    print(f"  Index {i}: {name}")

# Create a simple test image
test_img = np.random.rand(1, 224, 224, 3).astype(np.float32)

print("\nTesting model with random input...")
predictions = model.predict(test_img, verbose=0)
top_3_indices = np.argsort(predictions[0])[-3:][::-1]
print(f"Top 3 predictions for random input:")
for idx in top_3_indices:
    if idx < len(class_names):
        print(f"  Index {idx}: {class_names[idx]} ({predictions[0][idx]*100:.2f}%)")
    else:
        print(f"  Index {idx}: UNKNOWN ({predictions[0][idx]*100:.2f}%)")
