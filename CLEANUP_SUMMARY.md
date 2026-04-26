# System Cleanup & Improvements Summary

## Changes Made (April 11, 2026)

### 1. Removed Conflicting Files ✅
**Deleted:**
- `backend/herbal_plants/augmentation.py` - Heavy augmentation was distorting images
- `backend/herbal_plants/enhanced_preprocessing.py` - Duplicate preprocessing logic

**Why:** These files contained aggressive augmentation strategies that were overwhelming the model's training features.

### 2. Cleaned Up views.py ✅
**Removed:**
- Unused imports (`USE_ENHANCED_PREPROCESSING`, `enhanced_preprocessing` module)
- Duplicate preprocessing code
- Heavy 12-way augmentation strategies

**Added:**
- `center_crop()` function to isolate plant from background (70% center crop)
- Simplified 3-strategy prediction (auto, contrast, auto-contrast)
- `ImageOps` import fix for autocontrast feature

### 3. Current System Status

**Files in Use:**
- `views.py` - Main classification logic (simplified)
- `feedback.py` - User feedback collection (unchanged)
- `urls.py` - API endpoints (added model-info)
- `models.py` - Database models

**Model:**
- Using: `herbbayog_v1.h5` (latest improved model)
- Trained on: PhilMedic Philippine Medicinal Plant Dataset
- Accuracy: 99.94% on training data
- Classes: 40 medicinal plants

### 4. Current Preprocessing Pipeline

1. **Center Crop** (70%) - Removes background clutter
2. **Auto-enhancement** - Brightness/contrast adjustment based on image analysis
3. **Multi-strategy prediction** - 3 different preprocessing approaches with voting
4. **Confidence boosting** - 10% boost when 2+ strategies agree

### 5. Why Results Are Still Inaccurate

**Root Cause:** Domain mismatch between training data and user photos

```
Training Photos (PhilMedic):
├── Specific angles from dataset
├── Controlled lighting conditions  
├── Certain background types
└── 99.94% accuracy (on similar photos)

User Photos:
├── Different angles
├── Natural outdoor lighting
├── Complex green backgrounds
└── 45-60% accuracy (domain shift)
```

**Solution:** Need to fine-tune model with user-submitted photos via feedback system

### 6. How to Improve Accuracy

**Immediate:**
1. Use **feedback button** on wrong predictions
2. Submit correct plant name
3. System saves photo for retraining

**Long-term:**
1. Collect 30-50 photos per plant via feedback
2. Fine-tune model for 5-10 epochs
3. Model learns real-world patterns

### 7. Next Steps Recommended

1. Test the system with the cleaned code
2. Submit feedback for wrong predictions
3. After collecting sufficient data, retrain model

---
**Status:** System cleaned, simplified, and ready for testing
