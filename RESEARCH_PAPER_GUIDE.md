# HerbBayog Research Paper Documentation Guide

## For Academic/Thesis Documentation Purposes

---

## 1. ABSTRACT TEMPLATE

```
HerbBayog: A Mobile-Based Philippine Medicinal Plant Identification System 
Using Convolutional Neural Networks

Abstract:
Philippine traditional medicine relies heavily on medicinal plants, with the 
Department of Health (DOH) endorsing ten primary herbal medicines. However, 
proper plant identification remains a challenge for many Filipinos, especially 
those in rural areas with limited access to herbal experts. This study presents 
HerbBayog, a mobile-based plant identification system that uses deep learning 
to recognize Philippine medicinal plants from smartphone images.

The system employs a transfer learning approach using MobileNetV2 as the base 
architecture, fine-tuned on a dataset of Philippine medicinal plants. The 
model achieves [X]% accuracy in identifying 10 DOH-approved medicinal plants: 
Lagundi, Sambong, Bayabas, Ampalaya, Malunggay, Yerba Buena, Bawang, Akapulko, 
Niyog-niyogan, and Tsaang Gubat.

Key features include:
- Real-time plant identification via mobile camera
- Multilingual support (English and Waray)
- Comprehensive medicinal information database
- User feedback system for continuous model improvement

The application bridges the gap between traditional herbal knowledge and 
modern technology, making medicinal plant identification accessible to 
Filipino communities.

Keywords: Medicinal Plant Identification, Deep Learning, MobileNetV2, 
Transfer Learning, Philippine Traditional Medicine, Mobile Application
```

---

## 2. SYSTEM ARCHITECTURE

### 2.1 Overall Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Mobile App   │  │ Web Browser  │  │ Camera Input │          │
│  │ (React)      │  │ (React)      │  │ (Upload)     │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼─────────────────┼─────────────────┼──────────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────────┐
│                      PRESENTATION LAYER                        │
│         RESTful API (Django REST Framework)                     │
│  ┌──────────────────────────────────────────────────────┐     │
│  │  Endpoints:                                           │     │
│  │  - /api/identify/  (POST - Image classification)      │     │
│  │  - /api/plants/    (GET - Plant database)           │     │
│  │  - /api/feedback/  (POST - User feedback)           │     │
│  └──────────────────────────────────────────────────────┘     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────────┐
│                      PROCESSING LAYER                          │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │ Image            │  │ Plant            │                   │
│  │ Preprocessing    │  │ Classification   │                   │
│  │ Module           │  │ Module           │                   │
│  └────────┬─────────┘  └────────┬─────────┘                   │
│           │                     │                              │
│           └──────────┬──────────┘                            │
│                      │                                         │
│  ┌───────────────────▼──────────────────┐                     │
│  │      Enhanced Classification          │                     │
│  │  - Multi-strategy preprocessing       │                     │
│  │  - Voting system                      │                     │
│  │  - Confidence calibration           │                     │
│  └───────────────────┬──────────────────┘                     │
└────────────────────┼───────────────────────────────────────────┘
                     │
┌────────────────────▼───────────────────────────────────────────┐
│                      AI/ML LAYER                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │           Deep Learning Model (MobileNetV2)              │  │
│  │                                                          │  │
│  │  Input: 224x224x3 (RGB Image)                           │  │
│  │  ├── Global Average Pooling                             │  │
│  │  ├── Dense(512) + ReLU + Dropout(0.3)                   │  │
│  │  ├── Dense(256) + ReLU + Dropout(0.2)                   │  │
│  │  └── Dense(10) + Softmax                                │  │
│  │                                                          │  │
│  │  Output: Plant class + Confidence score                 │  │
│  └─────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
                     │
