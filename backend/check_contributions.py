#!/usr/bin/env python
"""
Quick script to check contribution status and auto-retrain progress
"""
import os
import json
from pathlib import Path

BASE_DIR = Path(__file__).parent

def check_contributions():
    """Check all contributions and retrain status"""
    
    # Load contribution database
    contrib_log = BASE_DIR / 'contributions' / 'contribution_db.json'
    retrain_status = BASE_DIR / 'training' / 'retrain_status.json'
    
    print("=" * 60)
    print("🌿 HerbBayog Contribution Status")
    print("=" * 60)
    
    # Check contribution data
    if contrib_log.exists():
        with open(contrib_log, 'r') as f:
            db = json.load(f)
        
        print(f"\n📊 Overall Stats:")
        print(f"   Total Contributions: {db['stats']['total_contributions']}")
        print(f"   Pending Review: {db['stats']['by_status']['pending']}")
        print(f"   Approved: {db['stats']['by_status']['approved']}")
        print(f"   Used for Training: {db['stats']['by_status']['used_for_training']}")
        
        print(f"\n📸 By Plant:")
        for plant, count in db['stats']['by_plant'].items():
            # Count approved for this plant
            approved = len([c for c in db['contributions'] 
                          if c['plant_name'] == plant and c['status'] == 'approved'])
            print(f"   {plant}: {count} total ({approved} approved)")
        
        print(f"\n🆕 Recent Contributions (last 10):")
        for c in db['contributions'][-10:]:
            status_icon = "✅" if c['status'] == 'approved' else "⏳" if c['status'] == 'pending' else "🎓"
            print(f"   {status_icon} {c['plant_name']} - Score: {c['image_info']['quality_score']}/100 - {c['status']}")
    else:
        print("\n❌ No contributions database found")
    
    # Check retrain status
    print(f"\n🤖 Auto-Retrain Status:")
    if retrain_status.exists():
        with open(retrain_status, 'r') as f:
            status = json.load(f)
        
        print(f"   Currently Training: {status.get('is_training', False)}")
        print(f"   Total Retrains: {status.get('total_retrains', 0)}")
        print(f"   Last Retrain: {status.get('last_retrain', 'Never')}")
        
        if status.get('is_training'):
            print(f"   ⏳ Training in progress since: {status.get('training_started')}")
        
        if status.get('performance_history'):
            print(f"\n📈 Recent Training History:")
            for h in status['performance_history'][-3:]:
                print(f"   {h['date'][:10]}: {h['model_version']} - Acc: {h['accuracy']:.2%} - {h['images_trained']} images")
    else:
        print("   No retrain history yet")
    
    # Check if any plants ready for retrain
    if contrib_log.exists():
        with open(contrib_log, 'r') as f:
            db = json.load(f)
        
        approved_by_plant = {}
        for c in db['contributions']:
            if c['status'] == 'approved':
                plant = c['plant_name']
                approved_by_plant[plant] = approved_by_plant.get(plant, 0) + 1
        
        print(f"\n🎯 Ready for Auto-Retrain (need 5+):")
        ready = [(p, c) for p, c in approved_by_plant.items() if c >= 5]
        if ready:
            for plant, count in ready:
                print(f"   ✅ {plant}: {count} photos - READY FOR RETRAIN!")
        else:
            print("   ⏳ No plants have 5+ approved photos yet")
            for plant, count in approved_by_plant.items():
                print(f"   ⏳ {plant}: {count}/5 photos")
    
    print("\n" + "=" * 60)
    print("💡 Tip: Upload high-quality photos (score 70+) to auto-approve")
    print("=" * 60)

if __name__ == '__main__':
    check_contributions()
