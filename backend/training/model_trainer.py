import os
import numpy as np
from pathlib import Path
import json
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns

class PlantModelTrainer:
    def __init__(self, data_dir="training_data/herbbayog_complete_dataset", model_dir="../models"):
        self.data_dir = Path(data_dir)
        self.model_dir = Path(model_dir)
        self.model_dir.mkdir(exist_ok=True)
        
        # Model parameters
        self.img_size = (224, 224)
        self.batch_size = 32
        self.epochs = 25
        self.learning_rate = 0.001
        
        # Plant classes - dynamically loaded from directory
        self.class_names = self._load_class_names()
        self.num_classes = len(self.class_names)
        print(f"Loaded {self.num_classes} plant classes: {self.class_names}")

    def _load_class_names(self):
        """Load class names from directory structure"""
        if not self.data_dir.exists():
            return []
        class_names = [d.name for d in self.data_dir.iterdir() if d.is_dir()]
        class_names.sort()  # Sort alphabetically
        return class_names

    def prepare_data_generators(self):
        """Prepare data generators for training"""
        # Data augmentation for training - STRONGER to prevent overfitting
        train_datagen = ImageDataGenerator(
            rescale=1./255,
            rotation_range=40,           # Increased from 20
            width_shift_range=0.3,       # Increased from 0.2
            height_shift_range=0.3,      # Increased from 0.2
            horizontal_flip=True,
            vertical_flip=True,          # Added vertical flip
            zoom_range=0.3,              # Increased from 0.2
            brightness_range=[0.6, 1.4], # Increased range
            shear_range=0.2,             # Added shear
            fill_mode='nearest',
            validation_split=0.2
        )
        
        # Only rescaling for validation
        val_datagen = ImageDataGenerator(
            rescale=1./255,
            validation_split=0.2
        )
        
        # Training generator
        self.train_generator = train_datagen.flow_from_directory(
            self.data_dir,
            target_size=self.img_size,
            batch_size=self.batch_size,
            class_mode='categorical',
            subset='training',
            shuffle=True,
            classes=self.class_names
        )
        
        # Validation generator
        self.validation_generator = val_datagen.flow_from_directory(
            self.data_dir,
            target_size=self.img_size,
            batch_size=self.batch_size,
            class_mode='categorical',
            subset='validation',
            shuffle=False,
            classes=self.class_names
        )
        
        print(f"Training samples: {self.train_generator.samples}")
        print(f"Validation samples: {self.validation_generator.samples}")
        print(f"Class indices: {self.train_generator.class_indices}")
        
        return self.train_generator, self.validation_generator

    def build_model(self):
        """Build the transfer learning model using MobileNetV2 with fine-tuning"""
        # Load pre-trained MobileNetV2
        base_model = MobileNetV2(
            weights='imagenet',
            include_top=False,
            input_shape=(224, 224, 3)
        )
        
        # Fine-tuning: Unfreeze top 30 layers for better feature learning
        base_model.trainable = True
        for layer in base_model.layers[:-30]:
            layer.trainable = False
        
        # Add custom layers with batch normalization
        x = base_model.output
        x = GlobalAveragePooling2D()(x)
        x = Dense(512, activation='relu')(x)
        x = BatchNormalization()(x)
        x = Dropout(0.4)(x)  # Increased dropout
        x = Dense(256, activation='relu')(x)
        x = BatchNormalization()(x)
        x = Dropout(0.3)(x)
        predictions = Dense(self.num_classes, activation='softmax')(x)
        
        # Create the model
        self.model = Model(inputs=base_model.input, outputs=predictions)
        
        # Compile with lower learning rate for fine-tuning
        self.model.compile(
            optimizer=Adam(learning_rate=0.0001),  # Lower LR for fine-tuning
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        print("Model built with fine-tuning enabled!")
        print(f"Trainable layers: {sum(1 for l in self.model.layers if l.trainable)}")
        self.model.summary()
        
        return self.model

    def train_model(self):
        """Train the model"""
        # Prepare data
        train_gen, val_gen = self.prepare_data_generators()
        
        # Build model
        self.build_model()
        
        # Callbacks
        callbacks = [
            EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True),
            ModelCheckpoint(
                filepath=str(self.model_dir / 'herbbayog_best.h5'),
                monitor='val_accuracy',
                save_best_only=True,
                mode='max'
            )
        ]
        
        # Train the model
        print("Starting training...")
        history = self.model.fit(
            train_gen,
            epochs=self.epochs,
            validation_data=val_gen,
            callbacks=callbacks,
            verbose=1
        )
        
        # Save final model
        final_model_path = self.model_dir / 'herbbayog_v1.h5'
        self.model.save(final_model_path)
        print(f"Model saved to: {final_model_path}")
        
        # Save training history
        self.save_training_history(history)
        
        return history

    def save_training_history(self, history):
        """Save training history and plots"""
        # Create plots
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))
        
        # Accuracy plot
        ax1.plot(history.history['accuracy'], label='Training Accuracy')
        ax1.plot(history.history['val_accuracy'], label='Validation Accuracy')
        ax1.set_title('Model Accuracy')
        ax1.set_xlabel('Epoch')
        ax1.set_ylabel('Accuracy')
        ax1.legend()
        ax1.grid(True)
        
        # Loss plot
        ax2.plot(history.history['loss'], label='Training Loss')
        ax2.plot(history.history['val_loss'], label='Validation Loss')
        ax2.set_title('Model Loss')
        ax2.set_xlabel('Epoch')
        ax2.set_ylabel('Loss')
        ax2.legend()
        ax2.grid(True)
        
        # Save plot
        plt.tight_layout()
        plt.savefig(self.model_dir / 'training_history.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # Save history as JSON
        history_dict = {key: [float(x) for x in values] for key, values in history.history.items()}
        with open(self.model_dir / 'training_history.json', 'w') as f:
            json.dump(history_dict, f, indent=2)

    def evaluate_model(self):
        """Evaluate the trained model"""
        # Load validation data
        _, val_gen = self.prepare_data_generators()
        
        # Evaluate
        loss, accuracy = self.model.evaluate(val_gen, verbose=1)
        print(f"Validation Loss: {loss:.4f}")
        print(f"Validation Accuracy: {accuracy:.4f}")
        
        # Generate predictions
        val_gen.reset()
        predictions = self.model.predict(val_gen, verbose=1)
        predicted_classes = np.argmax(predictions, axis=1)
        true_classes = val_gen.classes
        class_labels = list(val_gen.class_indices.keys())
        
        # Classification report
        report = classification_report(
            true_classes, 
            predicted_classes, 
            target_names=class_labels,
            digits=4
        )
        print("\nClassification Report:")
        print(report)
        
        # Save classification report
        with open(self.model_dir / 'classification_report.txt', 'w') as f:
            f.write(report)
        
        # Confusion matrix
        cm = confusion_matrix(true_classes, predicted_classes)
        plt.figure(figsize=(10, 8))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                   xticklabels=class_labels, yticklabels=class_labels)
        plt.title('Confusion Matrix')
        plt.xlabel('Predicted')
        plt.ylabel('True')
        plt.tight_layout()
        plt.savefig(self.model_dir / 'confusion_matrix.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        return accuracy, report

    def create_model_info(self):
        """Create model information file"""
        model_info = {
            'model_name': 'HerbBayog v1.0',
            'architecture': 'MobileNetV2 + Custom Layers',
            'input_size': list(self.img_size) + [3],
            'num_classes': self.num_classes,
            'class_names': self.class_names,
            'training_parameters': {
                'batch_size': self.batch_size,
                'epochs': self.epochs,
                'learning_rate': self.learning_rate,
                'optimizer': 'Adam'
            },
            'created_date': json.dumps({'timestamp': 'now'}),
            'performance': {
                'validation_accuracy': 'to_be_updated',
                'validation_loss': 'to_be_updated'
            }
        }
        
        with open(self.model_dir / 'model_info.json', 'w') as f:
            json.dump(model_info, f, indent=2)

def main():
    """Main training function"""
    print("🌿 HerbBayog Model Training Started")
    print("=" * 50)
    
    trainer = PlantModelTrainer()
    
    # Check if training data exists
    if not trainer.data_dir.exists():
        print("❌ Training data not found!")
        print("Please run the image collector first:")
        print("python training/image_collector.py")
        return
    
    # Create model info
    trainer.create_model_info()
    
    # Train the model
    print("\n🚀 Training the model...")
    history = trainer.train_model()
    
    # Evaluate the model
    print("\n📊 Evaluating the model...")
    accuracy, report = trainer.evaluate_model()
    
    print(f"\n✅ Training completed!")
    print(f"🎯 Final Accuracy: {accuracy:.4f}")
    print(f"💾 Model saved to: {trainer.model_dir / 'herbbayog_v1.h5'}")
    print(f"📈 Training plots and reports saved to: {trainer.model_dir}")
    
    print("\n🎉 Your HerbBayog model is ready!")
    print("Restart the Django server to use the new model.")

if __name__ == "__main__":
    main()
