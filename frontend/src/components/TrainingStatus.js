import React, { useState, useEffect } from 'react';
import { Loader2, Brain, TrendingUp, Database, CheckCircle } from 'lucide-react';
import './TrainingStatus.css';

const TrainingStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/training/status/');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError('Could not load training status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="training-status loading">
        <Loader2 className="spinner" />
        <span>Loading status...</span>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="training-status error">
        <span>⚠️ Status unavailable</span>
      </div>
    );
  }

  const isTraining = status.is_training;
  const plantsReady = status.plants_ready_for_retrain || [];
  const contributions = status.contribution_stats || {};
  const totalApproved = contributions.by_status?.approved || 0;
  const totalPending = contributions.by_status?.pending || 0;

  return (
    <div className={`training-status-card ${isTraining ? 'training' : ''}`}>
      <div className="status-header">
        <Brain className="status-icon" />
        <h3>AI Training Status</h3>
        {isTraining && <span className="live-badge">LIVE</span>}
      </div>

      {isTraining ? (
        <div className="training-active">
          <div className="pulse-animation">
            <Loader2 className="spinner-large" />
          </div>
          <p className="training-text">🧠 Retraining in progress...</p>
          <p className="training-subtext">
            Started: {new Date(status.training_started).toLocaleTimeString()}
          </p>
          <div className="progress-bar-container">
            <div className="progress-bar-striped"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-item">
              <Database className="stat-icon" />
              <span className="stat-value">{totalApproved}</span>
              <span className="stat-label">Approved Photos</span>
            </div>
            <div className="stat-item">
              <TrendingUp className="stat-icon" />
              <span className="stat-value">{status.total_retrains || 0}</span>
              <span className="stat-label">Retrains Done</span>
            </div>
          </div>

          <div className="plants-section">
            <h4>📸 Photos by Plant</h4>
            {Object.entries(contributions.by_plant || {}).map(([plant, count]) => {
              const approvedCount = status.contributions_ready 
                ? Object.entries(status.plants_ready_for_retrain || {}).find(([p]) => p === plant)?.[1]?.length || 0
                : 0;
              const isReady = approvedCount >= 5;
              
              return (
                <div key={plant} className={`plant-progress ${isReady ? 'ready' : ''}`}>
                  <span className="plant-name">{plant}</span>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${Math.min(100, (approvedCount / 5) * 100)}%` }}
                    />
                  </div>
                  <span className="plant-count">
                    {isReady ? (
                      <><CheckCircle className="check-icon" /> Ready!</>
                    ) : (
                      `${approvedCount}/5 for retrain`
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {plantsReady.length > 0 && (
            <div className="ready-notice">
              <p>🚀 <strong>{plantsReady.length}</strong> plant(s) ready for auto-retrain!</p>
              <p className="hint">Upload 1 more high-quality photo to trigger training.</p>
            </div>
          )}

          {status.last_retrain && (
            <div className="last-retrain">
              <p>Last retrain: {new Date(status.last_retrain).toLocaleDateString()}</p>
              <p>Model version: {status.model_version || 'v1.0'}</p>
            </div>
          )}
        </>
      )}

      <button className="refresh-btn" onClick={fetchStatus}>
        🔄 Refresh Status
      </button>
    </div>
  );
};

export default TrainingStatus;