┌────────────────────▼───────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │ Plant Database   │  │ Feedback Data    │                     │
│  │ (JSON/PostgreSQL)│  │ (Training Set)   │                     │
│  └──────────────────┘  └──────────────────┘                     │
└────────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React.js + CSS3 | User interface |
| Mobile | Responsive PWA | Mobile accessibility |
| Backend | Django + DRF | API server |
| AI/ML | TensorFlow/Keras | Deep learning model |
| Preprocessing | OpenCV, Pillow | Image enhancement |
| Database | JSON + PostgreSQL | Plant data storage |
| Deployment | Render.com | Cloud hosting |

---

## 3. MODEL ARCHITECTURE DETAILS

### 3.1 Base Model: MobileNetV2

**Why MobileNetV2?**
- **Lightweight**: 3.4M parameters vs 138M in ResNet50
- **Fast inference**: Suitable for mobile/real-time applications
- **Pre-trained on ImageNet**: Excellent transfer learning base
- **Inverted residuals**: Efficient feature extraction

### 3.2 Model Configuration

```python
# Model Architecture for Research Paper
BASE_MODEL = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

# Freeze base layers for transfer learning
BASE_MODEL.trainable = False

# Custom Classification Head
MODEL = Sequential([
    BASE_MODEL,
    GlobalAveragePooling2D(),
    Dense(512, activation='relu'),
    Dropout(0.3),
    Dense(256, activation='relu'),
    Dropout(0.2),
    Dense(NUM_CLASSES, activation='softmax')  # NUM_CLASSES = 10
])

# Compilation
MODEL.compile(
    optimizer=Adam(learning_rate=0.0001),
    loss='categorical_crossentropy',
    metrics=['accuracy', 'top_k_categorical_accuracy']
)
```

### 3.3 Training Parameters

| Parameter | Value | Justification |
|-----------|-------|---------------|
| Input Size | 224×224×3 | MobileNetV2 standard input |
| Batch Size | 32 | Memory/speed balance |
| Epochs | 20-30 | Early stopping applied |
| Learning Rate | 0.0001 | Fine-tuning rate |
| Optimizer | Adam | Adaptive learning |
| Loss Function | Categorical Crossentropy | Multi-class classification |
| Dropout | 0.3, 0.2 | Prevent overfitting |

### 3.4 Data Augmentation Strategy

```python
augmentation = ImageDataGenerator(
    rotation_range=40,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest',
    brightness_range=[0.8, 1.2],
    validation_split=0.2
)
```

---

## 4. DATASET DOCUMENTATION

### 4.1 Plant Classes (10 DOH-Approved Medicinal Plants)

| # | Common Name | Scientific Name | Local Names | Medicinal Category |
|---|-------------|-----------------|-------------|-------------------|
| 1 | Lagundi | Vitex negundo | Dangla, Five-leafed chaste tree | Respiratory |
| 2 | Sambong | Blumea balsamifera | Blumea camphora, Dalunay | Urinary/Kidney |
| 3 | Bayabas | Psidium guajava | Guava, Bayabas | Digestive |
| 4 | Ampalaya | Momordica charantia | Bitter melon, Bitter gourd | Diabetes |
| 5 | Malunggay | Moringa oleifera | Moringa, Drumstick tree | Nutritional |
| 6 | Yerba Buena | Clinopodium douglasii | Peppermint, Marsh mint | Pain relief |
| 7 | Bawang | Allium sativum | Garlic | Cardiovascular |
| 8 | Akapulko | Senna alata | Ringworm bush, Candle bush | Skin/Fungal |
| 9 | Niyog-niyogan | Quisqualis indica | Rangoon creeper | Antiparasitic |
| 10 | Tsaang Gubat | Ehretia microphylla | Wild tea, Forest tea | Digestive |

### 4.2 Dataset Statistics

```
Dataset: HerbBayog-v1
Total Images: [X] (target: 500+ per class)
Training Split: 80% (3,840 images)
Validation Split: 10% (480 images)
Test Split: 10% (480 images)

Image Sources:
- Original photographs: [X]%
- PlantVillage dataset: [X]%
- User-contributed (feedback): [X]%
- Web scraping (research use): [X]%

Image Characteristics:
- Resolution: Various (preprocessed to 224×224)
- Formats: JPG, PNG
- Capturing Devices: Mobile phones, digital cameras
- Environments: Indoor, outdoor, controlled, natural
```

