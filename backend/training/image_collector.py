import os
import requests
from urllib.parse import urlparse
from pathlib import Path
import json
import time
from PIL import Image
import io

class PlantImageCollector:
    def __init__(self, base_dir="training_data"):
        self.base_dir = Path(base_dir)
        self.base_dir.mkdir(exist_ok=True)
        
        # Plant search terms for better image collection
        self.plant_search_terms = {
            'Lagundi': [
                'lagundi leaves', 'vitex negundo leaves', 'lagundi plant philippines',
                'five-leaved chaste tree leaves', 'lagundi medicinal plant'
            ],
            'Sambong': [
                'sambong leaves', 'blumea balsamifera leaves', 'sambong plant',
                'blumea camphor leaves', 'sambong medicinal plant philippines'
            ],
            'Tsaang Gubat': [
                'tsaang gubat leaves', 'carmona retusa leaves', 'wild tea philippines',
                'carmona retusa plant', 'tsaang gubat medicinal plant'
            ],
            'Ampalaya': [
                'ampalaya leaves', 'bitter melon leaves', 'momordica charantia leaves',
                'ampalaya plant philippines', 'bitter gourd leaves'
            ],
            'Bawang': [
                'garlic leaves', 'allium sativum leaves', 'garlic plant philippines',
                'bawang plant', 'garlic greens'
            ],
            'Bayabas': [
                'guava leaves', 'psidium guajava leaves', 'bayabas leaves philippines',
                'guava plant leaves', 'philippine guava'
            ],
            'Niyog-niyogan': [
                'quisqualis indica leaves', 'rangoon creeper leaves', 'niyog-niyogan plant',
                'quisqualis indica philippines', 'rangoon creeper vine'
            ],
            'Yerba Buena': [
                'peppermint leaves', 'clinopodium douglasii', 'yerba buena leaves',
                'philippine mint', 'clinopodium douglasii plant'
            ],
            'Akapulko': [
                'cassia alata leaves', 'ringworm bush leaves', 'akapulko plant philippines',
                'candle bush leaves', 'cassia alata medicinal plant'
            ],
            'Ulasimang Bato': [
                'peperomia pellucida', 'shiny bush plant', 'ulasimang bato leaves',
                'pepper elder philippines', 'peperomia pellucida plant'
            ]
        }
        
        # Image search APIs (using free sources)
        self.search_engines = [
            'https://api.unsplash.com/search/photos',  # Requires API key
            'https://pixabay.com/api/',               # Requires API key
            # We'll use a simpler approach with direct image URLs
        ]

    def create_directories(self):
        """Create directories for each plant"""
        for plant_name in self.plant_search_terms.keys():
            plant_dir = self.base_dir / plant_name
            plant_dir.mkdir(exist_ok=True)
            print(f"Created directory: {plant_dir}")

    def download_sample_images(self, plant_name, num_images=20):
        """Download sample images for a specific plant"""
        plant_dir = self.base_dir / plant_name
        downloaded_count = 0
        
        # Sample image URLs (these would normally come from an API)
        sample_urls = self.get_sample_image_urls(plant_name)
        
        for i, url in enumerate(sample_urls[:num_images]):
            try:
                response = requests.get(url, timeout=10)
                if response.status_code == 200:
                    # Validate image
                    image_data = io.BytesIO(response.content)
                    try:
                        img = Image.open(image_data)
                        img.verify()  # Verify it's a valid image
                        
                        # Save image
                        filename = f"{plant_name.lower().replace(' ', '_')}_{i+1}.jpg"
                        filepath = plant_dir / filename
                        
                        with open(filepath, 'wb') as f:
                            f.write(response.content)
                        
                        downloaded_count += 1
                        print(f"Downloaded: {filename}")
                        
                    except Exception as img_error:
                        print(f"Invalid image: {url} - {img_error}")
                
                # Rate limiting
                time.sleep(1)
                
            except Exception as e:
                print(f"Failed to download {url}: {e}")
        
        print(f"Downloaded {downloaded_count} images for {plant_name}")
        return downloaded_count

    def get_sample_image_urls(self, plant_name):
        """Get sample image URLs for demonstration"""
        # These are placeholder URLs - in reality, you'd use an image search API
        # For demonstration, we'll use some plant-related stock images
        
        base_urls = [
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",  # General plant
            "https://images.unsplash.com/photo-1494537176433-7a3d4a3b12c6?w=400",  # Leaves
            "https://images.unsplash.com/photo-1578832956165-94e8f2d2746a?w=400",  # Green leaves
            "https://images.unsplash.com/photo-1542819320-0813a5a5b8c1?w=400",  # Tropical plant
            "https://images.unsplash.com/photo-1512428813834-c70233b7620f?w=400",  # Medicinal plant
        ]
        
        # Return multiple URLs with variations
        urls = []
        for base_url in base_urls:
            # Add variations for different images
            for i in range(4):
                urls.append(f"{base_url}&q={plant_name.replace(' ', '+')}&sig={i}")
        
        return urls

    def collect_all_images(self, images_per_plant=20):
        """Collect images for all plants"""
        print("Starting image collection...")
        self.create_directories()
        
        total_downloaded = 0
        for plant_name in self.plant_search_terms.keys():
            print(f"\nCollecting images for {plant_name}...")
            count = self.download_sample_images(plant_name, images_per_plant)
            total_downloaded += count
        
        print(f"\nTotal images downloaded: {total_downloaded}")
        return total_downloaded

    def create_dataset_info(self):
        """Create a dataset information file"""
        dataset_info = {
            'plants': list(self.plant_search_terms.keys()),
            'total_classes': len(self.plant_search_terms),
            'base_directory': str(self.base_dir),
            'collection_date': time.strftime('%Y-%m-%d %H:%M:%S'),
            'images_per_plant': {}
        }
        
        # Count images per plant
        for plant_name in self.plant_search_terms.keys():
            plant_dir = self.base_dir / plant_name
            image_files = list(plant_dir.glob('*.jpg')) + list(plant_dir.glob('*.png'))
            dataset_info['images_per_plant'][plant_name] = len(image_files)
        
        # Save dataset info
        with open(self.base_dir / 'dataset_info.json', 'w') as f:
            json.dump(dataset_info, f, indent=2)
        
        print(f"Dataset info saved to: {self.base_dir / 'dataset_info.json'}")
        return dataset_info

if __name__ == "__main__":
    collector = PlantImageCollector()
    
    # Collect images
    collector.collect_all_images(images_per_plant=15)
    
    # Create dataset info
    collector.create_dataset_info()
    
    print("\nImage collection completed!")
    print("Next step: Run the model training script")
