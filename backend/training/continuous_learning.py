"""
Continuous Learning Pipeline for HerbBayog
Integrates approved user submissions into training dataset and retraining
"""
import os
import sys
import json
import shutil
from pathlib import Path
from datetime import datetime

# Configuration
BASE_DIR = Path(__file__).parent.parent
TRAINING_DATA_DIR = BASE_DIR / 'training' / 'training_data' / 'herbbayog_complete_dataset'
SUBMISSIONS_DIR = BASE_DIR / 'media' / 'submissions'
MODELS_DIR = BASE_DIR / 'models'

class ContinuousLearningPipeline:
    """Manages continuous learning from user submissions"""
    
    def __init__(self):
        self.stats = {
            'processed': 0,
            'added_to_training': 0,
            'errors': []
        }
    
    def integrate_approved_submissions(self):
        """Move approved user submissions to training dataset"""
        print("=" * 60)
        print("CONTINUOUS LEARNING - Integrating User Submissions")
        print("=" * 60)
        
        # Check for approved submissions
        approved_dir = SUBMISSIONS_DIR / 'approved'
        if not approved_dir.exists():
            print("No approved submissions found")
            return self.stats
        
        # Process each approved submission
        for submission_file in approved_dir.glob('*.jpg'):
            try:
                # Parse plant name from filename (format: submission_{id}_{plant_name}.jpg)
                parts = submission_file.stem.split('_')
                if len(parts) >= 3:
                    plant_name = '_'.join(parts[2:])  # Handle multi-word names
                else:
                    plant_name = parts[-1] if len(parts) > 1 else 'Unknown'
                
                # Find matching training folder
                target_dir = self._find_plant_directory(plant_name)
                if not target_dir:
                    print(f"⚠ No matching folder for '{plant_name}', skipping {submission_file.name}")
                    continue
                
                # Copy to training dataset with unique name
                dest_name = f"user_submission_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{submission_file.name}"
                dest_path = target_dir / dest_name
                
                shutil.copy2(submission_file, dest_path)
                
                # Mark as processed (move to archived)
                archived_dir = SUBMISSIONS_DIR / 'archived'
                archived_dir.mkdir(parents=True, exist_ok=True)
                shutil.move(submission_file, archived_dir / submission_file.name)
                
                self.stats['processed'] += 1
                self.stats['added_to_training'] += 1
                print(f"✓ Added: {plant_name}/{dest_name}")
                
            except Exception as e:
                self.stats['errors'].append(f"{submission_file.name}: {e}")
                print(f"✗ Error processing {submission_file.name}: {e}")
        
        print(f"\n📊 Integrated {self.stats['added_to_training']} new images")
        return self.stats
    
    def _find_plant_directory(self, plant_name):
        """Find matching plant directory (handles variations in naming)"""
        plant_lower = plant_name.lower().replace('_', ' ')
        
        # Exact match
        exact_match = TRAINING_DATA_DIR / plant_name
        if exact_match.exists():
            return exact_match
        
        # Case-insensitive search
        for dir_path in TRAINING_DATA_DIR.iterdir():
            if dir_path.is_dir():
                dir_name = dir_path.name.lower()
                # Check for exact match or contained match
                if plant_lower == dir_name or plant_lower in dir_name or dir_name in plant_lower:
                    return dir_path
        
        return None
    
    def get_dataset_stats(self):
        """Get current dataset statistics"""
        print("\n" + "=" * 60)
        print("CURRENT DATASET STATISTICS")
        print("=" * 60)
        
        stats = {}
        total_images = 0
        
        for plant_dir in sorted(TRAINING_DATA_DIR.iterdir()):
            if plant_dir.is_dir():
                images = list(plant_dir.glob('*.jpg'))
                count = len(images)
                stats[plant_dir.name] = count
                total_images += count
        
        print(f"Total Plants: {len(stats)}")
        print(f"Total Images: {total_images}")
        print(f"Average per Plant: {total_images / len(stats):.1f}")
        
        # Show distribution
        print("\nImage Distribution:")
        for plant, count in sorted(stats.items(), key=lambda x: x[1], reverse=True):
            bar = "█" * (count // 20)
            print(f"  {plant:30s} {count:4d} {bar}")
        
        return stats
    
    def trigger_retraining(self, fast_mode=False):
        """Trigger model retraining with updated dataset"""
        print("\n" + "=" * 60)
        print("TRIGGERING MODEL RETRAINING")
        print("=" * 60)
        
        # Determine which trainer to use
        if fast_mode:
            trainer_script = 'fast_trainer.py'
            print("Using FAST TRAINER (MobileNetV2, ~1 hour)")
        else:
            trainer_script = 'robust_trainer.py'
            print("Using ROBUST TRAINER (DenseNet121, ~20 hours)")
        
        print(f"\nTo start retraining, run:")
        print(f"  cd d:\\HerbBayog\\backend\\training")
        print(f"  python {trainer_script}")
        
        return trainer_script
    
    def generate_report(self):
        """Generate continuous learning report"""
        report_path = BASE_DIR / 'training' / 'continuous_learning_report.json'
        
        report = {
            'timestamp': datetime.now().isoformat(),
            'stats': self.stats,
            'dataset_stats': self.get_dataset_stats(),
            'next_steps': [
                'Review integrated images in training dataset',
                'Run robust_trainer.py for full retraining',
                'Or run fast_trainer.py for quick updates'
            ]
        }
        
        with open(report_path, 'w') as f:
            json.dump(report, f, indent=2, default=str)
        
        print(f"\n📄 Report saved to: {report_path}")
        return report

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("HERBBAYOG CONTINUOUS LEARNING PIPELINE")
    print("=" * 60)
    
    pipeline = ContinuousLearningPipeline()
    
    # Step 1: Integrate approved submissions
    pipeline.integrate_approved_submissions()
    
    # Step 2: Show dataset stats
    pipeline.get_dataset_stats()
    
    # Step 3: Generate report
    pipeline.generate_report()
    
    # Step 4: Offer retraining options
    print("\n" + "=" * 60)
    print("RETRAINING OPTIONS")
    print("=" * 60)
    print("\n1. FAST RETRAIN (MobileNetV2, ~1 hour)")
    print("   Use for quick updates with user submissions")
    print("   Run: python fast_trainer.py")
    print("\n2. FULL RETRAIN (DenseNet121, ~20 hours)")
    print("   Use for maximum accuracy")
    print("   Run: python robust_trainer.py")
    print("\n3. HYBRID APPROACH")
    print("   Use fast_trainer.py now for immediate improvement")
    print("   Run robust_trainer.py overnight for best accuracy")
    
    print("\n" + "=" * 60)
    print("CONTINUOUS LEARNING PIPELINE COMPLETE")
    print("=" * 60)