### 4.3 Data Collection Methodology

```
Data Collection Protocol:

1. Field Collection:
   - Multiple locations across Philippines
   - Different growth stages (seedling, mature, flowering)
   - Various angles (top, side, close-up, full plant)
   - Diverse lighting conditions

2. Quality Control:
   - Minimum resolution: 640×480
   - Clear focus on plant features
   - No heavy occlusion
   - Label verification by botanist/herbalist

3. Data Augmentation:
   - Rotation, flipping, zooming
   - Brightness/contrast adjustments
   - Synthetic variations per image: 8-10
```

---

## 5. PERFORMANCE METRICS

### 5.1 Evaluation Results

```
Model: HerbBayog-v1 (MobileNetV2)
Test Date: [Date]
Test Set Size: 480 images (48 per class)

Overall Metrics:
├── Accuracy: [XX.X]%
├── Precision: [XX.X]%
├── Recall: [XX.X]%
├── F1-Score: [XX.X]%
└── Top-3 Accuracy: [XX.X]%

Per-Class Performance:
┌──────────────┬───────────┬───────────┬───────────┐
│ Plant        │ Precision │ Recall    │ F1-Score  │
├──────────────┼───────────┼───────────┼───────────┤
│ Lagundi      │   XX.X%   │   XX.X%   │   XX.X%   │
│ Sambong      │   XX.X%   │   XX.X%   │   XX.X%   │
│ Bayabas      │   XX.X%   │   XX.X%   │   XX.X%   │
│ Ampalaya     │   XX.X%   │   XX.X%   │   XX.X%   │
│ Malunggay    │   XX.X%   │   XX.X%   │   XX.X%   │
│ Yerba Buena  │   XX.X%   │   XX.X%   │   XX.X%   │
│ Bawang       │   XX.X%   │   XX.X%   │   XX.X%   │
│ Akapulko     │   XX.X%   │   XX.X%   │   XX.X%   │
│ Niyog-niyogan│   XX.X%   │   XX.X%   │   XX.X%   │
│ Tsaang Gubat │   XX.X%   │   XX.X%   │   XX.X%   │
└──────────────┴───────────┴───────────┴───────────┘
```

### 5.2 Confusion Matrix

Include a confusion matrix visualization showing:
- Correct classifications (diagonal)
- Common misclassifications (off-diagonal)
- Classes that are often confused with each other

### 5.3 Comparison with Other Models

| Model | Parameters | Accuracy | Inference Time | Model Size |
|-------|-----------|----------|----------------|------------|
| MobileNetV2 | 3.4M | [XX]% | [XX]ms | 14MB |
| ResNet50 | 25.6M | [XX]% | [XX]ms | 98MB |
| EfficientNetB0 | 5.3M | [XX]% | [XX]ms | 20MB |
| VGG16 | 138M | [XX]% | [XX]ms | 528MB |

---

## 6. ENHANCED PREPROCESSING METHODOLOGY

### 6.1 Multi-Strategy Preprocessing

```
Preprocessing Pipeline:

Input Image
    │
    ├───> Strategy 1: Auto-Enhanced
    │     ├── Analyze brightness/contrast
    │     ├── Apply smart adjustments
    │     └── Generate prediction
    │
    ├───> Strategy 2: Contrast Enhanced
    │     ├── +30% contrast
    │     ├── +20% sharpness
    │     └── Generate prediction
    │
    └───> Strategy 3: Brightness Normalized
          ├── +10% brightness
          ├── +20% contrast
          └── Generate prediction

Voting System:
    ├── 2+ strategies agree → Confidence +15%
    └── No consensus → Best single result
```

### 6.2 Image Analysis Metrics

