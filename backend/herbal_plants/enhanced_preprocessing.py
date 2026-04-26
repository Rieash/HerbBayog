"""
Enhanced preprocessing for real-world photos
Handles domain mismatch between training (PlantVillage) and user photos
"""
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import cv2

def enhance_real_world_image(image_path):
    """
    Apply multiple enhancement strategies for real-world photos
    Returns the best preprocessed version
    """
    # Load image
    img = Image.open(image_path)
    
    strategies = []
    
    # Strategy 1: Original with basic preprocessing
    strategies.append(('original', basic_preprocess(img)))
    
    # Strategy 2: Contrast enhanced
    enhanced = ImageEnhance.Contrast(img).enhance(1.3)
    enhanced = ImageEnhance.Sharpness(enhanced).enhance(1.2)
    strategies.append(('contrast', basic_preprocess(enhanced)))
    
    # Strategy 3: Brightness normalized (for outdoor lighting)
    brightness = ImageEnhance.Brightness(img).enhance(1.1)
    brightness = ImageEnhance.Contrast(brightness).enhance(1.2)
    strategies.append(('bright', basic_preprocess(brightness)))
    
    # Strategy 4: Color balance (for green leaves)
    color = ImageEnhance.Color(img).enhance(1.2)
    strategies.append(('color', basic_preprocess(color)))
    
    # Strategy 5: Sharpen details (for leaf veins)
    sharpened = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
    strategies.append(('sharp', basic_preprocess(sharpened)))
    
    return strategies

def basic_preprocess(img):
    """Basic preprocessing - resize and normalize"""
    # Convert to RGB
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Resize with high quality
    img = img.resize((224, 224), Image.LANCZOS)
    
    # Convert to numpy and normalize
    img_array = np.array(img).astype(np.float32) / 255.0
    
    # Add batch dimension
    return np.expand_dims(img_array, axis=0)

def auto_enhance(image_path):
    """
    Auto-detect and apply best enhancement based on image characteristics
    """
    img = Image.open(image_path)
    img_array = np.array(img)
    
    # Analyze image characteristics
    brightness = np.mean(img_array)
    contrast = np.std(img_array)
    
    # Choose enhancement based on analysis
    if brightness < 100:  # Dark image
        print(f"[PREPROCESS] Dark image detected (brightness={brightness:.1f}), enhancing...")
        enhanced = ImageEnhance.Brightness(img).enhance(1.3)
        enhanced = ImageEnhance.Contrast(enhanced).enhance(1.3)
    elif contrast < 40:  # Low contrast
        print(f"[PREPROCESS] Low contrast detected (contrast={contrast:.1f}), sharpening...")
        enhanced = ImageEnhance.Contrast(img).enhance(1.4)
        enhanced = enhanced.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
    elif brightness > 200:  # Overexposed
        print(f"[PREPROCESS] Bright image detected (brightness={brightness:.1f}), normalizing...")
        enhanced = ImageEnhance.Brightness(img).enhance(0.9)
        enhanced = ImageEnhance.Contrast(enhanced).enhance(1.2)
    else:  # Normal
        enhanced = img
    
    return basic_preprocess(enhanced)

def remove_background_simple(image_path):
    """
    Simple background removal using color thresholding for green leaves
    """
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Convert to HSV for better color segmentation
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Define green color range (typical for leaves)
    lower_green = np.array([35, 40, 40])
    upper_green = np.array([85, 255, 255])
    
    # Create mask
    mask = cv2.inRange(hsv, lower_green, upper_green)
    
    # Apply morphological operations to clean up mask
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    
    # Apply mask to image
    result = cv2.bitwise_and(img_rgb, img_rgb, mask=mask)
    
    # Convert back to PIL
    result_pil = Image.fromarray(result)
    
    return basic_preprocess(result_pil)

def multi_strategy_predict(model, image_path, class_names):
    """
    Try multiple preprocessing strategies and return the best prediction
    """
    strategies = [
        ('auto', auto_enhance(image_path)),
        ('contrast', enhance_real_world_image(image_path)[1][1]),
        ('bright', enhance_real_world_image(image_path)[2][1]),
    ]
    
    all_predictions = []
    
    for name, processed_img in strategies:
        preds = model.predict(processed_img, verbose=0)[0]
        top_idx = np.argmax(preds)
        confidence = float(preds[top_idx])
        
        all_predictions.append({
            'strategy': name,
            'plant_name': class_names[top_idx],
            'confidence': confidence,
            'all_probs': preds
        })
        
        print(f"[STRATEGY: {name}] {class_names[top_idx]}: {confidence*100:.2f}%")
    
    # Return the best prediction
    best = max(all_predictions, key=lambda x: x['confidence'])
    
    # Also calculate average confidence for top predictions
    plant_votes = {}
    for pred in all_predictions:
        plant = pred['plant_name']
        if plant not in plant_votes:
            plant_votes[plant] = {'count': 0, 'total_conf': 0}
        plant_votes[plant]['count'] += 1
        plant_votes[plant]['total_conf'] += pred['confidence']
    
    # Find plant with most votes
    most_voted = max(plant_votes.items(), key=lambda x: (x[1]['count'], x[1]['total_conf']))
    
    print(f"[BEST STRATEGY] {best['plant_name']} at {best['confidence']*100:.2f}%")
    print(f"[VOTING] {most_voted[0]} won with {most_voted[1]['count']} votes")
    
    # If voting and best strategy agree, boost confidence
    if most_voted[0] == best['plant_name']:
        best['confidence'] = min(best['confidence'] * 1.15, 0.99)  # Boost by 15%, cap at 99%
        best['method'] = 'consensus'
    else:
        best['method'] = 'best_single'
    
    return best, all_predictions

if __name__ == '__main__':
    # Test the preprocessing
    import sys
    if len(sys.argv) > 1:
        test_image = sys.argv[1]
        print(f"Testing enhanced preprocessing on: {test_image}")
        
        # Test auto enhance
        result = auto_enhance(test_image)
        print(f"Auto-enhance output shape: {result.shape}")
        print(f"Value range: [{result.min():.3f}, {result.max():.3f}]")
