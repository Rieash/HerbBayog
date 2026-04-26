"""
Enhanced Plant Contribution System
Collects high-quality plant photos for model improvement
"""
import os
import json
import shutil
import hashlib
from datetime import datetime
from PIL import Image
import numpy as np
from django.conf import settings

CONTRIBUTION_DIR = os.path.join(settings.BASE_DIR, 'contributions')
CONTRIBUTION_LOG = os.path.join(CONTRIBUTION_DIR, 'contribution_db.json')
BATCH_DIR = os.path.join(CONTRIBUTION_DIR, 'batches')

class ContributionManager:
    """Manages plant photo contributions for model training"""
    
    def __init__(self):
        self._init_directories()
    
    def _init_directories(self):
        """Initialize contribution directories"""
        # Load plant names
        with open(os.path.join(settings.BASE_DIR, 'models', 'model_info.json'), 'r') as f:
            info = json.load(f)
        
        for plant in info['class_names']:
            plant_dir = os.path.join(CONTRIBUTION_DIR, plant.replace(' ', '_'))
            os.makedirs(plant_dir, exist_ok=True)
        
        os.makedirs(BATCH_DIR, exist_ok=True)
        
        # Initialize database
        if not os.path.exists(CONTRIBUTION_LOG):
            with open(CONTRIBUTION_LOG, 'w') as f:
                json.dump({
                    'contributions': [],
                    'stats': {
                        'total_contributions': 0,
                        'by_plant': {},
                        'by_status': {
                            'pending': 0,
                            'approved': 0,
                            'rejected': 0,
                            'used_for_training': 0
                        }
                    }
                }, f, indent=2)
    
    def validate_image_quality(self, image_path):
        """
        Validate image quality before accepting contribution
        Returns: (is_valid, quality_score, message)
        """
        try:
            img = Image.open(image_path)
            img_array = np.array(img)
            
            # Check image dimensions
            width, height = img.size
            if width < 224 or height < 224:
                return False, 0, f"Image too small ({width}x{height}). Minimum 224x224 required."
            
            # Check brightness
            brightness = np.mean(img_array)
            if brightness < 30:
                return False, 0, f"Image too dark (brightness: {brightness:.1f}). Please use better lighting."
            if brightness > 245:
                return False, 0, f"Image overexposed (brightness: {brightness:.1f})."
            
            # Check for variation (not all same color)
            std_dev = np.std(img_array)
            if std_dev < 10:
                return False, 0, "Image lacks detail. Please capture clearer plant features."
            
            # Calculate quality score (0-100)
            quality_score = min(100, int(
                30 +  # Base score
                (min(width, height) / 1000) * 20 +  # Resolution bonus
                (std_dev / 50) * 25 +  # Detail bonus
                (1 - abs(brightness - 127) / 127) * 25  # Optimal brightness bonus
            ))
            
            return True, quality_score, "Image quality acceptable"
            
        except Exception as e:
            return False, 0, f"Error validating image: {str(e)}"
    
    def save_contribution(self, image_path, plant_name, contributor_info=None, 
                         contribution_type='correction', notes="", ai_prediction=None):
        """
        Save a plant photo contribution
        
        Args:
            image_path: Path to the image file
            plant_name: Name of the plant
            contributor_info: Dict with contributor details (optional)
            contribution_type: 'correction', 'new_sample', or 'validation'
            notes: Additional notes
            ai_prediction: What AI predicted (if correction)
        """
        # Validate quality first
        is_valid, quality_score, message = self.validate_image_quality(image_path)
        if not is_valid:
            return {'success': False, 'error': message}
        
        # Generate unique ID
        timestamp = datetime.now()
        file_hash = hashlib.md5(open(image_path, 'rb').read(8192)).hexdigest()[:8]
        contribution_id = f"{timestamp.strftime('%Y%m%d_%H%M%S')}_{file_hash}"
        
        # Prepare destination
        safe_plant_name = plant_name.replace(' ', '_')
        dest_dir = os.path.join(CONTRIBUTION_DIR, safe_plant_name)
        os.makedirs(dest_dir, exist_ok=True)
        
        # Get image info
        img = Image.open(image_path)
        width, height = img.size
        file_size = os.path.getsize(image_path)
        
        # Create filename with metadata
        filename = f"{contribution_id}_{width}x{height}_q{quality_score}.jpg"
        dest_path = os.path.join(dest_dir, filename)
        
        # Copy image
        shutil.copy(image_path, dest_path)
        
        # Create contribution record
        contribution = {
            'id': contribution_id,
            'timestamp': timestamp.isoformat(),
            'plant_name': plant_name,
            'file_path': dest_path,
            'filename': filename,
            'image_info': {
                'width': width,
                'height': height,
                'file_size_bytes': file_size,
                'quality_score': quality_score,
                'format': img.format
            },
            'contribution_type': contribution_type,  # correction, new_sample, validation
            'ai_prediction': ai_prediction,
            'contributor_info': contributor_info or {},
            'notes': notes,
            'status': 'approved' if quality_score >= 70 else 'pending',  # Auto-approve high quality
            'batch_id': None,  # Assigned when used for training
            'review_notes': None,
            'verified_by': 'auto' if quality_score >= 70 else None
        }
        
        # Save to database
        with open(CONTRIBUTION_LOG, 'r') as f:
            db = json.load(f)
        
        db['contributions'].append(contribution)
        db['stats']['total_contributions'] += 1
        
        # Update plant stats
        if plant_name not in db['stats']['by_plant']:
            db['stats']['by_plant'][plant_name] = 0
        db['stats']['by_plant'][plant_name] += 1
        
        # Update status stats based on quality
        if quality_score >= 70:
            db['stats']['by_status']['approved'] += 1
        else:
            db['stats']['by_status']['pending'] += 1
        
        with open(CONTRIBUTION_LOG, 'w') as f:
            json.dump(db, f, indent=2)
        
        print(f"[CONTRIBUTION] Saved: {plant_name} (Quality: {quality_score}/100) ID: {contribution_id}")
        
        return {
            'success': True,
            'contribution_id': contribution_id,
            'quality_score': quality_score,
            'message': f"Contribution saved successfully! Quality score: {quality_score}/100"
        }
    
    def get_contributions_for_training(self, min_quality_score=60, min_samples_per_plant=10):
        """
        Get approved contributions ready for training
        Creates a training batch
        """
        with open(CONTRIBUTION_LOG, 'r') as f:
            db = json.load(f)
        
        # Filter approved contributions with good quality
        approved = [c for c in db['contributions'] 
                   if c['status'] == 'approved' 
                   and c['image_info']['quality_score'] >= min_quality_score]
        
        # Group by plant
        by_plant = {}
        for c in approved:
            plant = c['plant_name']
            if plant not in by_plant:
                by_plant[plant] = []
            by_plant[plant].append(c)
        
        # Check if we have enough for each plant
        ready_for_training = {}
        insufficient = {}
        
        for plant, contributions in by_plant.items():
            if len(contributions) >= min_samples_per_plant:
                ready_for_training[plant] = contributions
            else:
                insufficient[plant] = len(contributions)
        
        return {
            'ready_for_training': ready_for_training,
            'insufficient_samples': insufficient,
            'total_ready': sum(len(c) for c in ready_for_training.values()),
            'plants_ready': len(ready_for_training)
        }
    
    def create_training_batch(self, batch_name, plant_selection=None):
        """
        Create a training batch from approved contributions
        """
        batch_id = f"batch_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        batch_dir = os.path.join(BATCH_DIR, batch_id)
        os.makedirs(batch_dir, exist_ok=True)
        
        # Get contributions
        training_data = self.get_contributions_for_training()
        
        if plant_selection:
            plants_to_include = {p: v for p, v in training_data['ready_for_training'].items() 
                               if p in plant_selection}
        else:
            plants_to_include = training_data['ready_for_training']
        
        if not plants_to_include:
            return {'success': False, 'error': 'No plants ready for training'}
        
        # Copy images to batch
        batch_manifest = {
            'batch_id': batch_id,
            'batch_name': batch_name,
            'created_at': datetime.now().isoformat(),
            'plants': {},
            'total_images': 0
        }
        
        for plant, contributions in plants_to_include.items():
            plant_dir = os.path.join(batch_dir, plant.replace(' ', '_'))
            os.makedirs(plant_dir, exist_ok=True)
            
            batch_manifest['plants'][plant] = {
                'image_count': len(contributions),
                'contributions': []
            }
            
            for c in contributions:
                # Copy to batch
                dest = os.path.join(plant_dir, os.path.basename(c['file_path']))
                shutil.copy(c['file_path'], dest)
                
                # Update contribution status
                c['status'] = 'used_for_training'
                c['batch_id'] = batch_id
                batch_manifest['plants'][plant]['contributions'].append(c['id'])
            
            batch_manifest['total_images'] += len(contributions)
        
        # Save batch manifest
        with open(os.path.join(batch_dir, 'manifest.json'), 'w') as f:
            json.dump(batch_manifest, f, indent=2)
        
        # Update database
        with open(CONTRIBUTION_LOG, 'r') as f:
            db = json.load(f)
        
        for plant, contributions in plants_to_include.items():
            for c in contributions:
                for db_c in db['contributions']:
                    if db_c['id'] == c['id']:
                        db_c['status'] = 'used_for_training'
                        db_c['batch_id'] = batch_id
        
        db['stats']['by_status']['approved'] -= batch_manifest['total_images']
        db['stats']['by_status']['used_for_training'] += batch_manifest['total_images']
        
        with open(CONTRIBUTION_LOG, 'w') as f:
            json.dump(db, f, indent=2)
        
        print(f"[BATCH] Created {batch_id} with {batch_manifest['total_images']} images")
        
        return {
            'success': True,
            'batch_id': batch_id,
            'batch_path': batch_dir,
            'manifest': batch_manifest
        }
    
    def get_stats(self):
        """Get contribution statistics"""
        with open(CONTRIBUTION_LOG, 'r') as f:
            db = json.load(f)
        return db['stats']
    
    def list_batches(self):
        """List all training batches"""
        batches = []
        if os.path.exists(BATCH_DIR):
            for batch_id in os.listdir(BATCH_DIR):
                manifest_path = os.path.join(BATCH_DIR, batch_id, 'manifest.json')
                if os.path.exists(manifest_path):
                    with open(manifest_path, 'r') as f:
                        batches.append(json.load(f))
        return batches

# Legacy support - maintain old function signatures
def save_feedback(image_path, predicted_plant, correct_plant, confidence, notes=""):
    """Legacy wrapper for new contribution system"""
    manager = ContributionManager()
    return manager.save_contribution(
        image_path=image_path,
        plant_name=correct_plant,
        ai_prediction=predicted_plant,
        contribution_type='correction',
        notes=notes
    )

def get_feedback_stats():
    """Legacy wrapper"""
    manager = ContributionManager()
    return manager.get_stats()

def export_feedback_for_retraining():
    """Legacy wrapper"""
    manager = ContributionManager()
    training_data = manager.get_contributions_for_training(min_samples_per_plant=1)
    
    if training_data['plants_ready'] == 0:
        return None
    
    batch = manager.create_training_batch(
        batch_name="Auto Export",
        plant_selection=list(training_data['ready_for_training'].keys())
    )
    
    return batch['batch_path'] if batch['success'] else None

if __name__ == '__main__':
    # Test the system
    manager = ContributionManager()
    print(f"Stats: {json.dumps(manager.get_stats(), indent=2)}")
