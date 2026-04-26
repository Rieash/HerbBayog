import React, { useState, useRef } from 'react';
import './PhotoSubmission.css';
import TrainingProgress from './TrainingProgress';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const PLANT_OPTIONS = [
  'Akapulko', 'Ampalaya', 'Atis', 'Balimbing', 'Bayabas', 'Bignay',
  'Bunga', 'Dalandan', 'Guyabano', 'Ilang-Ilang', 'Kamantigi', 'Kamias',
  'Katakataka', 'Kataka-taka', 'Katmon', 'Katuray', 'Lagundi', 'Luya',
  'Malunggay', 'Mango', 'Mangga', 'Manzanilla', 'Moringa', 'Nangka',
  'Neem', 'Ngai Camphor', 'Paminta', 'Pandan', 'Papaya', 'Pili',
  'Sambong', 'Sili', 'Siniguelas', 'Suha', 'Takip-Kohol', 'Tanglad',
  'Taro', 'Tsaang Gubat', 'Ylang-Ylang', 'Yerba Buena'
];

function PhotoSubmission({ onClose, aiPrediction = null, aiConfidence = null }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [plantName, setPlantName] = useState('');
  const [isCorrection, setIsCorrection] = useState(!!aiPrediction);
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);
  const [showTraining, setShowTraining] = useState(false);
  const [trainingTriggered, setTrainingTriggered] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a photo');
      return;
    }
    if (!plantName) {
      setError('Please enter the plant name');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('plant_name', plantName);
      formData.append('is_correction', isCorrection);
      
      if (aiPrediction) {
        formData.append('ai_prediction', aiPrediction);
      }
      if (aiConfidence) {
        formData.append('ai_confidence', aiConfidence);
      }
      if (location) {
        formData.append('location_name', location);
      }

      // Try to get geolocation
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          formData.append('latitude', position.coords.latitude);
          formData.append('longitude', position.coords.longitude);
        } catch (geoError) {
          console.log('Geolocation not available');
        }
      }

      const response = await fetch(`${API_URL}/submit-photo/`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setSubmissionId(data.submission_id);
        
        // Check if auto-retrain was triggered
        if (data.auto_retrain && data.auto_retrain.includes('🚀 Auto-retrain started')) {
          setTrainingTriggered(true);
          setShowTraining(true);
        }
      } else {
        setError(data.error || 'Failed to submit photo');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="submission-modal">
        <div className="submission-content success">
          <div className="success-icon">✓</div>
          <h2>Thank You!</h2>
          <p>Your photo has been submitted successfully.</p>
          <p className="submission-id">Submission ID: {submissionId}</p>
          <p className="review-note">
            It will be reviewed by our team before being added to the dataset.
          </p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="submission-modal">
      <div className="submission-content">
        <div className="submission-header">
          <h2>Contribute a Plant Photo</h2>
          <button className="close-x" onClick={onClose}>×</button>
        </div>

        {aiPrediction && (
          <div className="correction-banner">
            <p>
              <strong>Correcting AI Prediction</strong><br />
              AI predicted: <em>{aiPrediction}</em> ({aiConfidence?.toFixed(1)}%)
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Photo Upload */}
          <div className="photo-upload-section">
            <label className="upload-label">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="photo-preview" />
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">📷</span>
                  <span>Click to select a photo</span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
              />
            </label>
            {selectedFile && (
              <button
                type="button"
                className="change-photo-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Photo
              </button>
            )}
          </div>

          {/* Plant Name */}
          <div className="form-group">
            <label>Plant Name:</label>
            <select
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              required
            >
              <option value="">Select a plant...</option>
              {PLANT_OPTIONS.map(plant => (
                <option key={plant} value={plant}>{plant}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or type a new plant name..."
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              className="plant-name-input"
            />
          </div>

          {/* Is Correction */}
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={isCorrection}
                onChange={(e) => setIsCorrection(e.target.checked)}
              />
              I'm correcting a wrong AI prediction
            </label>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location (optional):</label>
            <input
              type="text"
              placeholder="e.g., Calbayog City, Samar"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={submitting || !selectedFile || !plantName}
            >
              {submitting ? 'Submitting...' : 'Submit Photo'}
            </button>
          </div>
        </form>

        <p className="privacy-note">
          By submitting, you agree that your photo may be used to improve our AI model.
        </p>
      </div>

      {/* Training Progress Modal */}
      <TrainingProgress
        isOpen={showTraining}
        onClose={() => {
          setShowTraining(false);
          onClose();
        }}
        plantName={plantName}
      />
    </div>
  );
}

export default PhotoSubmission;
