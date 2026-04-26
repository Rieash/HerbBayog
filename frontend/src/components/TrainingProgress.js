import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, Loader2, Sparkles, TrendingUp, Clock } from 'lucide-react';
import './TrainingProgress.css';

const TrainingProgress = ({ isOpen, onClose, plantName, onComplete }) => {
  const [status, setStatus] = useState({
    is_training: true,
    current_epoch: 0,
    total_epochs: 10,
    accuracy: 0,
    loss: 0,
    message: 'Initializing...'
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Poll training status every 5 seconds
    const pollStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/training/status/');
        const data = await response.json();
        
        if (data.is_training) {
          setStatus({
            is_training: true,
            current_epoch: data.current_epoch || status.current_epoch + 1,
            total_epochs: 10,
            accuracy: data.last_accuracy || 0,
            loss: data.last_loss || 0,
            message: data.training_message || 'Training in progress...'
          });
        } else if (data.last_retrain && !isComplete) {
          // Training just completed
          setIsComplete(true);
          setStatus({
            is_training: false,
            current_epoch: 10,
            total_epochs: 10,
            accuracy: data.last_accuracy || 0,
            loss: data.last_loss || 0,
            message: 'Training complete! Model improved.'
          });
          if (onComplete) onComplete(data);
        }
      } catch (err) {
        console.log('Polling error:', err);
      }
    };

    // Initial poll
    pollStatus();
    
    // Start polling
    const interval = setInterval(pollStatus, 3000);
    
    // Simulate progress if API doesn't provide epochs
    const progressInterval = setInterval(() => {
      setStatus(prev => {
        if (prev.is_training && prev.current_epoch < 10) {
          return {
            ...prev,
            current_epoch: prev.current_epoch + 1,
            accuracy: Math.min(95, prev.accuracy + Math.random() * 10),
            message: `Training epoch ${prev.current_epoch + 1}/10...`
          };
        }
        return prev;
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isOpen, isComplete]);

  if (!isOpen) return null;

  const progressPercent = (status.current_epoch / status.total_epochs) * 100;

  return (
    <div className="training-progress-overlay">
      <div className={`training-progress-modal ${isComplete ? 'complete' : ''}`}>
        <div className="training-header">
          {isComplete ? (
            <Sparkles className="header-icon sparkle" />
          ) : (
            <Brain className="header-icon pulse" />
          )}
          <h2>{isComplete ? '🎉 Training Complete!' : '🧠 AI Model Training'}</h2>
        </div>

        <div className="training-content">
          {!isComplete ? (
            <>
              <div className="plant-badge">
                <span className="plant-name">{plantName}</span>
                <span className="training-badge">RETRAINING</span>
              </div>

              <div className="progress-section">
                <div className="progress-ring">
                  <svg viewBox="0 0 100 100">
                    <circle
                      className="progress-ring-bg"
                      cx="50"
                      cy="50"
                      r="45"
                    />
                    <circle
                      className="progress-ring-fill"
                      cx="50"
                      cy="50"
                      r="45"
                      style={{
                        strokeDasharray: `${progressPercent * 2.83} 283`
                      }}
                    />
                  </svg>
                  <div className="progress-text">
                    <span className="epoch-current">{status.current_epoch}</span>
                    <span className="epoch-total">/10</span>
                    <span className="epoch-label">epochs</span>
                  </div>
                </div>
              </div>

              <div className="training-status">
                <Loader2 className="status-spinner" />
                <p className="status-message">{status.message}</p>
              </div>

              <div className="training-details">
                <div className="detail-item">
                  <Clock className="detail-icon" />
                  <span>~5 minutes</span>
                </div>
                <div className="detail-item">
                  <TrendingUp className="detail-icon" />
                  <span>Improving accuracy</span>
                </div>
              </div>

              <p className="training-info">
                Your photos are being used to fine-tune the AI model for better {plantName} recognition.
              </p>
            </>
          ) : (
            <>
              <div className="success-animation">
                <div className="success-circle">
                  <CheckCircle className="success-icon" />
                </div>
              </div>

              <div className="success-content">
                <h3>Model Successfully Updated!</h3>
                <p className="success-message">
                  Your {status.total_epochs} photos helped improve the AI's ability to recognize {plantName}.
                </p>

                <div className="improvement-stats">
                  <div className="improvement-item">
                    <span className="improvement-label">Model Version</span>
                    <span className="improvement-value">v2.1</span>
                  </div>
                  <div className="improvement-item">
                    <span className="improvement-label">Photos Used</span>
                    <span className="improvement-value">{status.total_epochs}</span>
                  </div>
                  <div className="improvement-item">
                    <span className="improvement-label">Training Epochs</span>
                    <span className="improvement-value">{status.current_epoch}</span>
                  </div>
                </div>

                <p className="success-tip">
                  💡 Try scanning a {plantName} leaf now to see the improved accuracy!
                </p>
              </div>

              <button className="continue-btn" onClick={onClose}>
                Continue to Scanner
              </button>
            </>
          )}
        </div>

        {!isComplete && (
          <div className="training-footer">
            <p>This happens automatically when 5+ high-quality photos are collected.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingProgress;
