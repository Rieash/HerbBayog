# HerbBayog Accuracy Improvements

## Changes Implemented

### 1. Enhanced Preprocessing (backend/herbal_plants/views.py)
- **Auto-enhancement**: Detects image characteristics (brightness, contrast)
- **Smart adjustments**:
  - Dark images: Boost brightness +30%, contrast +30%
  - Low contrast: Increase contrast +40%, apply sharpening
  - Overexposed: Reduce brightness -10%, increase contrast +20%
- **Multiple strategies**: Tries 3 different preprocessing approaches
- **Voting system**: Uses consensus among strategies for better accuracy

### 2. Multi-Strategy Prediction
The system now runs 3 preprocessing strategies simultaneously:
1. **Auto-enhanced**: Detects and fixes image issues automatically
2. **Contrast enhanced**: +30% contrast, +20% sharpness
3. **Brightness normalized**: +10% brightness, +20% contrast

**Voting Logic:**
- If 2+ strategies agree → Confidence boosted by 15%
- If no consensus → Use best single strategy result

### 3. Feedback System (backend/herbal_plants/feedback.py)
Collects wrong predictions for future retraining:
- Saves user photos with correct labels
- Organizes by plant type in `feedback_data/` directory
- Tracks statistics by confidence level
- Export function for retraining dataset

**API Endpoint:** `POST /api/feedback/`

### 4. Frontend Feedback UI (frontend/src/components/FeedbackForm.js)
- Shows "Wrong prediction? Help us improve" button after scan
- Dropdown to select correct plant
- Notes field for additional details
- Saves data to backend for model improvement

### 5. Lowered Confidence Threshold
- Changed from 70% → 40% to show more predictions
- Shows warning banner for low confidence (<65%)
- Still displays top 3 alternatives

## How to Test

1. **Restart the backend:**
```bash
cd d:\HerbBayog\backend
python manage.py runserver
```

2. **Test with Lagundi image:**
- Go to http://localhost:3000/scan
- Upload the Lagundi photo
- Check the console for debug output showing:
  - Image analysis (brightness, contrast)
  - Strategy results (auto, contrast, bright)
  - Final prediction with voting info

3. **Submit feedback if wrong:**
- Click "Wrong prediction? Help us improve"
- Select correct plant from dropdown
- Submit to help future training

## Expected Results

With the old system:
- Lagundi photo: 21% confidence, predicted as "Unknown"

With new enhancements:
- Lagundi photo: Expected 50-70% confidence (depends on lighting)
- Multiple strategies vote on best match
- If confidence <65%, shows warning but still displays result

## Long-term Improvements

The feedback system collects data for future retraining:
- User-submitted photos with correct labels
- Organized by plant type in `feedback_data/`
- Can be exported to training dataset using:
```bash
cd d:\HerbBayog\backend
python -c "from herbal_plants.feedback import export_feedback_for_retraining; print(export_feedback_for_retraining())"
```

## Files Modified

### Backend:
- `herbal_plants/views.py` - Enhanced preprocessing + multi-strategy
- `herbal_plants/feedback.py` - New feedback system
- `herbal_plants/urls.py` - Added feedback endpoint
- `herbal_plants/enhanced_preprocessing.py` - New preprocessing module

### Frontend:
- `src/pages/Scan.js` - Added feedback button + submission
- `src/pages/Scan.css` - Feedback button styles
- `src/components/FeedbackForm.js` - New feedback form component
- `src/components/FeedbackForm.css` - Form styles
- `src/components/TopPredictions.js` - Updated for low confidence
- `src/components/TopPredictions.css` - Warning banner styles

## Next Steps for Maximum Accuracy

1. **Collect user feedback** - Every wrong prediction helps
2. **Retrain with feedback data** - After collecting 50+ images per plant
3. **Add more preprocessing strategies** - Background removal, color correction
4. **Consider ensemble models** - Combine multiple model predictions

---
Generated: April 10, 2026
