import os
from pathlib import Path
import json

class DatasetValidator:
    def __init__(self, data_dir="training_data"):
        self.data_dir = Path(data_dir)
        
        # Expected plant classes for HerbBayog
        self.expected_plants = [
            'Akapulko', 'Ampalaya', 'Bawang', 'Bayabas', 'Lagundi', 
            'Niyog-niyogan', 'Sambong', 'Tsaang Gubat', 'Ulasimang Bato', 'Yerba Buena'
        ]
        
        # Expected minimum images per class
        self.min_images_per_class = 10

    def validate_dataset_structure(self):
        """Validate the training dataset structure"""
        print("🔍 Validating HerbBayog Dataset Structure...")
        print("=" * 50)
        
        validation_results = {
            'valid_structure': True,
            'found_plants': [],
            'missing_plants': [],
            'image_counts': {},
            'total_images': 0,
            'issues': [],
            'recommendations': []
        }
        
        # Check if data directory exists
        if not self.data_dir.exists():
            validation_results['valid_structure'] = False
            validation_results['issues'].append("Training data directory not found")
            return validation_results
        
        # Check each plant directory
        for plant_name in self.expected_plants:
            plant_dir = self.data_dir / plant_name
            
            if plant_dir.exists() and plant_dir.is_dir():
                validation_results['found_plants'].append(plant_name)
                
                # Count images in plant directory
                image_files = []
                for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
                    image_files.extend(plant_dir.glob(ext))
                
                image_count = len(image_files)
                validation_results['image_counts'][plant_name] = image_count
                validation_results['total_images'] += image_count
                
                # Check if minimum images are present
                if image_count < self.min_images_per_class:
                    validation_results['issues'].append(
                        f"⚠️  {plant_name}: Only {image_count} images (minimum {self.min_images_per_class} recommended)"
                    )
                    validation_results['recommendations'].append(
                        f"Add {self.min_images_per_class - image_count} more images for {plant_name}"
                    )
                else:
                    print(f"✅ {plant_name}: {image_count} images")
                    
            else:
                validation_results['missing_plants'].append(plant_name)
                validation_results['issues'].append(
                    f"❌ {plant_name}: Directory not found"
                )
                validation_results['recommendations'].append(
                    f"Create directory: {plant_dir}"
                )
        
        # Summary
        print(f"\n📊 Dataset Summary:")
        print(f"  Total Plants Found: {len(validation_results['found_plants'])}")
        print(f"  Missing Plants: {len(validation_results['missing_plants'])}")
        print(f"  Total Images: {validation_results['total_images']}")
        print(f"  Average Images per Plant: {validation_results['total_images'] / len(validation_results['found_plants']):.1f}")
        
        # Issues and recommendations
        if validation_results['issues']:
            print(f"\n⚠️  Issues Found:")
            for issue in validation_results['issues']:
                print(f"  • {issue}")
        
        if validation_results['recommendations']:
            print(f"\n💡 Recommendations:")
            for rec in validation_results['recommendations']:
                print(f"  • {rec}")
        
        # Overall validation status
        if (len(validation_results['missing_plants']) == 0 and 
            len(validation_results['issues']) == 0 and
            validation_results['total_images'] >= len(self.expected_plants) * self.min_images_per_class):
            
            print(f"\n✅ Dataset is ready for training!")
            validation_results['ready_for_training'] = True
        else:
            print(f"\n❌ Dataset needs attention before training")
            validation_results['ready_for_training'] = False
        
        return validation_results

    def check_image_quality(self, sample_size=5):
        """Check quality of sample images"""
        print(f"\n🔍 Checking image quality (sample {sample_size} images per class)...")
        
        quality_report = {
            'total_checked': 0,
            'valid_images': 0,
            'corrupted_images': 0,
            'size_issues': [],
            'recommendations': []
        }
        
        for plant_name in self.expected_plants:
            plant_dir = self.data_dir / plant_name
            if not plant_dir.exists():
                continue
                
            image_files = []
            for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
                image_files.extend(plant_dir.glob(ext))
            
            # Check sample images
            import random
            sample_files = random.sample(image_files, min(sample_size, len(image_files)))
            
            for img_path in sample_files:
                try:
                    from PIL import Image
                    with Image.open(img_path) as img:
                        # Check image properties
                        width, height = img.size
                        if width < 100 or height < 100:
                            quality_report['size_issues'].append(
                                f"{img_path.name}: Small size ({width}x{height})"
                            )
                        
                        # Check if image loads properly
                        img.verify()
                        quality_report['valid_images'] += 1
                        
                except Exception as e:
                    quality_report['corrupted_images'] += 1
                    print(f"❌ Corrupted image: {img_path.name} - {e}")
                
                quality_report['total_checked'] += 1
        
        # Quality summary
        print(f"\n📊 Image Quality Report:")
        print(f"  Total Checked: {quality_report['total_checked']}")
        print(f"  Valid Images: {quality_report['valid_images']}")
        print(f"  Corrupted Images: {quality_report['corrupted_images']}")
        
        if quality_report['size_issues']:
            print(f"  Size Issues: {len(quality_report['size_issues'])}")
            for issue in quality_report['size_issues'][:5]:  # Show first 5
                print(f"    • {issue}")
        
        if quality_report['corrupted_images'] > 0:
            quality_report['recommendations'].append(
                f"Remove {quality_report['corrupted_images']} corrupted images"
            )
        
        if len(quality_report['size_issues']) > quality_report['total_checked'] * 0.2:
            quality_report['recommendations'].append(
                "Consider resizing small images to at least 224x224"
            )
        
        return quality_report

    def create_training_report(self, validation_results, quality_results):
        """Create comprehensive training report"""
        report = {
            'validation_timestamp': json.dumps({'timestamp': 'now'}),
            'dataset_structure': validation_results,
            'image_quality': quality_results,
            'training_readiness': {
                'ready': validation_results.get('ready_for_training', False),
                'overall_score': 0,
                'next_steps': []
            }
        }
        
        # Calculate overall readiness score
        score = 100
        if not validation_results.get('ready_for_training', False):
            score -= 50
        
        # Deduct points for issues
        score -= len(validation_results.get('issues', [])) * 5
        score -= quality_results.get('corrupted_images', 0) * 10
        score -= len(quality_results.get('size_issues', [])) * 2
        
        report['training_readiness']['overall_score'] = max(0, score)
        
        # Determine next steps
        if score >= 80:
            report['training_readiness']['next_steps'] = [
                "Dataset is ready for model training",
                "Run: python model_trainer.py"
            ]
        elif score >= 60:
            report['training_readiness']['next_steps'] = [
                "Dataset has some issues but can be improved",
                "Add more images and fix corrupted files",
                "Re-run validation after improvements"
            ]
        else:
            report['training_readiness']['next_steps'] = [
                "Dataset needs significant improvements",
                "Follow recommendations above",
                "Consider collecting more training data"
            ]
        
        # Save report
        with open(self.data_dir.parent / 'training_report.json', 'w') as f:
            json.dump(report, f, indent=2)
        
        print(f"\n📋 Training report saved to: training_report.json")
        return report

def main():
    """Main validation function"""
    print("🌿 HerbBayog Dataset Validator")
    print("=" * 50)
    
    validator = DatasetValidator()
    
    # Validate structure
    validation_results = validator.validate_dataset_structure()
    
    # Check image quality if structure is valid
    if validation_results['found_plants']:
        quality_results = validator.check_image_quality()
    else:
        quality_results = {'total_checked': 0, 'valid_images': 0}
    
    # Create report
    validator.create_training_report(validation_results, quality_results)
    
    print("\n🎉 Validation completed!")
    print("Check 'training_report.json' for detailed results")

if __name__ == "__main__":
    main()
