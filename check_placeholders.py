"""
Comprehensive placeholder checker for HerbBayog
"""
import os
import json
import re

PLACEHOLDER_PATTERNS = [
    r'lorem\s+ipsum',
    r'placeholder',
    r'todo|fixme|hack',
    r'example\.com',
    r'test@email\.com',
    r'dummy|fake|mock',
    r'your\s+(email|name|text|content)',
    r'insert\s+(here|text)',
    r'xxxx|yyyy|zzzz',
    r'000-000-0000',
    r'99\.99%\s+accuracy',  # Suspiciously round numbers
    r'100%\s+accuracy',     # Suspiciously perfect
]

def check_file(filepath):
    """Check a single file for placeholders"""
    issues = []
    
    if not os.path.exists(filepath):
        return [(filepath, "FILE NOT FOUND", "")]
    
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
        for pattern in PLACEHOLDER_PATTERNS:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                line_num = content[:match.start()].count('\n') + 1
                snippet = content[max(0, match.start()-30):min(len(content), match.end()+30)]
                issues.append((filepath, line_num, pattern, snippet.strip()))
                
    except Exception as e:
        issues.append((filepath, "ERROR", str(e)))
    
    return issues

def check_json_file(filepath):
    """Check JSON files for suspicious data"""
    issues = []
    
    if not os.path.exists(filepath):
        return issues
    
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        # Check for suspiciously perfect metrics
        if isinstance(data, dict):
            if 'accuracy' in data or 'final_val_accuracy' in data:
                acc = data.get('accuracy') or data.get('final_val_accuracy', 0)
                if acc == 1.0 or acc == 0.9994:
                    issues.append((filepath, "SUSPICIOUS", f"Accuracy: {acc} (possibly fabricated)"))
            
            # Check class names for duplicates or placeholders
            if 'class_names' in data:
                classes = data['class_names']
                if len(classes) != len(set(classes)):
                    issues.append((filepath, "DUPLICATE", "Duplicate class names found"))
                
                # Check for placeholder plant names
                placeholder_names = ['test', 'placeholder', 'sample', 'example']
                for cls in classes:
                    if any(p in cls.lower() for p in placeholder_names):
                        issues.append((filepath, "PLACEHOLDER", f"Class name: {cls}"))
                        
    except Exception as e:
        pass
    
    return issues

def main():
    print("="*70)
    print("HERBBAYOG PLACEHOLDER CHECKER")
    print("="*70)
    
    all_issues = []
    
    # Check key files
    files_to_check = [
        # Backend
        'backend/herbal_plants/views.py',
        'backend/herbal_plants/models.py',
        'backend/models/model_info.json',
        'backend/models/classification_report.txt',
        
        # Frontend
        'frontend/src/pages/Landing.js',
        'frontend/src/pages/Plants.js',
        'frontend/src/pages/Scan.js',
        'frontend/src/pages/Stats.js',
        
        # Data
        'backend/training/train_data/list.txt',
    ]
    
    for filepath in files_to_check:
        full_path = os.path.join('d:\\HerbBayog', filepath)
        
        if filepath.endswith('.json'):
            issues = check_json_file(full_path)
        else:
            issues = check_file(full_path)
        
        all_issues.extend(issues)
    
    # Print results
    if all_issues:
        print("\n⚠️  POTENTIAL ISSUES FOUND:\n")
        for issue in all_issues:
            if len(issue) == 3:
                filepath, line_or_type, detail = issue
                print(f"  📁 {filepath}")
                print(f"     Type: {line_or_type}")
                print(f"     Detail: {detail}")
            else:
                filepath, line, pattern, snippet = issue
                print(f"  📁 {filepath}:{line}")
                print(f"     Pattern: {pattern}")
                print(f"     Snippet: {snippet[:80]}...")
            print()
    else:
        print("\n✅ NO PLACEHOLDERS FOUND!")
        print("   All files appear to contain legitimate content.")
    
    # Additional checks
    print("\n" + "="*70)
    print("ADDITIONAL CHECKS")
    print("="*70)
    
    # Check model file size
    model_path = 'd:\\HerbBayog\\backend\\models\\herbbayog_best.h5'
    if os.path.exists(model_path):
        size_mb = os.path.getsize(model_path) / (1024 * 1024)
        print(f"\n✓ Model file exists: {size_mb:.1f} MB")
        if size_mb < 10:
            print(f"  ⚠️  WARNING: Model file is suspiciously small!")
        elif size_mb > 100:
            print(f"  ✓ Size looks reasonable for a CNN model")
    
    # Check training history
    history_path = 'd:\\HerbBayog\\backend\\models\\training_history.json'
    if os.path.exists(history_path):
        with open(history_path) as f:
            history = json.load(f)
        
        epochs = len(history.get('history', {}).get('accuracy', []))
        print(f"\n✓ Training history: {epochs} epochs")
        
        if epochs < 10:
            print(f"  ⚠️  WARNING: Only {epochs} epochs - model may be undertrained!")
        else:
            print(f"  ✓ Trained for {epochs} epochs")
    
    # Check class count
    info_path = 'd:\\HerbBayog\\backend\\models\\model_info.json'
    if os.path.exists(info_path):
        with open(info_path) as f:
            info = json.load(f)
        
        num_classes = info.get('num_classes', 0)
        print(f"\n✓ Model trained on {num_classes} classes")
        
        if num_classes != 40:
            print(f"  ⚠️  WARNING: Expected 40 classes, found {num_classes}!")
    
    print("\n" + "="*70)
    print("CHECK COMPLETE")
    print("="*70)

if __name__ == '__main__':
    main()
