"""
Dataset Auditor - Check and fix training data quality
Validates all 40 plants have actual images, not placeholders
"""
import os
import json
from pathlib import Path
from PIL import Image
from collections import defaultdict

# Configuration
DATASET_PATH = Path('../training/training_data/herbbayog_complete_dataset')
MODEL_INFO_PATH = Path('../models/model_info.json')
MIN_IMAGES_PER_PLANT = 10
MIN_IMAGE_SIZE = (100, 100)  # Minimum valid image dimensions
REQUIRED_EXTENSIONS = {'.jpg', '.jpeg', '.png'}

def load_expected_plants():
    """Load the 40 plant names from model_info.json"""
    with open(MODEL_INFO_PATH, 'r') as f:
        model_info = json.load(f)
    return model_info['class_names']

def audit_plant_directory(plant_dir):
    """Audit a single plant directory"""
    issues = []
    stats = {
        'total_files': 0,
        'valid_images': 0,
        'corrupt_images': 0,
        'wrong_format': 0,
        'too_small': 0,
        'placeholders': 0
    }
    
    if not plant_dir.exists():
        return {'exists': False, 'issues': ['Directory does not exist'], 'stats': stats}
    
    files = list(plant_dir.iterdir())
    stats['total_files'] = len(files)
    
    for file_path in files:
        # Check extension
        if file_path.suffix.lower() not in REQUIRED_EXTENSIONS:
            stats['wrong_format'] += 1
            issues.append(f"Wrong format: {file_path.name}")
            continue
        
        # Try to open image
        try:
            with Image.open(file_path) as img:
                width, height = img.size
                
                # Check if too small
                if width < MIN_IMAGE_SIZE[0] or height < MIN_IMAGE_SIZE[1]:
                    stats['too_small'] += 1
                    issues.append(f"Too small ({width}x{height}): {file_path.name}")
                    continue
                
                # Check if it's a placeholder (common placeholder sizes)
                if width == 1 or height == 1 or (width == height and width < 50):
                    stats['placeholders'] += 1
                    issues.append(f"Possible placeholder: {file_path.name}")
                    continue
                
                # Check if image can be verified
                img.verify()
                stats['valid_images'] += 1
                
        except Exception as e:
            stats['corrupt_images'] += 1
            issues.append(f"Corrupt/invalid: {file_path.name} - {str(e)[:50]}")
    
    return {
        'exists': True,
        'issues': issues,
        'stats': stats,
        'has_minimum': stats['valid_images'] >= MIN_IMAGES_PER_PLANT
    }

def generate_report():
    """Generate comprehensive dataset audit report"""
    expected_plants = load_expected_plants()
    
    print("=" * 70)
    print("HERBBAYOG DATASET AUDIT REPORT")
    print("=" * 70)
    print(f"Dataset Path: {DATASET_PATH}")
    print(f"Expected Plants: {len(expected_plants)}")
    print(f"Minimum Images Per Plant: {MIN_IMAGES_PER_PLANT}")
    print("=" * 70)
    
    # Track overall stats
    total_valid_images = 0
    plants_with_data = 0
    plants_needing_attention = []
    
    for plant_name in expected_plants:
        plant_dir = DATASET_PATH / plant_name
        result = audit_plant_directory(plant_dir)
        
        valid = result['stats']['valid_images']
        total_valid_images += valid
        
        status = "✓ OK" if result.get('has_minimum') else "✗ NEEDS DATA"
        if valid > 0:
            plants_with_data += 1
        else:
            plants_needing_attention.append(plant_name)
        
        print(f"\n{plant_name}:")
        print(f"  Status: {status}")
        print(f"  Valid Images: {valid}")
        
        if result['issues']:
            for issue in result['issues'][:5]:  # Show first 5 issues
                print(f"  ⚠ {issue}")
            if len(result['issues']) > 5:
                print(f"  ... and {len(result['issues']) - 5} more issues")
    
    # Summary
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total Plants: {len(expected_plants)}")
    print(f"Plants with Data: {plants_with_data}")
    print(f"Plants Missing Data: {len(plants_needing_attention)}")
    print(f"Total Valid Images: {total_valid_images}")
    print(f"Average Images per Plant: {total_valid_images / len(expected_plants):.1f}")
    
    if plants_needing_attention:
        print("\n⚠ PLANTS NEEDING ATTENTION:")
        for plant in plants_needing_attention:
            print(f"  - {plant}")
    
    # Save report
    report_path = DATASET_PATH / 'audit_report.txt'
    print(f"\n📄 Report saved to: {report_path}")
    
    return plants_needing_attention

def fix_with_user_uploads():
    """Move user-uploaded images to appropriate training folders"""
    import shutil
    from pathlib import Path
    
    uploads_dir = Path('../media/uploads')
    if not uploads_dir.exists():
        print("❌ No uploads directory found")
        return
    
    print("\n" + "=" * 70)
    print("MOVING USER UPLOADS TO TRAINING DATASET")
    print("=" * 70)
    
    moved_count = 0
    for upload_file in uploads_dir.glob('*.jpg'):
        filename = upload_file.name.lower()
        
        # Try to identify plant from filename
        target_plant = None
        if 'bayabas' in filename or 'guava' in filename:
            target_plant = 'Bayabas'
        elif 'sambong' in filename:
            target_plant = 'Sambong'
        elif 'lagundi' in filename:
            target_plant = 'Lagundi'
        elif 'citrus' in filename or 'dayap' in filename:
            target_plant = 'Key Lime Dayap'
        
        if target_plant:
            target_dir = DATASET_PATH / target_plant
            target_dir.mkdir(parents=True, exist_ok=True)
            
            # Copy with unique name
            dest_name = f"user_upload_{upload_file.name}"
            dest_path = target_dir / dest_name
            
            try:
                shutil.copy2(upload_file, dest_path)
                print(f"✓ Moved: {upload_file.name} → {target_plant}/")
                moved_count += 1
            except Exception as e:
                print(f"✗ Failed: {upload_file.name} - {e}")
    
    print(f"\n📊 Moved {moved_count} images to training folders")
    return moved_count

if __name__ == '__main__':
    print("\n🔍 Starting Dataset Audit...\n")
    
    # Run audit
    problem_plants = generate_report()
    
    # Fix with user uploads
    if problem_plants:
        print(f"\n🔧 Attempting to fix with user uploads...")
        fixed_count = fix_with_user_uploads()
        
        if fixed_count > 0:
            print("\n🔄 Re-running audit after fixes...")
            generate_report()
    
    print("\n" + "=" * 70)
    print("AUDIT COMPLETE")
    print("=" * 70)
    print("\n💡 NEXT STEPS:")
    print("   1. Review plants marked as 'NEEDS DATA'")
    print("   2. Download real plant images from reliable sources")
    print("   3. Ensure minimum 50-100 images per plant for good accuracy")
    print("   4. Retrain model once dataset is populated")
