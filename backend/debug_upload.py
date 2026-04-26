"""
Debug: Compare training image vs uploaded image preprocessing
"""
import os
import numpy as np
from PIL import Image
import tensorflow as tf

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'herbbayog_best.h5')
TRAINING_DIR = os.path.join(BASE_DIR, 'training', 'training_data', 'herbbayog_complete_dataset')

# Load model
model = tf.keras.models.load_model(MODEL_PATH)

# Class names
class_names = ["Akapulko", "Alagaw", "Aloe Vera Sabila", "Ampalaya", "Banaba", 
               "Bayabas", "Bignay", "Calamansi", "Cassava Kamoteng Kahoy", "Gotu Kola",
               "Gumamela", "Guyabano Soursop", "Ipil-ipil", "Kakawate Madre de Cacao",
               "Kamias", "Key Lime Dayap", "Lagundi", "Malunggay", "Mango", "Mayana",
               "Oleander Kaner", "Orange Dalandan", "Oregano", "Pandan", "Peanut Mani",
               "Pomelo Suha", "Saluyot", "Sambong", "Sampa-sampalukan", "Sampalok Tamarind",
               "Siling Labuyo", "Sweet Basil Balanoi", "Sweet Potato Kamote", "Tawa-tawa",
               "Touch-me-not Balsamina", "Tsaang Gubat", "Tubang Bakod", "Turmeric Luyang Dilaw",
               "Ulasimang Bato", "Yerba Buena"]

def test_image(img_path, label):
    """Test a single image"""
    img = Image.open(img_path)
    print(f"\n{label}:")
    print(f"  Original size: {img.size}, mode: {img.mode}")
    
    # Method 1: Backend preprocessing (resize then RGB)
    img_resized = img.resize((224, 224))
    if img_resized.mode != 'RGB':
        img_resized = img_resized.convert('RGB')
    img_array = np.array(img_resized).astype(np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    predictions = model.predict(img_array, verbose=0)
    pred_idx = np.argmax(predictions[0])
    confidence = predictions[0][pred_idx]
    
    print(f"  Preprocessed shape: {img_array.shape}")
    print(f"  Prediction: {class_names[pred_idx]} ({confidence*100:.2f}%)")
    print(f"  Top 3: ", end="")
    top3 = np.argsort(predictions[0])[-3:][::-1]
    for idx in top3:
        print(f"{class_names[idx]}={predictions[0][idx]*100:.1f}% ", end="")
    print()
    
    return class_names[pred_idx], confidence

# Test 1: Training image
print("="*60)
print("TEST 1: TRAINING IMAGE")
print("="*60)
train_img = os.path.join(TRAINING_DIR, 'Bayabas', 'bayabas_1.jpg')
if os.path.exists(train_img):
    test_image(train_img, "Training image")
else:
    # Find any bayabas image
    bayabas_dir = os.path.join(TRAINING_DIR, 'Bayabas')
    if os.path.exists(bayas_dir):
        files = [f for f in os.listdir(bayas_dir) if f.endswith(('.jpg', '.jpeg', '.png'))]
        if files:
            test_image(os.path.join(bayas_dir, files[0]), "Training image")

# Test 2: Find uploaded image
print("\n" + "="*60)
print("TEST 2: UPLOADED IMAGE")
print("="*60)
upload_dir = os.path.join(BASE_DIR, 'media', 'uploads')
if os.path.exists(upload_dir):
    files = sorted([f for f in os.listdir(upload_dir) if f.endswith(('.jpg', '.jpeg', '.png'))])
    if files:
        # Get most recent
        latest = files[-1]
        test_image(os.path.join(upload_dir, latest), f"Uploaded: {latest}")
    else:
        print("No uploaded images found")
else:
    print("Upload directory not found")