```python
# Quality Metrics Calculated
metrics = {
    'brightness': calculate_mean_brightness(image),  # 0-255
    'contrast': calculate_contrast(image),           # Standard deviation
    'sharpness': calculate_laplacian_variance(image),
    'exposure': classify_exposure(brightness)        # under/normal/over
}

# Adjustment Rules
if brightness < 80:
    adjustments = {'brightness': +30%, 'contrast': +30%}
elif contrast < 40:
    adjustments = {'contrast': +40%, 'sharpness': +20%}
elif brightness > 200:
    adjustments = {'brightness': -10%, 'contrast': +20%}
```

---

## 7. USER FEEDBACK SYSTEM

### 7.1 Feedback Collection

```
Feedback Loop Architecture:

User submits wrong prediction
         │
         ▼
┌─────────────────────┐
│ Store in feedback/  │
│ - Image (resized)   │
│ - Predicted label   │
│ - User correction   │
│ - Confidence score  │
│ - Timestamp         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Weekly Analysis       │
│ - Identify patterns │
│ - Calculate accuracy│
│ - Flag for review   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Retraining Trigger  │
│ (when 50+ samples   │
│  collected)         │
└─────────────────────┘
```

### 7.2 Continuous Learning Metrics

| Week | Feedback Submitted | Accuracy Improvement | Retraining Triggered |
|------|-------------------|---------------------|---------------------|
| 1 | [X] | [X]% | No |
| 2 | [X] | [X]% | No |
| 3 | [X] | [X]% | Yes |
| ... | ... | ... | ... |

---

## 8. MULTILINGUAL SUPPORT

### 8.1 Waray Translation Implementation

```
Translation Architecture:

Backend (plant_data.json):
{
  "name": "Lagundi",
  "translations": {
    "waray": {
      "description": "An shrub nga may lima ka leaflet...",
      "medicinal_uses": [
        "Pag-ayo han ubo",
        "Pag-ayo han hirinolohiya",
        ...
      ]
    }
  }
}

Frontend Language Context:
- Language code: 'war' (Waray)
- Translation key: 'waray'
- Fallback: English if Waray unavailable
```

### 8.2 Localization Statistics

| Language | UI Elements | Plant Descriptions | Medicinal Uses | Preparation Steps |
|----------|-------------|-------------------|----------------|-------------------|
| English | 100% | 100% | 100% | 100% |
| Waray | 100% | 100% | 100% | 100% |

---

## 9. RESEARCH METHODOLOGY

### 9.1 Research Design

```
Research Type: Applied Research - System Development
Approach: Design Science Research Methodology

Phases:
1. Problem Identification (4 weeks)
   - Literature review
   - Expert interviews
   - Requirement gathering

2. System Design (6 weeks)
   - Architecture design
   - Model selection
   - UI/UX prototyping

3. Development (10 weeks)
   - Backend implementation
   - Model training
   - Frontend development

4. Testing & Evaluation (4 weeks)
   - Unit testing
   - System testing
   - User acceptance testing
   - Performance evaluation

5. Deployment (2 weeks)
   - Production deployment
   - Monitoring setup
```

### 9.2 Evaluation Framework

```
System Evaluation Metrics:

Technical Performance:
- Classification Accuracy
- Inference Speed (ms)
- Model Size (MB)
- API Response Time

User Experience:
- System Usability Scale (SUS)
- Task Completion Rate
- Error Recovery Rate
- User Satisfaction Score

Impact Assessment:
- Plant identification success rate
- Knowledge retention improvement
- User engagement metrics
- Expert validation results
```

---

## 10. ETHICAL CONSIDERATIONS

### 10.1 Data Privacy

- User images are processed in real-time, not stored permanently
- Feedback data is anonymized before storage
- No personal information is collected
- Plant identification data is used only for model improvement

### 10.2 Medical Disclaimer

```
Important Notice for Research Paper:

The HerbBayog system is designed for EDUCATIONAL and 
RESEARCH purposes only. It should NOT be used as a 
substitute for professional medical advice, diagnosis, 
or treatment.

Key Points:
1. Always consult healthcare professionals before using 
   medicinal plants
2. Plant identification accuracy is not 100%
3. Some plants may have contraindications
4. Proper dosage and preparation are critical
5. Individual reactions may vary
```

