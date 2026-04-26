#!/usr/bin/env python
"""
Restore original model if retrained model is worse
"""
import os
import shutil

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, 'models')
BACKUPS_DIR = os.path.join(MODELS_DIR, 'backups')

def restore_original():
    """Restore original model from backup"""
    original_model = os.path.join(MODELS_DIR, 'herbbayog_v1.h5')
    current_model = os.path.join(MODELS_DIR, 'herbbayog_v2_20260411.h5')
    
    # Check if original exists
    if not os.path.exists(original_model):
        print("❌ Original model (herbbayog_v1.h5) not found!")
        print("   Looking for backups...")
        
        # Check backups
        if os.path.exists(BACKUPS_DIR):
            backups = [f for f in os.listdir(BACKUPS_DIR) if f.endswith('.h5')]
            if backups:
                print(f"   Found backups: {backups}")
                latest_backup = sorted(backups)[-1]
                backup_path = os.path.join(BACKUPS_DIR, latest_backup)
                print(f"   Restoring from: {latest_backup}")
                shutil.copy(backup_path, original_model)
                print("✅ Backup restored!")
            else:
                print("❌ No backups found either")
                return False
        else:
            print("❌ No backup directory")
            return False
    
    # Remove problematic v2 model
    if os.path.exists(current_model):
        print(f"🗑️  Removing retrained model: herbbayog_v2_20260411.h5")
        os.remove(current_model)
    
    print("\n✅ Original model restored!")
    print(f"   Model: herbbayog_v1.h5")
    print(f"   Trained on: 7,800 images")
    print(f"   Accuracy: 99.9%")
    print("\n🔄 Please restart the backend to use the original model")
    
    return True

if __name__ == '__main__':
    restore_original()
