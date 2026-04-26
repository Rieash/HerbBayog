import os
import shutil
from pathlib import Path
import json

class CompleteDatasetMapper:
    def __init__(self):
        # Source dataset path
        self.source_dir = Path("training_data/PhilMedic Philippine Medicinal Plant Leaf Dataset/Philippine Medicinal Plant Leaf Dataset")
        
        # Target directory for complete HerbBayog dataset
        self.target_dir = Path("training_data/herbbayog_complete_dataset")
        
        # Complete mapping of all 40 plants with scientific and common names
        self.plant_mapping = {
            # Original DOH 10 Medicinal Plants
            '13Momordica charantia (MC)': 'Ampalaya',
            '6Blumea balsamifera(BB)': 'Sambong', 
            '4Vitex negundo(VN)': 'Lagundi',
            '2Psidium guajava(PG)': 'Bayabas',
            '17Senna alata(SA)': 'Akapulko',
            '18Mentha cordifolia Opiz(MCO)': 'Yerba Buena',
            '16Carmona retusa(CR)': 'Tsaang Gubat',
            '8Pepromia pellucida(PP)': 'Ulasimang Bato',
            
            # Additional 32 Philippine Medicinal Plants
            '1Hibiscus rosa-sinensis(HRS)': 'Gumamela',
            '3Antidesma bunius(AB)': 'Bignay',
            '5Moringa oleifera(MO)': 'Malunggay',
            '7Origanum vulgare(OV)': 'Oregano',
            '9Centella asiatica(CA)': 'Gotu Kola',
            '10Coleus scutellarioides(CS)': 'Mayana',
            '11Phyllanthus niruri(PN)': 'Sampa-sampalukan',
            '12Corchorus olitorius(CO)': 'Saluyot',
            '14Euphorbia hirta(EH)': 'Tawa-tawa',
            '15Curcuma longa(CL)': 'Turmeric Luyang Dilaw',
            '19Capsicum frutescens(CF)': 'Siling Labuyo',
            '20Jatropha curcas(JC)': 'Tubang Bakod',
            '21Ocimum basilicum(OB)': 'Sweet Basil Balanoi',
            '22Nerium oleander(NO)': 'Oleander Kaner',
            '23Pandanus amaryllifolius(PA)': 'Pandan',
            '24Aloe barbadensis Miller(ABM)': 'Aloe Vera Sabila',
            '25Lagerstroemia speciosa(LS)': 'Banaba',
            '26Averrhoa bilimbi(AVB)': 'Kamias',
            '27Annona muricata(AM)': 'Guyabano Soursop',
            '28Citrus aurantiifolia(CIA)': 'Key Lime Dayap',
            '29Premna odorata(PO)': 'Alagaw',
            '30Gliricidia sepium(GS)': 'Kakawate Madre de Cacao',
            '31Citrus sinensis(CIS)': 'Orange Dalandan',
            '32Mangifera indica(MI)': 'Mango',
            '33Citrus microcarpa(CM)': 'Calamansi',
            '34Impatiens balsamina(IB)': 'Touch-me-not Balsamina',
            '35Arachis hypogaea(AH)': 'Peanut Mani',
            '36Tamarindus indica(TI)': 'Sampalok Tamarind',
            '37Leucaena leucocephala(LL)': 'Ipil-ipil',
            '38Ipomoea batatas(IPB)': 'Sweet Potato Kamote',
            '39Manihot esculenta(ME)': 'Cassava Kamoteng Kahoy',
            '40Citrus maxima(CMA)': 'Pomelo Suha',
        }

    def create_complete_dataset(self):
        """Create complete HerbBayog dataset with all 40 plants"""
        print("🌿 Creating Complete HerbBayog Dataset (40 Plants)")
        print("=" * 60)
        
        # Create target directory
        self.target_dir.mkdir(exist_ok=True)
        
        copy_stats = {}
        total_copied = 0
        
        # Copy all 40 plant classes
        for source_folder, plant_name in self.plant_mapping.items():
            source_path = self.source_dir / source_folder
            target_path = self.target_dir / plant_name
            
            if not source_path.exists():
                print(f"❌ Source not found: {source_folder}")
                continue
            
            # Create target folder
            target_path.mkdir(exist_ok=True)
            
            # Get image files
            image_files = []
            for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
                image_files.extend(source_path.glob(ext))
            
            # Limit to 200 images per class for balanced training
            images_to_copy = image_files[:200]
            
            copied_count = 0
            for i, img_file in enumerate(images_to_copy):
                try:
                    new_name = f"{plant_name.lower().replace(' ', '_').replace('/', '_')}_{i+1}.jpg"
                    shutil.copy2(img_file, target_path / new_name)
                    copied_count += 1
                except Exception as e:
                    print(f"    ❌ Error copying {img_file}: {e}")
            
            copy_stats[plant_name] = copied_count
            total_copied += copied_count
            print(f"✅ {plant_name}: {copied_count} images")
        
        # Summary
        print(f"\n📊 Complete Dataset Summary:")
        print(f"  Total Plants: {len(copy_stats)}")
        print(f"  Total Images: {total_copied}")
        print(f"  Average per Plant: {total_copied / len(copy_stats):.1f}")
        
        # Save mapping info
        self.save_complete_mapping_info(copy_stats)
        
        return copy_stats

    def save_complete_mapping_info(self, copy_stats):
        """Save complete dataset mapping information"""
        mapping_info = {
            'dataset_name': 'HerbBayog Complete - 40 Philippine Medicinal Plants',
            'source_directory': str(self.source_dir),
            'target_directory': str(self.target_dir),
            'total_plants': len(self.plant_mapping),
            'doh_10_plants': [
                'Ampalaya', 'Sambong', 'Lagundi', 'Bayabas', 
                'Akapulko', 'Yerba Buena', 'Tsaang Gubat', 'Ulasimang Bato'
            ],
            'additional_32_plants': [
                'Gumamela', 'Bignay', 'Malunggay', 'Oregano', 'Gotu Kola',
                'Mayana', 'Sampa-sampalukan', 'Saluyot', 'Tawa-tawa', 'Turmeric/Luyang Dilaw',
                'Siling Labuyo', 'Tubang Bakod', 'Sweet Basil/Balanoi', 'Oleander/Kaner',
                'Pandan', 'Aloe Vera/Sabila', 'Banaba', 'Kamias', 'Guyabano/Soursop',
                'Key Lime/Dayap', 'Alagaw', 'Kakawate/Madre de Cacao', 'Orange/Dalandan',
                'Mango', 'Calamansi', 'Touch-me-not/Balsamina', 'Peanut/Mani',
                'Sampalok/Tamarind', 'Ipil-ipil', 'Sweet Potato/Kamote', 
                'Cassava/Kamoteng Kahoy', 'Pomelo/Suha'
            ],
            'plant_mapping': self.plant_mapping,
            'statistics': copy_stats,
            'total_images': sum(copy_stats.values()),
            'creation_date': '2026-03-31',
            'notes': [
                'Complete Philippine medicinal plant dataset',
                'Includes all 40 plants from PhilMedic dataset',
                'Enhanced version with 32 additional plants beyond DOH 10',
                'Ready for comprehensive AI training'
            ]
        }
        
        with open(self.target_dir / 'complete_mapping_info.json', 'w') as f:
            json.dump(mapping_info, f, indent=2)
        
        print(f"📋 Complete mapping info saved to: {self.target_dir / 'complete_mapping_info.json'}")

def main():
    print("🌿 HerbBayog Complete Dataset Creator")
    print("=" * 60)
    print("Creating dataset with ALL 40 Philippine medicinal plants")
    print()
    
    mapper = CompleteDatasetMapper()
    
    # Create complete dataset
    copy_stats = mapper.create_complete_dataset()
    
    print(f"\n🎉 Complete HerbBayog dataset created successfully!")
    print(f"✅ Total plants: {len(copy_stats)}")
    print(f"✅ Total images: {sum(copy_stats.values())}")
    print(f"\n🚀 This is a comprehensive herbal plant identification system!")
    print(f"   - DOH 10 Medicinal Plants: 8 plants")
    print(f"   - Additional 32 Philippine Plants: 32 plants")
    print(f"   - TOTAL: 40 medicinal plants!")

if __name__ == "__main__":
    main()
