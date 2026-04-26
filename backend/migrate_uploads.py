#!/usr/bin/env python
"""
Migrate existing uploads to contribution system
"""
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'herbbayog.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from pathlib import Path
from herbal_plants.contribution import ContributionManager

BASE_DIR = Path(__file__).parent
UPLOADS_DIR = BASE_DIR / 'media' / 'uploads'

def migrate_existing_uploads():
    """Migrate existing uploads to contribution system"""
    manager = ContributionManager()
    
    print("🔍 Scanning for existing uploads...")
    
    if not UPLOADS_DIR.exists():
        print(f"❌ Uploads directory not found: {UPLOADS_DIR}")
        return
    
    migrated = 0
    for image_file in UPLOADS_DIR.glob('*'):
        if image_file.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp']:
            # Try to determine plant name from filename or use generic
            plant_name = "Unknown"
            filename_lower = image_file.stem.lower()
            
            # Common plant keywords in filename
            plants = ['lagundi', 'sambong', 'malunggay', 'ampalaya', 'guava', 
                     'bayabas', 'tawa-tawa', 'nierica', 'insulin']
            for plant in plants:
                if plant in filename_lower:
                    plant_name = plant.replace('-', ' ').title()
                    break
            
            # Default to Lagundi if has "lagundi" in name
            if 'lagundi' in filename_lower:
                plant_name = "Lagundi"
            
            print(f"📸 Found: {image_file.name} → {plant_name}")
            
            # Save to contribution system
            result = manager.save_contribution(
                image_path=str(image_file),
                plant_name=plant_name,
                contribution_type='new_sample',
                notes=f"Migrated from uploads folder: {image_file.name}",
                contributor_info={'source': 'migration', 'original_path': str(image_file)}
            )
            
            if result['success']:
                print(f"   ✅ Migrated (Quality: {result['quality_score']}/100)")
                migrated += 1
            else:
                print(f"   ❌ Failed: {result.get('error', 'Unknown error')}")
    
    print(f"\n📊 Migration Complete!")
    print(f"   Migrated: {migrated} photos")
    print(f"   Total in system: {manager.get_stats()['total_contributions']}")
    
    # Check if training should trigger
    from herbal_plants.auto_trainer import get_auto_trainer
    trainer = get_auto_trainer()
    training_data = manager.get_contributions_for_training(min_quality_score=70, min_samples_per_plant=5)
    
    print(f"\n🎯 Training Status:")
    print(f"   Plants ready: {training_data['plants_ready']}")
    print(f"   Total images ready: {training_data['total_ready']}")
    
    if training_data['plants_ready']:
        print(f"\n🚀 Triggering auto-retrain for: {training_data['plants_ready']}")
        result = trainer.trigger_auto_retrain(manager, force=False)
        print(f"   Result: {result}")

if __name__ == '__main__':
    migrate_existing_uploads()
