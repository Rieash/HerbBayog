#!/usr/bin/env python
"""
Data Augmentation Script for HerbBayog
Increases training data by 3x-5x using image transformations
"""
import os
import sys
from pathlib import Path
from PIL import Image, ImageEnhance
import random

def augment_image(image_path, output_dir, base_name, augmentation_type):
    """Apply augmentation to a single image"""
    try:
        img = Image.open(image_path)
        
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        if augmentation_type == 'rotate_15':
            img = img.rotate(15, expand=True, fillcolor=(255, 255, 255))
        elif augmentation_type == 'rotate_345':
            img = img.rotate(345, expand=True, fillcolor=(255, 255, 255))  # -15 degrees
        elif augmentation_type == 'flip_horizontal':
            img = img.transpose(Image.FLIP_LEFT_RIGHT)
        elif augmentation_type == 'flip_vertical':
            img = img.transpose(Image.FLIP_TOP_BOTTOM)
        elif augmentation_type == 'brightness_110':
            enhancer = ImageEnhance.Brightness(img)
            img = enhancer.enhance(1.10)  # 10% brighter
        elif augmentation_type == 'brightness_90':
            enhancer = ImageEnhance.Brightness(img)
            img = enhancer.enhance(0.90)  # 10% darker
        elif augmentation_type == 'contrast_110':
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(1.10)  # 10% more contrast
        elif augmentation_type == 'contrast_90':
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(0.90)  # 10% less contrast
        elif augmentation_type == 'zoom_110':
            # Zoom in 10%
            width, height = img.size
            left = width * 0.05
            top = height * 0.05
            right = width * 0.95
            bottom = height * 0.95
            img = img.crop((left, top, right, bottom))
            img = img.resize((width, height), Image.LANCZOS)
        elif augmentation_type == 'rotate_5':
            img = img.rotate(5, expand=True, fillcolor=(255, 255, 255))
        elif augmentation_type == 'rotate_355':
            img = img.rotate(355, expand=True, fillcolor=(255, 255, 255))
            
        # Save augmented image
        output_path = os.path.join(output_dir, f"{base_name}_{augmentation_type}.jpg")
        img.save(output_path, 'JPEG', quality=95)
        return True
        
    except Exception as e:
        print(f"Error augmenting {image_path}: {e}")
        return False

def augment_plant_folder(plant_folder_path):
    """Augment all images in a plant folder"""
    plant_name = os.path.basename(plant_folder_path)
    print(f"\n🌿 Processing: {plant_name}")
    
    # Get all jpg images
    images = [f for f in os.listdir(plant_folder_path) if f.lower().endswith('.jpg')]
    
    if not images:
        print(f"  No images found in {plant_name}")
        return 0
    
    original_count = len(images)
    augmented_count = 0
    
    # Augmentation types to apply
    augmentations = [
        'rotate_15',
        'rotate_345',
        'flip_horizontal',
        'brightness_110',
        'brightness_90',
        'contrast_110',
        'contrast_90',
        'zoom_110',
        'rotate_5',
        'rotate_355'
    ]
    
    print(f"  Original images: {original_count}")
    
    for img_file in images:
        # Skip already augmented images
        if '_aug_' in img_file or any(aug in img_file for aug in augmentations):
            continue
            
        img_path = os.path.join(plant_folder_path, img_file)
        base_name = os.path.splitext(img_file)[0]
        
        # Apply 3 random augmentations to each image
        selected_augs = random.sample(augmentations, 3)
        
        for aug_type in selected_augs:
            if augment_image(img_path, plant_folder_path, f"{base_name}_aug", aug_type):
                augmented_count += 1
    
    total = original_count + augmented_count
    print(f"  ✅ Augmented: {augmented_count} new images")
    print(f"  📊 Total now: {total} images")
    return augmented_count

def main():
    """Main function to augment all training data"""
    dataset_path = r"d:\HerbBayog\backend\training\training_data\herbbayog_complete_dataset"
    
    print("="*60)
    print("🔄 HerbBayog Data Augmentation")
    print("="*60)
    print(f"\nDataset path: {dataset_path}")
    
    if not os.path.exists(dataset_path):
        print(f"❌ Dataset path not found: {dataset_path}")
        return
    
    # Get all plant folders
    plant_folders = [f for f in os.listdir(dataset_path) 
                     if os.path.isdir(os.path.join(dataset_path, f))]
    
    print(f"\nFound {len(plant_folders)} plant folders")
    print("\nStarting augmentation...")
    print("-"*60)
    
    total_original = 0
    total_augmented = 0
    
    for plant_folder in sorted(plant_folders):
        plant_path = os.path.join(dataset_path, plant_folder)
        count = augment_plant_folder(plant_path)
        total_augmented += count
        
        # Count original images
        images = [f for f in os.listdir(plant_path) if f.lower().endswith('.jpg')]
        total_original += len([f for f in images if '_aug_' not in f])
    
    print("\n" + "="*60)
    print("✅ Augmentation Complete!")
    print("="*60)
    print(f"Original images: {total_original}")
    print(f"New augmented: {total_augmented}")
    print(f"Total dataset: {total_original + total_augmented}")
    print(f"\nDataset size increased by {total_augmented/total_original*100:.1f}%")
    print("\n🚀 Next step: Retrain the model with this augmented data")
    print("   Run: python retrain_model.py")

if __name__ == "__main__":
    main()
