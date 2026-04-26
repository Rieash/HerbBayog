"""
Heavy data augmentation for real-world photo simulation
Applied during inference to bridge domain gap between training and real-world photos
"""
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import random

def simulate_real_world_conditions(image):
    """
    Apply multiple augmentations to simulate real-world photography conditions
    Returns multiple augmented versions of the image
    """
    augmented_versions = []
    
    # Original
    augmented_versions.append(('original', image.copy()))
    
    # 1. Bright variations (outdoor sun, shade, indoor)
    bright = ImageEnhance.Brightness(image).enhance(1.3)
    bright = ImageEnhance.Contrast(bright).enhance(1.2)
    augmented_versions.append(('bright_sun', bright))
    
    dark = ImageEnhance.Brightness(image).enhance(0.7)
    dark = ImageEnhance.Contrast(dark).enhance(1.3)
    augmented_versions.append(('shade', dark))
    
    # 2. Color variations (different cameras, white balance)
    warm = ImageEnhance.Color(image).enhance(1.2)
    warm = ImageEnhance.Brightness(warm).enhance(1.1)
    augmented_versions.append(('warm', warm))
    
    cool = ImageEnhance.Color(image).enhance(0.9)
    augmented_versions.append(('cool', cool))
    
    # 3. Sharpness/Blur (camera focus, motion)
    sharp = image.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
    augmented_versions.append(('sharp', sharp))
    
    slight_blur = image.filter(ImageFilter.GaussianBlur(radius=0.5))
    augmented_versions.append(('slight_blur', slight_blur))
    
    # 4. Noise (phone camera quality, low light)
    img_array = np.array(image).astype(np.float32)
    noise = np.random.normal(0, 5, img_array.shape)
    noisy = np.clip(img_array + noise, 0, 255).astype(np.uint8)
    noisy_img = Image.fromarray(noisy)
    augmented_versions.append(('noisy', noisy_img))
    
    # 5. Auto-contrast (fix exposure issues)
    auto_contrast = ImageOps.autocontrast(image, cutoff=1)
    augmented_versions.append(('auto_contrast', auto_contrast))
    
    # 6. Equalize (histogram equalization for better details)
    equalized = ImageOps.equalize(image)
    augmented_versions.append(('equalized', equalized))
    
    # 7. High contrast (for leaf vein details)
    high_contrast = ImageEnhance.Contrast(image).enhance(1.5)
    high_contrast = ImageEnhance.Sharpness(high_contrast).enhance(1.3)
    augmented_versions.append(('high_contrast', high_contrast))
    
    # 8. Adaptive enhancement (CLAHE-like)
    lab = image.convert('LAB')
    l, a, b = lab.split()
    l_enhanced = ImageEnhance.Contrast(l).enhance(1.4)
    enhanced_lab = Image.merge('LAB', (l_enhanced, a, b))
    adaptive = enhanced_lab.convert('RGB')
    augmented_versions.append(('adaptive', adaptive))
    
    return augmented_versions

def preprocess_for_model(image):
    """Convert PIL image to model-ready numpy array"""
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize((224, 224), Image.LANCZOS)
    img_array = np.array(image).astype(np.float32) / 255.0
    return np.expand_dims(img_array, axis=0)

def ensemble_predict_with_augmentation(model, image, class_names):
    """
    Run prediction on multiple augmented versions and ensemble the results
    """
    print(f"[AUGMENTATION] Generating {8} augmented versions...")
    
    # Generate augmented versions
    augmented = simulate_real_world_conditions(image)
    
    # Collect predictions from all versions
    all_predictions = []
    
    for aug_name, aug_img in augmented:
        processed = preprocess_for_model(aug_img)
        preds = model.predict(processed, verbose=0)[0]
        top_idx = np.argmax(preds)
        confidence = float(preds[top_idx])
        
        all_predictions.append({
            'augmentation': aug_name,
            'plant_name': class_names[top_idx],
            'confidence': confidence,
            'full_probs': preds
        })
        
        print(f"  [{aug_name:15s}] {class_names[top_idx]:20s} @ {confidence*100:5.2f}%")
    
    # Ensemble method 1: Average probabilities
    avg_probs = np.mean([p['full_probs'] for p in all_predictions], axis=0)
    avg_top_idx = np.argmax(avg_probs)
    avg_confidence = float(avg_probs[avg_top_idx])
    
    print(f"\n[ENSEMBLE: Average] {class_names[avg_top_idx]} @ {avg_confidence*100:.2f}%")
    
    # Ensemble method 2: Voting
    votes = {}
    for p in all_predictions:
        plant = p['plant_name']
        if plant not in votes:
            votes[plant] = {'count': 0, 'total_conf': 0}
        votes[plant]['count'] += 1
        votes[plant]['total_conf'] += p['confidence']
    
    # Find plant with most votes
    voted_winner = max(votes.items(), key=lambda x: (x[1]['count'], x[1]['total_conf']))
    voted_plant = voted_winner[0]
    voted_count = voted_winner[1]['count']
    
    print(f"[ENSEMBLE: Voting] {voted_plant} won with {voted_count}/8 votes")
    
    # Ensemble method 3: Weighted by confidence
    weighted_probs = np.zeros_like(all_predictions[0]['full_probs'])
    for p in all_predictions:
        weight = p['confidence']
        weighted_probs += p['full_probs'] * weight
    weighted_probs /= sum(p['confidence'] for p in all_predictions)
    weighted_top_idx = np.argmax(weighted_probs)
    weighted_confidence = float(weighted_probs[weighted_top_idx])
    
    print(f"[ENSEMBLE: Weighted] {class_names[weighted_top_idx]} @ {weighted_confidence*100:.2f}%")
    
    # Final decision: Use voting if clear winner, otherwise weighted average
    if voted_count >= 4:  # Majority vote
        final_plant = voted_plant
        final_confidence = min(weighted_confidence * 1.1, 0.95)  # Boost confidence slightly
        final_probs = weighted_probs
        method = 'majority_vote'
    else:
        final_plant = class_names[weighted_top_idx]
        final_confidence = weighted_confidence
        final_probs = weighted_probs
        method = 'weighted_average'
    
    print(f"\n[FINAL: {method}] {final_plant} @ {final_confidence*100:.2f}%")
    
    return {
        'plant_name': final_plant,
        'confidence': final_confidence,
        'all_probs': final_probs,
        'method': method,
        'votes': dict(votes),
        'all_predictions': all_predictions
    }

if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:
        test_image = sys.argv[1]
        print(f"Testing augmentation on: {test_image}")
        
        img = Image.open(test_image)
        augmented = simulate_real_world_conditions(img)
        
        print(f"\nGenerated {len(augmented)} augmented versions:")
        for name, _ in augmented:
            print(f"  - {name}")
