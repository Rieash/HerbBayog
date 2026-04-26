"""
Improved model trainer with better architecture and stronger augmentation
"""
import os
import sys
import json
import numpy as np
from pathlib import Path
from datetime import datetime

import tensorflow as tf
from tensorflow.keras.applications import DenseNet121
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, BatchNormalization
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from tensorflow.keras.preprocessing.image import ImageDataGenerator

class ImprovedPlantModelTrainer:
    def __init__(self, data_dir='training_data/herbbayog_complete_dataset', 
                 img_size=(224, 224), batch_size=32, epochs=50):
        self.data_dir = Path(data_dir)
        self.img_size = img_size
        self.batch_size = batch_size
        self.epochs = epochs
        self.model = None
        self.class_names = self._load_class_names()
        self.num_classes = len(self.class_names)
        
        print(f"Found {self.num_classes} classes: {self.class_names[:5]}...")
    
    def _load_class_names(self):
        if not self.data_dir.exists():
            return []
        class_names = [d.name for d in self.data_dir.iterdir() if d.is_dir()]
        class_names.sort()
        return class_names
    
    def prepare_data_generators(self):
        # STRONGER augmentation to prevent overfitting
        train_datagen = ImageDataGenerator(
            rescale=1./255,
            rotation_range=60,           # Increased
            width_shift_range=0.4,
            height_shift_range=0.4,
            horizontal_flip=True,
            vertical_flip=True,
            zoom_range=0.4,
            brightness_range=[0.5, 1.5],
            shear_range=0.3,
            fill_mode='nearest',
            validation_split=0.2
        )
        
        val_datagen = ImageDataGenerator(
            rescale=1./255,
            validation_split=0.2
        )
        
        self.train_generator = train_datagen.flow_from_directory(
            str(self.data_dir),
            target_size=self.img_size,
            batch_size=self.batch_size,
            class_mode='categorical',
            subset='training',
            classes=self.class_names
        )
        
        self.validation_generator = val_datagen.flow_from_directory(
            str(self.data_dir),
            target_size=self.img_size,
            batch_size=self.batch_size,
            class_mode='categorical',
            subset='validation',
            classes=self.class_names
        )
        
        return self.train_generator, self.validation_generator
    
    def build_model(self):
        # Use DenseNet121 - better for fine-grained classification
        base_model = DenseNet121(
            weights='imagenet',
            include_top=False,
            input_shape=(224, 224, 3)
        )
        
        # Fine-tune more layers
        base_model.trainable = True
        for layer in base_model.layers[:-50]:  # Unfreeze top 50 layers
            layer.trainable = False
        
        # Add custom layers
        x = base_model.output
        x = GlobalAveragePooling2D()(x)
        x = Dense(512, activation='relu')(x)
        x = BatchNormalization()(x)
        x = Dropout(0.5)(x)
        x = Dense(256, activation='relu')(x)
        x = BatchNormalization()(x)
        x = Dropout(0.4)(x)
        x = Dense(128, activation='relu')(x)
        x = BatchNormalization()(x)
        x = Dropout(0.3)(x)
        predictions = Dense(self.num_classes, activation='softmax')(x)
        
        self.model = Model(inputs=base_model.input, outputs=predictions)
        
        self.model.compile(
            optimizer=Adam(learning_rate=0.0001),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        print(f"Model built with DenseNet121!")
        print(f"Trainable params: {self.model.count_params():,}")
        
        return self.model
    
    def train(self):
        self.prepare_data_generators()
        self.build_model()
        
        # Better callbacks
        callbacks = [
            ModelCheckpoint(
                '../models/herbbayog_best.h5',
                monitor='val_accuracy',
                save_best_only=True,
                mode='max',
                verbose=1
            ),
            EarlyStopping(
                monitor='val_loss',
                patience=10,
                restore_best_weights=True,
                verbose=1
            ),
            ReduceLROnPlateau(
                monitor='val_loss',
                factor=0.5,
                patience=5,
                min_lr=1e-7,
                verbose=1
            )
        ]
        
        print("\nStarting training with improved model...")
        
        history = self.model.fit(
            self.train_generator,
            epochs=self.epochs,
            validation_data=self.validation_generator,
            callbacks=callbacks,
            verbose=1
        )
        
        return history
    
    def save_model(self, model_path='../models/herbbayog_v1.h5'):
        self.model.save(model_path)
        print(f"Model saved to {model_path}")
        
        # Save info
        model_info = {
            'architecture': 'DenseNet121',
            'num_classes': self.num_classes,
            'class_names': self.class_names,
            'img_size': self.img_size,
            'batch_size': self.batch_size,
            'trained_at': datetime.now().isoformat()
        }
        
        info_path = Path(model_path).parent / 'model_info.json'
        with open(info_path, 'w') as f:
            json.dump(model_info, f, indent=2)
        
        print(f"Model info saved to {info_path}")

if __name__ == "__main__":
    trainer = ImprovedPlantModelTrainer(epochs=50)
    history = trainer.train()
    trainer.save_model()
    print("\nTraining complete!")
