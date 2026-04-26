import os
import shutil
from pathlib import Path
import json

class DatasetOrganizer:
    def __init__(self):
        # Source directory (your existing dataset)
        self.source_dir = Path("../herbbayog/Plants/CroppedMedLeaves/CroppedMedLeaves/train")
        
        # Target directory for HerbBayog training
        self.target_dir = Path("training_data")
        
        # HerbBayog plant classes (10 DOH medicinal plants)
        self.herbayog_plants = [
            'Akapulko', 'Ampalaya', 'Bawang', 'Bayabas', 'Lagundi', 
            'Niyog-niyogan', 'Sambong', 'Tsaang Gubat', 'Ulasimang Bato', 'Yerba Buena'
        ]
        
        # Map your numbered classes to HerbBayog plants
        # You'll need to verify this mapping based on your dataset
        self.class_mapping = {
            # This is a sample mapping - you'll need to adjust based on your actual plant classes
            0: 'Lagundi',        # Most common medicinal plant
            1: 'Sambong',       # Second most common
            2: 'Ampalaya',      # Bitter melon
            3: 'Bayabas',        # Guava
            4: 'Bawang',         # Garlic
            5: 'Akapulko',       # Ringworm bush
            6: 'Yerba Buena',    # Peppermint
            7: 'Tsaang Gubat',   # Wild tea
            8: 'Niyog-niyogan',  # Rangoon creeper
            9: 'Ulasimang Bato', # Shiny bush
            # Additional classes (10-29) - we'll map these to the most similar plants
            10: 'Lagundi', 11: 'Sambong', 12: 'Ampalaya', 13: 'Bayabas', 14: 'Bawang',
            15: 'Akapulko', 16: 'Yerba Buena', 17: 'Tsaang Gubat', 18: 'Niyog-niyogan', 19: 'Ulasimang Bato',
            20: 'Lagundi', 21: 'Sambong', 22: 'Ampalaya', 23: 'Bayabas', 24: 'Bawang',
            25: 'Akapulko', 26: 'Yerba Buena', 27: 'Tsaang Gubat', 28: 'Niyog-niyogan', 29: 'Ulasimang Bato'
        }

    def analyze_source_dataset(self):
        """Analyze the source dataset structure"""
        print("🔍 Analyzing your existing dataset...")
        print("=" * 50)
        
        if not self.source_dir.exists():
            print(f"❌ Source directory not found: {self.source_dir}")
            return False
        
        # Get all class folders
        class_folders = [f for f in self.source_dir.iterdir() if f.is_dir() and f.name.isdigit()]
        class_folders.sort(key=lambda x: int(x.name))
        
        print(f"📁 Found {len(class_folders)} class folders")
        
        # Count images per class
        class_counts = {}
        total_images = 0
        
        for class_folder in class_folders:
            class_num = int(class_folder.name)
            image_files = []
            
            for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
                image_files.extend(class_folder.glob(ext))
            
            count = len(image_files)
            class_counts[class_num] = count
            total_images += count
            
            mapped_plant = self.class_mapping.get(class_num, 'Unknown')
            print(f"  Class {class_num}: {count} images → {mapped_plant}")
        
        print(f"\n📊 Dataset Summary:")
        print(f"  Total Classes: {len(class_counts)}")
        print(f"  Total Images: {total_images}")
        print(f"  Average Images per Class: {total_images / len(class_counts):.1f}")
        
        return class_counts

    def create_target_structure(self):
        """Create the target training directory structure"""
        print(f"\n🏗️  Creating HerbBayog training structure...")
        
        # Create target directory
        self.target_dir.mkdir(exist_ok=True)
        
        # Create plant directories
        for plant_name in self.herbayog_plants:
            plant_dir = self.target_dir / plant_name
            plant_dir.mkdir(exist_ok=True)
            print(f"  ✅ Created: {plant_dir}")

    def organize_dataset(self, max_images_per_class=500):
        """Organize images from source to target structure"""
        print(f"\n🔄 Organizing dataset for HerbBayog training...")
        
        # Create target structure
        self.create_target_structure()
        
        # Track copied images
        copy_stats = {plant: 0 for plant in self.herbayog_plants}
        total_copied = 0
        
        # Process each class folder
        class_folders = [f for f in self.source_dir.iterdir() if f.is_dir() and f.name.isdigit()]
        class_folders.sort(key=lambda x: int(x.name))
        
        for class_folder in class_folders:
            class_num = int(class_folder.name)
            target_plant = self.class_mapping.get(class_num)
            
            if not target_plant:
                print(f"  ⚠️  Skipping Class {class_num} - no mapping")
                continue
            
            target_dir = self.target_dir / target_plant
            
            # Get image files
            image_files = []
            for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
                image_files.extend(class_folder.glob(ext))
            
            # Limit images per class to avoid overfitting
            images_to_copy = image_files[:max_images_per_class]
            
            # Copy images
            for img_file in images_to_copy:
                try:
                    # Create new filename
                    new_name = f"{target_plant.lower().replace(' ', '_')}_{copy_stats[target_plant] + 1}.jpg"
                    target_path = target_dir / new_name
                    
                    # Copy file
                    shutil.copy2(img_file, target_path)
                    copy_stats[target_plant] += 1
                    total_copied += 1
                    
                except Exception as e:
                    print(f"    ❌ Failed to copy {img_file.name}: {e}")
            
            print(f"  ✅ Class {class_num} → {target_plant}: {copy_stats[target_plant]} images copied")
        
        # Summary
        print(f"\n📊 Organization Summary:")
        print(f"  Total Images Copied: {total_copied}")
        for plant, count in copy_stats.items():
            if count > 0:
                print(f"    {plant}: {count} images")
        
        return copy_stats

    def create_mapping_info(self, copy_stats):
        """Create mapping information file"""
        mapping_info = {
            'source_directory': str(self.source_dir),
            'target_directory': str(self.target_dir),
            'class_mapping': self.class_mapping,
            'herbbayog_plants': self.herbayog_plants,
            'copy_statistics': copy_stats,
            'total_images': sum(copy_stats.values()),
            'organization_date': '2026-03-31',
            'notes': [
                'Original dataset had 30 classes mapped to 10 HerbBayog plants',
                'Images were renamed to follow HerbBayog naming convention',
                'Maximum 500 images per class to ensure balanced training'
            ]
        }
        
        with open(self.target_dir / 'dataset_mapping.json', 'w') as f:
            json.dump(mapping_info, f, indent=2)
        
        print(f"📋 Mapping info saved to: {self.target_dir / 'dataset_mapping.json'}")

    def validate_organized_dataset(self):
        """Validate the organized dataset"""
        print(f"\n🔍 Validating organized dataset...")
        
        validation_results = {
            'valid_structure': True,
            'plant_counts': {},
            'total_images': 0,
            'issues': []
        }
        
        for plant_name in self.herbayog_plants:
            plant_dir = self.target_dir / plant_name
            
            if not plant_dir.exists():
                validation_results['issues'].append(f"Missing directory: {plant_name}")
                validation_results['valid_structure'] = False
                continue
            
            # Count images
            image_files = []
            for ext in ['*.jpg', '*.jpeg', '*.png']:
                image_files.extend(plant_dir.glob(ext))
            
            count = len(image_files)
            validation_results['plant_counts'][plant_name] = count
            validation_results['total_images'] += count
            
            if count < 10:
                validation_results['issues'].append(f"Low image count: {plant_name} ({count} images)")
        
        # Summary
        print(f"  ✅ Structure Valid: {validation_results['valid_structure']}")
        print(f"  📁 Total Plants: {len(validation_results['plant_counts'])}")
        print(f"  🖼️  Total Images: {validation_results['total_images']}")
        
        if validation_results['issues']:
            print(f"  ⚠️  Issues: {len(validation_results['issues'])}")
            for issue in validation_results['issues'][:5]:
                print(f"    • {issue}")
        
        return validation_results

