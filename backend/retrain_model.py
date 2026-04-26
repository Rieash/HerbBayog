#!/usr/bin/env python
"""
Simple retraining script for HerbBayog
Uses the augmented dataset to train a new model
"""
import os
import sys
import json
from datetime import datetime

# Add training folder to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'training'))

def main():
    print("="*60)
    print("🌿 HerbBayog Model Retraining")
    print("="*60)
    print()
    
    # Check if augmented data exists
    dataset_path = r"d:\HerbBayog\backend\training\training_data\herbbayog_complete_dataset"
    
    if not os.path.exists(dataset_path):
        print(f"❌ Dataset not found: {dataset_path}")
        return
    
    # Count total images
    total_images = 0
    plant_folders = [f for f in os.listdir(dataset_path) if os.path.isdir(os.path.join(dataset_path, f))]
    
    for plant in plant_folders:
        plant_path = os.path.join(dataset_path, plant)
        images = [f for f in os.listdir(plant_path) if f.lower().endswith('.jpg')]
        total_images += len(images)
    
    print(f"📊 Found {len(plant_folders)} plant classes")
    print(f"📸 Total training images: {total_images}")
    print()
    
    # Try to use fast_trainer
    try:
        print("🚀 Starting model training...")
        print("⏱️  This will take 30-60 minutes")
        print("-"*60)
        
        # Import the trainer class
        from fast_trainer import FastPlantModelTrainer
        
        # Create trainer instance with augmented dataset
        trainer = FastPlantModelTrainer(
            data_dir='training/training_data/herbbayog_complete_dataset',
            img_size=(224, 224),
            batch_size=32,  # Smaller batch for stability
            epochs=20  # More epochs with more data
        )
        
        # Run training
        history = trainer.train()
        
        # Save with new version name
        timestamp = datetime.now().strftime("%Y%m%d")
        model_filename = f'herbbayog_v2_{timestamp}.h5'
        model_path = os.path.join('training', 'models', model_filename)
        
        # Ensure models directory exists
        os.makedirs(os.path.dirname(model_path), exist_ok=True)
        
        trainer.save_model(model_path)
        
        print(f"\n✅ Model saved: {model_path}")
        
        # Save model info
        model_info = {
            'version': f'v2.{timestamp}',
            'filename': model_filename,
            'path': model_path,
            'classes': trainer.class_names,
            'num_classes': trainer.num_classes,
            'training_date': datetime.now().isoformat(),
            'total_images': total_images,
            'epochs': 20,
            'final_accuracy': float(history.history['accuracy'][-1]) if 'accuracy' in history.history else None,
            'final_val_accuracy': float(history.history['val_accuracy'][-1]) if 'val_accuracy' in history.history else None
        }
        
        info_path = os.path.join('training', 'models', f'model_info_v2_{timestamp}.json')
        with open(info_path, 'w') as f:
            json.dump(model_info, f, indent=2)
        
        print(f"✅ Model info saved: {info_path}")
        
    except Exception as e:
        print(f"❌ Error during training: {e}")
        import traceback
        traceback.print_exc()
        return
    
    print()
    print("="*60)
    print("✅ Retraining Complete!")
    print("="*60)
    print()
    print("📝 Next steps:")
    print("   1. Check the new model in: training/models/")
    print("   2. Update model path in: herbal_plants/model_config.py")
    print("   3. Restart the Django backend")
    print("   4. Test with your plant photos!")

if __name__ == "__main__":
    main()
