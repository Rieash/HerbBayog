"""
Feedback system for collecting wrong predictions
This helps improve the model by collecting real-world photos
"""
import os
import json
import shutil
from datetime import datetime
from django.conf import settings

FEEDBACK_DIR = os.path.join(settings.BASE_DIR, 'feedback_data')
FEEDBACK_LOG = os.path.join(FEEDBACK_DIR, 'feedback_log.json')

def init_feedback_system():
    """Initialize feedback directories"""
    if not os.path.exists(FEEDBACK_DIR):
        os.makedirs(FEEDBACK_DIR)
        
    # Create subdirectories for each plant
    with open(os.path.join(settings.BASE_DIR, 'models', 'model_info.json'), 'r') as f:
        import json
        info = json.load(f)
        for plant in info['class_names']:
            plant_dir = os.path.join(FEEDBACK_DIR, plant.replace(' ', '_'))
            if not os.path.exists(plant_dir):
                os.makedirs(plant_dir)
    
    # Initialize log file
    if not os.path.exists(FEEDBACK_LOG):
        with open(FEEDBACK_LOG, 'w') as f:
            json.dump([], f)

def save_feedback(image_path, predicted_plant, correct_plant, confidence, notes=""):
    """
    Save user feedback for wrong predictions
    
    Args:
        image_path: Path to the uploaded image
        predicted_plant: What the AI predicted
        correct_plant: What the user says it actually is
        confidence: AI confidence score
        notes: Optional user notes
    """
    init_feedback_system()
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    # Copy image to feedback directory
    if correct_plant:
        dest_dir = os.path.join(FEEDBACK_DIR, correct_plant.replace(' ', '_'))
        filename = f"feedback_{timestamp}_{os.path.basename(image_path)}"
        dest_path = os.path.join(dest_dir, filename)
        shutil.copy(image_path, dest_path)
    else:
        # Unknown plant - save to 'unknown' folder
        unknown_dir = os.path.join(FEEDBACK_DIR, 'unknown')
        if not os.path.exists(unknown_dir):
            os.makedirs(unknown_dir)
        filename = f"feedback_{timestamp}_{os.path.basename(image_path)}"
        dest_path = os.path.join(unknown_dir, filename)
        shutil.copy(image_path, dest_path)
    
    # Log the feedback
    feedback_entry = {
        'timestamp': timestamp,
        'image_path': dest_path,
        'predicted': predicted_plant,
        'correct': correct_plant,
        'confidence': confidence,
        'notes': notes
    }
    
    # Read existing log
    with open(FEEDBACK_LOG, 'r') as f:
        log = json.load(f)
    
    # Add new entry
    log.append(feedback_entry)
    
    # Save updated log
    with open(FEEDBACK_LOG, 'w') as f:
        json.dump(log, f, indent=2)
    
    print(f"[FEEDBACK] Saved feedback: {predicted_plant} -> {correct_plant} at {confidence}%")
    return dest_path

def get_feedback_stats():
    """Get statistics on feedback collected"""
    if not os.path.exists(FEEDBACK_LOG):
        return {'total': 0, 'by_plant': {}}
    
    with open(FEEDBACK_LOG, 'r') as f:
        log = json.load(f)
    
    stats = {
        'total': len(log),
        'by_plant': {},
        'accuracy_by_confidence': {
            'high (>70%)': {'correct': 0, 'wrong': 0},
            'medium (40-70%)': {'correct': 0, 'wrong': 0},
            'low (<40%)': {'correct': 0, 'wrong': 0}
        }
    }
    
    for entry in log:
        plant = entry['correct']
        if plant not in stats['by_plant']:
            stats['by_plant'][plant] = 0
        stats['by_plant'][plant] += 1
        
        # Track accuracy by confidence level
        conf = entry['confidence']
        if conf > 70:
            if entry['predicted'] == entry['correct']:
                stats['accuracy_by_confidence']['high (>70%)']['correct'] += 1
            else:
                stats['accuracy_by_confidence']['high (>70%)']['wrong'] += 1
        elif conf >= 40:
            if entry['predicted'] == entry['correct']:
                stats['accuracy_by_confidence']['medium (40-70%)']['correct'] += 1
            else:
                stats['accuracy_by_confidence']['medium (40-70%)']['wrong'] += 1
        else:
            if entry['predicted'] == entry['correct']:
                stats['accuracy_by_confidence']['low (<40%)']['correct'] += 1
            else:
                stats['accuracy_by_confidence']['low (<40%)']['wrong'] += 1
    
    return stats

def export_feedback_for_retraining():
    """
    Export feedback data to training directory for retraining
    Returns the path to the exported dataset
    """
    import json
    
    if not os.path.exists(FEEDBACK_LOG):
        return None
    
    with open(FEEDBACK_LOG, 'r') as f:
        log = json.load(f)
    
    if len(log) == 0:
        return None
    
    # Create export directory
    export_dir = os.path.join(settings.BASE_DIR, 'training', 'feedback_dataset')
    if not os.path.exists(export_dir):
        os.makedirs(export_dir)
    
    # Copy images organized by correct plant
    for entry in log:
        if entry['correct'] and entry['correct'] != 'Unknown Plant':
            plant_dir = os.path.join(export_dir, entry['correct'].replace(' ', '_'))
            if not os.path.exists(plant_dir):
                os.makedirs(plant_dir)
            
            # Copy image
            if os.path.exists(entry['image_path']):
                shutil.copy(entry['image_path'], plant_dir)
    
    print(f"[FEEDBACK] Exported {len(log)} images to {export_dir}")
    return export_dir

if __name__ == '__main__':
    # Test the feedback system
    init_feedback_system()
    stats = get_feedback_stats()
    print(f"Feedback stats: {json.dumps(stats, indent=2)}")