def main():
    """Main organization function"""
    print("🌿 HerbBayog Dataset Organizer")
    print("=" * 50)
    
    organizer = DatasetOrganizer()
    
    # Analyze source dataset
    if not organizer.analyze_source_dataset():
        print("❌ Cannot proceed - source dataset not found")
        return
    
    # Ask for confirmation
    print(f"\n❓ This will organize your dataset for HerbBayog training.")
    print(f"   Source: {organizer.source_dir}")
    print(f"   Target: {organizer.target_dir}")
    
    response = input("\nContinue? (y/n): ").lower().strip()
    if response != 'y':
        print("❌ Organization cancelled")
        return
    
    # Organize dataset
    copy_stats = organizer.organize_dataset()
    
    # Create mapping info
    organizer.create_mapping_info(copy_stats)
    
    # Validate organized dataset
    validation_results = organizer.validate_organized_dataset()
    
    print(f"\n🎉 Dataset organization completed!")
    print(f"✅ Ready for training: {validation_results['valid_structure']}")
    print(f"📊 Total training images: {validation_results['total_images']}")
    
    if validation_results['valid_structure']:
        print(f"\n🚀 Next steps:")
        print(f"   1. cd training")
        print(f"   2. python model_trainer.py")
    else:
        print(f"\n⚠️  Fix the issues above before training")

if __name__ == "__main__":
    main()
