"""
Test model with actual training images
"""
import os
import tensorflow as tf
import numpy as np
from PIL import Image

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'herbbayog_best.h5')
TRAINING_DIR = os.path.join(BASE_DIR, 'training', 'training_data', 'herbbayog_complete_dataset')

# Class names in model_info.json order
class_names = ["Akapulko", "Alagaw", "Aloe Vera Sabila", "Ampalaya", "Banaba", 
               "Bayabas", "Bignay", "Calamansi", "Cassava Kamoteng Kahoy", "Gotu Kola",
               "Gumamela", "Guyabano Soursop", "Ipil-ipil", "Kakawate Madre de Cacao",
               "Key Lime Dayap", "Lagundi", "Malunggay", "Mango", "Mayana",
               "Oleander Kaner", "Orange Dalandan", "Oregano", "Pandan", "Peanut Mani",
               "Pomelo Suha", "Saluyot", "Sambong", "Sampa-sampalukan", "Sampalok Tamarind",
               "Siling Labuyo", "Sweet Basil Balanoi", "Sweet Potato Kamote", "Tawa-tawa",
               "Touch-me-not Balsamina", "Tsaang Gubat", "Tubang Bakod", "Turmeric Luyang Dilaw",
               "Ulasimang Bato", "Yerba Buena"]

print("Loading model...")
model = tf.keras.models.load_model(MODEL_PATH)
print(f"Model loaded: {model.output_shape}")

def test_with_image(image_path, expected_class):
    """Test model with a specific image"""
    try:
        img = Image.open(image_path)
        img = img.resize((224, 224))
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img_array = np.array(img).astype(np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        predictions = model.predict(img_array, verbose=0)
        predicted_idx = np.argmax(predictions[0])
        confidence = predictions[0][predicted_idx]
        
        print(f"\nExpected: {expected_class} (index {class_names.index(expected_class)})")
        print(f"Predicted: {class_names[predicted_idx]} (index {predicted_idx}) - {confidence*100:.2f}%")
        
        # Show top 3
        top_3 = np.argsort(predictions[0])[-3:][::-1]
        print("Top 3 predictions:")
        for idx in top_3:
            print(f"  {class_names[idx]}: {predictions[0][idx]*100:.2f}%")
            
        return predicted_idx == class_names.index(expected_class)
    except Exception as e:
        print(f"Error testing {expected_class}: {e}")
        return False

# Test with specific plants
print("\n" + "="*60)
print("TESTING WITH TRAINING IMAGES")
print("="*60)

test_plants = ["Bayabas", "Sambong", "Lagundi", "Malunggay"]

for plant in test_plants:
    plant_dir = os.path.join(TRAINING_DIR, plant)
    if os.path.exists(plant_dir):
        images = [f for f in os.listdir(plant_dir) if f.endswith(('.jpg', '.jpeg', '.png'))]
        if images:
            test_img = os.path.join(plant_dir, images[0])
            print(f"\nTesting {plant} with {images[0]}...")
            test_with_image(test_img, plant)
        else:
            print(f"No images found for {plant}")
    else:
        print(f"Directory not found: {plant_dir}")