---

## 11. FUTURE WORK

### 11.1 Planned Improvements

1. **Model Expansion**
   - Add 40+ additional Philippine medicinal plants
   - Include ornamental and agricultural plants
   - Support for plant disease detection

2. **Feature Enhancements**
   - Voice search in local languages
   - AR (Augmented Reality) plant overlay
   - Offline mode with reduced accuracy
   - Community contributions

3. **Research Directions**
   - Ensemble model approaches
   - Active learning from user feedback
   - Federated learning for privacy
   - Integration with IoT sensors

### 11.2 Publication Opportunities

| Venue | Type | Deadline | Relevance |
|-------|------|----------|-----------|
| IEEE Xplore | Conference | [Date] | High |
| ACM Digital | Journal | [Date] | High |
| Local Journal | Journal | [Date] | Medium |
| CHI/UX | Conference | [Date] | Medium |

---

## 12. APPENDICES

### Appendix A: Glossary

| Term | Definition |
|------|-----------|
| CNN | Convolutional Neural Network |
| Transfer Learning | Using pre-trained model weights |
| MobileNetV2 | Lightweight CNN architecture |
| DOH | Department of Health (Philippines) |
| PWA | Progressive Web Application |
| API | Application Programming Interface |
| REST | Representational State Transfer |
| ReLU | Rectified Linear Unit activation |
| Softmax | Multi-class probability function |
| Dropout | Regularization technique |

### Appendix B: Complete File Structure

```
HerbBayog/
├── backend/
│   ├── herbal_plants/
│   │   ├── models/           # Trained models
│   │   ├── plant_data.json   # Plant database
│   │   ├── views.py          # API endpoints
│   │   ├── preprocessing.py  # Image processing
│   │   └── feedback.py       # Feedback system
│   └── training/
│       ├── model_trainer.py  # Training script
│       └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   └── contexts/         # Language context
│   └── public/
└── docs/
    ├── RESEARCH_PAPER_GUIDE.md
    ├── ACCURACY_IMPROVEMENTS.md
    └── DEPLOYMENT_GUIDE.md
```

### Appendix C: API Documentation

```
POST /api/identify/
Request:
  - image: File (JPG/PNG, max 10MB)
  
Response:
{
  "prediction": {
    "plant_name": "Lagundi",
    "scientific_name": "Vitex negundo",
    "confidence": 87.5,
    "top_predictions": [...]
  },
  "plant_details": {
    "name": "Lagundi",
    "description": "...",
    "medicinal_uses": [...],
    "preparation_steps": [...],
    "translations": {
      "waray": {...}
    }
  }
}
```

---

## 13. REFERENCES (Sample)

1. Sandler, M., et al. (2018). MobileNetV2: Inverted Residuals and Linear Bottlenecks. CVPR.
2. Department of Health Philippines. (2020). Philippine Herbal Medicine Guide.
3. He, K., et al. (2016). Deep Residual Learning for Image Recognition. CVPR.
4. Tan, M., & Le, Q. (2019). EfficientNet: Rethinking Model Scaling. ICML.
5. Philippine Institute of Traditional and Alternative Health Care. (2019).

---

**Document Version**: 1.0
**Last Updated**: April 26, 2026
**Prepared For**: Academic Research / Thesis Documentation

---

## Quick Checklist for Paper Submission

- [ ] Abstract (250-300 words)
- [ ] Introduction with problem statement
- [ ] Related literature review
- [ ] Methodology section (use this guide)
- [ ] System architecture diagram
- [ ] Model architecture details
- [ ] Dataset description
- [ ] Results and evaluation
- [ ] Discussion of findings
- [ ] Conclusion and future work
- [ ] References (IEEE/APA format)
- [ ] Ethical clearance (if human subjects)
- [ ] Plagiarism check report

**Tip**: Replace all [X] placeholders with actual values after testing!
