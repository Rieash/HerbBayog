"""
Auto-Retraining System for HerbBayog
Automatically retrains model when sufficient contributions are collected
"""
import os
import json
import shutil
import threading
import time
from datetime import datetime
from django.conf import settings
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
from PIL import Image

# Training configuration
MIN_IMAGES_FOR_RETRAIN = 50  # Minimum new images per plant for meaningful retraining
RETRAIN_BATCH_SIZE = 32
RETRAIN_EPOCHS = 10
RETRAIN_LEARNING_RATE = 0.0001  # Lower LR for fine-tuning
CONFIDENCE_THRESHOLD = 0.7  # Minimum confidence for auto-acceptance

class AutoTrainer:
    """
    Manages automatic model retraining with contributions
    """
    
    def __init__(self):
        self.base_dir = settings.BASE_DIR
        # Root models folder (parent of backend)
        self.root_models_dir = os.path.join(os.path.dirname(self.base_dir), 'models')
        self.model_path = os.path.join(self.root_models_dir, 'herbbayog_best.h5')
        self.backup_dir = os.path.join(self.root_models_dir, 'backups')
        self.training_dir = os.path.join(self.base_dir, 'training', 'auto_retrain')
        self.status_file = os.path.join(self.base_dir, 'training', 'retrain_status.json')
        self.is_training = False
        self._init_directories()
    
    def _init_directories(self):
        """Initialize training directories"""
        os.makedirs(self.backup_dir, exist_ok=True)
        os.makedirs(self.training_dir, exist_ok=True)
        os.makedirs(os.path.join(self.training_dir, 'new_data'), exist_ok=True)
    
    def get_retrain_status(self):
        """Get current retraining status"""
        if os.path.exists(self.status_file):
            with open(self.status_file, 'r') as f:
                return json.load(f)
        return {
            'is_training': False,
            'last_retrain': None,
            'total_retrains': 0,
            'new_images_since_last': 0,
            'plants_ready': [],
            'next_scheduled': None,
            'performance_history': []
        }
    
    def _save_status(self, status):
        """Save training status"""
        with open(self.status_file, 'w') as f:
            json.dump(status, f, indent=2)
    
    def check_retrain_needed(self, contribution_manager):
        """
        Check if retraining is needed based on new contributions
        Returns: (should_retrain, plants_ready, total_new_images)
        """
        # Get approved but not-yet-trained contributions
        training_data = contribution_manager.get_contributions_for_training(
            min_quality_score=70,
            min_samples_per_plant=MIN_IMAGES_FOR_RETRAIN
        )
        
        plants_ready = list(training_data['ready_for_training'].keys())
        total_new = training_data['total_ready']
        
        should_retrain = len(plants_ready) > 0 and total_new >= MIN_IMAGES_FOR_RETRAIN
        
        return should_retrain, plants_ready, total_new
    
    def prepare_training_dataset(self, contribution_manager, plants_to_train):
        """
        Prepare dataset combining original + new contributions
        """
        print(f"[AUTO-TRAIN] Preparing dataset for: {plants_to_train}")
        
        # Get new contributions
        training_data = contribution_manager.get_contributions_for_training(
            min_quality_score=70,
            min_samples_per_plant=1
        )
        
        # Create training structure
        train_dir = os.path.join(self.training_dir, 'dataset')
        if os.path.exists(train_dir):
            shutil.rmtree(train_dir)
        os.makedirs(train_dir, exist_ok=True)
        
        new_images_count = 0
        
        for plant in plants_to_train:
            if plant not in training_data['ready_for_training']:
                continue
                
            plant_dir = os.path.join(train_dir, plant.replace(' ', '_'))
            os.makedirs(plant_dir, exist_ok=True)
            
            # Copy new contributions
            contributions = training_data['ready_for_training'][plant]
            for c in contributions:
                if c['status'] == 'approved':
                    dest = os.path.join(plant_dir, os.path.basename(c['file_path']))
                    shutil.copy(c['file_path'], dest)
                    new_images_count += 1
        
        print(f"[AUTO-TRAIN] Prepared {new_images_count} new images")
        return train_dir, new_images_count
    
    def retrain_model(self, contribution_manager, plants_to_train=None, callback=None):
        """
        Perform incremental fine-tuning with new data
        """
        if self.is_training:
            print("[AUTO-TRAIN] Training already in progress")
            return {'success': False, 'error': 'Training already in progress'}
        
        self.is_training = True
        status = self.get_retrain_status()
        status['is_training'] = True
        status['training_started'] = datetime.now().isoformat()
        self._save_status(status)
        
        try:
            print("[AUTO-TRAIN] Starting automatic fine-tuning...")
            
            # 1. Backup current model
            backup_path = os.path.join(
                self.backup_dir, 
                f"herbbayog_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.h5"
            )
            shutil.copy(self.model_path, backup_path)
            print(f"[AUTO-TRAIN] Model backed up to: {backup_path}")
            
            # 2. Prepare dataset
            train_dir, new_images_count = self.prepare_training_dataset(
                contribution_manager, 
                plants_to_train or []
            )
            
            if new_images_count == 0:
                self.is_training = False
                status['is_training'] = False
                status['error'] = 'No new training data available'
                self._save_status(status)
                return {'success': False, 'error': 'No new training data'}
            
            # 3. Load existing model
            print("[AUTO-TRAIN] Loading existing model...")
            model = tf.keras.models.load_model(self.model_path)
            
            # 4. Freeze base layers (transfer learning approach)
            # Unfreeze only the last few layers for fine-tuning
            for layer in model.layers[:-10]:
                layer.trainable = False
            for layer in model.layers[-10:]:
                layer.trainable = True
            
            print(f"[AUTO-TRAIN] Model layers: {len(model.layers)} total, last 10 unfrozen")
            
            # 5. Setup data augmentation for new data
            train_datagen = ImageDataGenerator(
                rescale=1./255,
                rotation_range=20,
                width_shift_range=0.2,
                height_shift_range=0.2,
                horizontal_flip=True,
                zoom_range=0.2,
                brightness_range=[0.8, 1.2]
            )
            
            train_generator = train_datagen.flow_from_directory(
                train_dir,
                target_size=(224, 224),
                batch_size=RETRAIN_BATCH_SIZE,
                class_mode='categorical'
            )
            
            if train_generator.samples == 0:
                raise ValueError("No training samples found")
            
            # 6. Compile with lower learning rate
            model.compile(
                optimizer=optimizers.Adam(learning_rate=RETRAIN_LEARNING_RATE),
                loss='categorical_crossentropy',
                metrics=['accuracy']
            )
            
            # 7. Setup callbacks
            callbacks = [
                EarlyStopping(
                    monitor='loss',
                    patience=3,
                    restore_best_weights=True,
                    verbose=1
                ),
                ReduceLROnPlateau(
                    monitor='loss',
                    factor=0.5,
                    patience=2,
                    min_lr=1e-7,
                    verbose=1
                )
            ]
            
            # Add custom callback for progress updates
            if callback:
                class ProgressCallback(tf.keras.callbacks.Callback):
                    def on_epoch_end(self, epoch, logs=None):
                        callback(epoch, logs)
                callbacks.append(ProgressCallback())
            
            # 8. Train (fine-tune)
            print(f"[AUTO-TRAIN] Starting fine-tuning with {train_generator.samples} images...")
            
            history = model.fit(
                train_generator,
                steps_per_epoch=max(1, train_generator.samples // RETRAIN_BATCH_SIZE),
                epochs=RETRAIN_EPOCHS,
                callbacks=callbacks,
                verbose=1
            )
            
            # 9. Save improved model
            improved_model_path = os.path.join(
                self.root_models_dir, 
                f"herbbayog_v2_{datetime.now().strftime('%Y%m%d')}.h5"
            )
            model.save(improved_model_path)
            
            # 10. Update symlink to point to new model
            if os.path.exists(self.model_path):
                os.remove(self.model_path)
            shutil.copy(improved_model_path, self.model_path)
            
            # 11. Create batch and mark contributions as used
            batch_result = contribution_manager.create_training_batch(
                batch_name=f"Auto_Retrain_{datetime.now().strftime('%Y%m%d_%H%M')}",
                plant_selection=plants_to_train
            )
            
            # 12. Update status
            final_acc = history.history['accuracy'][-1]
            status['is_training'] = False
            status['last_retrain'] = datetime.now().isoformat()
            status['total_retrains'] += 1
            status['new_images_since_last'] = 0
            status['plants_ready'] = []
            status['last_model_path'] = improved_model_path
            status['last_accuracy'] = final_acc
            status['performance_history'].append({
                'date': datetime.now().isoformat(),
                'accuracy': final_acc,
                'images_trained': new_images_count,
                'plants': plants_to_train,
                'model_version': f"v2.{status['total_retrains']}"
            })
            
            self._save_status(status)
            self.is_training = False
            
            print(f"[AUTO-TRAIN] ✓ Complete! New model: {improved_model_path}")
            print(f"[AUTO-TRAIN] ✓ Final accuracy: {final_acc:.4f}")
            
            return {
                'success': True,
                'model_path': improved_model_path,
                'accuracy': final_acc,
                'images_trained': new_images_count,
                'plants_improved': plants_to_train,
                'epochs_trained': len(history.history['loss'])
            }
            
        except Exception as e:
            self.is_training = False
            status['is_training'] = False
            status['last_error'] = str(e)
            self._save_status(status)
            
            print(f"[AUTO-TRAIN] ✗ Error: {e}")
            return {'success': False, 'error': str(e)}
    
    def trigger_auto_retrain(self, contribution_manager, force=False):
        """
        Check if auto-retrain should trigger and execute it
        """
        should_retrain, plants_ready, total_new = self.check_retrain_needed(contribution_manager)
        
        if not should_retrain and not force:
            return {
                'triggered': False,
                'reason': f'Need {MIN_IMAGES_FOR_RETRAIN} images per plant. Currently: {plants_ready}',
                'plants_ready': plants_ready,
                'total_new_images': total_new
            }
        
        # Start retraining in background thread
        def train_thread():
            result = self.retrain_model(contribution_manager, plants_ready)
            print(f"[AUTO-TRAIN] Background training complete: {result}")
        
        thread = threading.Thread(target=train_thread)
        thread.daemon = True
        thread.start()
        
        return {
            'triggered': True,
            'message': 'Auto-retrain started in background',
            'plants_being_trained': plants_ready,
            'estimated_time': f'{RETRAIN_EPOCHS * 30} seconds'
        }
    
    def get_model_info(self):
        """Get current model information"""
        status = self.get_retrain_status()
        
        model_size = 0
        if os.path.exists(self.model_path):
            model_size = os.path.getsize(self.model_path)
        
        return {
            'current_model': self.model_path,
            'model_size_mb': model_size / (1024 * 1024),
            'total_retrains': status['total_retrains'],
            'last_retrain': status['last_retrain'],
            'is_training': self.is_training,
            'version': f"v2.{status['total_retrains']}" if status['total_retrains'] > 0 else "v1.0"
        }

# Singleton instance
_auto_trainer = None

def get_auto_trainer():
    """Get or create auto-trainer instance"""
    global _auto_trainer
    if _auto_trainer is None:
        _auto_trainer = AutoTrainer()
    return _auto_trainer

# Convenience functions for API
def check_and_trigger_retrain(force=False):
    """Check if retrain needed and trigger it"""
    from .contribution import ContributionManager
    
    trainer = get_auto_trainer()
    manager = ContributionManager()
    return trainer.trigger_auto_retrain(manager, force=force)

def get_training_status():
    """Get current training status"""
    trainer = get_auto_trainer()
    return {
        'trainer_status': trainer.get_retrain_status(),
        'model_info': trainer.get_model_info()
    }

if __name__ == '__main__':
    # Test auto-trainer
    trainer = AutoTrainer()
    print(f"Model info: {trainer.get_model_info()}")
    print(f"Status: {trainer.get_retrain_status()}")
