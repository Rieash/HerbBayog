import os
import shutil
from pathlib import Path
import json

class DatasetMapper:
    def __init__(self):
        # Source dataset path
        self.source_dir = Path("training_data/PhilMedic Philippine Medicinal Plant Leaf Dataset/Philippine Medicinal Plant Leaf Dataset")
        
        # Target directory for HerbBayog (10 DOH plants)
        self.target_dir = Path("training_data/herbbayog_dataset")
        
        # Mapping: Folder Name → Common Name (HerbBayog)
        self.plant_mapping = {
            # DOH 10 Medicinal Plants found in your dataset
            '13Momordica charantia (MC)': 'Ampalaya',
            '6Blumea balsamifera(BB)': 'Sambong', 
            '4Vitex negundo(VN)': 'Lagundi',
            '2Psidium guajava(PG)': 'Bayabas',
            '17Senna alata(SA)': 'Akapulko',
            '18Mentha cordifolia Opiz(MCO)': 'Yerba Buena',
            '16Carmona retusa(CR)': 'Tsaang Gubat',
            '8Pepromia pellucida(PP)': 'Ulasimang Bato',
        }

    def create_herbbayog_structure(self):
        """Create HerbBayog dataset structure"""
        print("🌿 Creating HerbBayog Dataset Structure")
        print("=" * 50)
        
        # Create target directory
        self.target_dir.mkdir(exist_ok=True)
        
        copy_stats = {}
        
        # Copy mapped plants
        for source_folder, plant_name in self.plant_mapping.items():
            source_path = self.source_dir / source_folder
            target_path = self.target_dir / plant_name
            
            if not source_path.exists():
                print(f"❌ Source not found: {source_folder}")
                continue
            
            # Create target folder
            target_path.mkdir(exist_ok=True)
            
            # Copy images
            image_files = []
            for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
                image_files.extend(source_path.glob(ext))
            
            copied_count = 0
            for i, img_file in enumerate(image_files):
                try:
                    new_name = f"{plant_name.lower().replace(' ', '_')}_{i+1}.jpg"
                    shutil.copy2(img_file, target_path / new_name)
                    copied_count += 1
                except Exception as e:
                    print(f"    ❌ Error copying {img_file}: {e}")
            
            copy_stats[plant_name] = copied_count
            print(f"✅ {plant_name}: {copied_count} images copied")
        
        # Summary
        total_images = sum(copy_stats.values())
        print(f"\n📊 HerbBayog Dataset Summary:")
        print(f"  Total Plants: {len(copy_stats)}")
        print(f"  Total Images: {total_images}")
        print(f"  Average per Plant: {total_images / len(copy_stats):.1f}")
        
        # Save mapping info
        self.save_mapping_info(copy_stats)
        
        return copy_stats

    def save_mapping_info(self, copy_stats):
        """Save dataset mapping information"""
        mapping_info = {
            'source': str(self.source_dir),
            'target': str(self.target_dir),
            'plant_mapping': self.plant_mapping,
            'statistics': copy_stats,
            'total_images': sum(copy_stats.values()),
            'herbbayog_plants': list(copy_stats.keys())
        }
        
        with open(self.target_dir / 'mapping_info.json', 'w') as f:
            json.dump(mapping_info, f, indent=2)
        
        print(f"📋 Mapping info saved to: {self.target_dir / 'mapping_info.json'}")

def main():
    print("🌿 HerbBayog Dataset Mapper")
    print("=" * 50)
    
    mapper = DatasetMapper()
    
    # Create HerbBayog dataset
    copy_stats = mapper.create_herbbayog_structure()
    
    print(f"\n🎉 HerbBayog dataset created successfully!")
    print(f"✅ Total plants: {len(copy_stats)}")
    print(f"✅ Total images: {sum(copy_stats.values())}")
    print(f"\n🚀 Ready for AI training!")

if __name__ == "__main__":
    main()
