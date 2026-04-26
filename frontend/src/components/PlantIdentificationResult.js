import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowLeft, Leaf, Heart, FlaskConical, Info, X, Sparkles, Shield } from 'lucide-react';
import './PlantIdentificationResult.css';
import { getLocalName } from '../utils/plantNameMapping';
import { dohPlantDatabase } from '../data/dohPlantDatabase';

const PlantIdentificationResult = ({ result, uploadedImage, isOpen, onClose, onFeedback }) => {
  const [view, setView] = useState('result'); // 'result' | 'details'
  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  
  useEffect(() => {
    if (isOpen && result) {
      const targetConfidence = Math.round(result.confidence || result.prediction?.confidence || 0);
      let current = 0;
      const timer = setInterval(() => {
        if (current < targetConfidence) {
          current += 1;
          setAnimatedConfidence(current);
        } else {
          clearInterval(timer);
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isOpen, result]);

  if (!isOpen || !result) return null;

  const apiPlantName = result.prediction?.plant_name || result.plant_name || 'Unknown';
  const plantName = getLocalName(apiPlantName);  // Convert API name to Philippine name
  const scientificName = result.prediction?.scientific_name || result.scientific_name || '';
  const confidence = Math.round(result.prediction?.confidence || result.confidence || 0);
  const plantDetails = result.plant_details || {};
  const isInDatabase = result.is_in_database || (plantDetails && plantDetails.name !== 'Unknown Plant');
  const hasDetails = plantDetails && plantDetails.name && plantDetails.name !== 'Unknown Plant';
  
  const getConfidenceColor = (conf) => {
    if (conf >= 80) return '#10b981';
    if (conf >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getConfidenceText = (conf) => {
    if (conf >= 80) return 'High Confidence';
    if (conf >= 60) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const getConfidenceLevel = (conf) => {
    if (conf >= 90) return 'Very High Confidence';
    if (conf >= 75) return 'High Confidence';
    if (conf >= 60) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const plantInfo = dohPlantDatabase[plantName] || null;
  
  // Debug logging to help diagnose issues
  console.log('PlantIdentificationResult - plantName:', plantName);
  console.log('PlantIdentificationResult - plantInfo:', plantInfo);
  console.log('PlantIdentificationResult - plantDetails:', plantDetails);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="plant-result-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="plant-result-container"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="result-header-modern">
              {view === 'details' && (
                <button className="back-btn-modern" onClick={() => setView('result')}>
                  <ArrowLeft size={20} />
                </button>
              )}
              <div className="header-spacer" />
              <button className="close-btn-modern" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {view === 'result' ? (
              <motion.div 
                className="result-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Photo Comparison - User Upload vs Reference */}
                <motion.div 
                  className="plant-image-section"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="images-container">
                    {/* User Uploaded Photo */}
                    {uploadedImage && (
                      <div className="plant-image-wrapper user-photo">
                        <img src={uploadedImage} alt="Your uploaded photo" className="plant-image-modern" />
                        <div className="photo-label">📷 Your Photo</div>
                      </div>
                    )}
                    
                    {/* Plant Reference Image from API */}
                    {plantDetails.image_url && (
                      <div className="plant-image-wrapper reference-photo">
                        <img src={plantDetails.image_url} alt={plantName} className="plant-image-modern" />
                        <div className="photo-label reference-label">📚 Reference</div>
                      </div>
                    )}
                    
                    {/* Fallback placeholder */}
                    {!uploadedImage && !plantDetails.image_url && (
                      <div className="plant-image-wrapper">
                        <div className="plant-image-placeholder-modern">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Leaf size={80} className="plant-icon-animated" />
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
                
                {/* Confidence Ring */}
                <div className="confidence-section">
                  <svg className="confidence-ring-svg" viewBox="0 0 120 120">
                    <circle className="ring-bg" cx="60" cy="60" r="54" />
                    <motion.circle 
                      className="ring-progress" 
                      cx="60" cy="60" r="54"
                      stroke={getConfidenceColor(confidence)}
                      strokeDasharray={339.292}
                      initial={{ strokeDashoffset: 339.292 }}
                      animate={{ strokeDashoffset: 339.292 - (339.292 * animatedConfidence / 100) }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="confidence-badge-modern" style={{ color: getConfidenceColor(confidence) }}>
                    <span className="confidence-percent">{animatedConfidence}%</span>
                    <span className="confidence-label">{getConfidenceText(confidence)}</span>
                  </div>
                </div>

                {/* Plant Name */}
                <motion.div 
                  className="plant-name-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="plant-name-modern">{plantName}</h1>
                  {scientificName && (
                    <p className="scientific-name-modern"><em>{scientificName}</em></p>
                  )}
                  
                  {/* AI Badge */}
                  <motion.div 
                    className="ai-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Sparkles size={14} />
                    <span>Identified by HerbBayog AI</span>
                  </motion.div>
                </motion.div>

                {/* Quick Info Cards - DEBUG */}
                <div style={{background: 'red', padding: '10px', color: 'white', margin: '10px 0'}}>
                  DEBUG: plantInfo exists: {plantInfo ? 'YES' : 'NO'}
                </div>
                <div className="quick-info-grid">
                  <div className="info-card">
                    <Shield size={20} className="info-icon" />
                    <span className="info-label">Category</span>
                    <span className="info-value">{plantInfo?.category || 'Medicinal Plant'}</span>
                  </div>
                  <div className="info-card">
                    <Heart size={20} className="info-icon" />
                    <span className="info-label">Uses</span>
                    <span className="info-value">{plantInfo?.medicinal_uses?.length || plantInfo?.uses?.length || 0} Benefits</span>
                  </div>
                  {plantInfo?.doh_approved || plantInfo?.dohApproved ? (
                    <div className="info-card doh-card">
                      <span className="doh-icon">🏥</span>
                      <span className="info-label">Status</span>
                      <span className="info-value doh-value">DOH-Approved</span>
                    </div>
                  ) : (
                    <div className="info-card">
                      <Shield size={20} className="info-icon" />
                      <span className="info-label">Status</span>
                      <span className="info-value">Traditional</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <motion.div 
                  className="action-buttons-modern"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button className="btn-primary-modern" onClick={() => setView('details')}>
                    <Info size={18} />
                    View Full Details
                  </button>
                  <button className="btn-secondary-modern" onClick={onFeedback}>
                    <AlertCircle size={18} />
                    Wrong Identification?
                  </button>
                </motion.div>

                {/* Trust Badge */}
                <motion.div 
                  className="trust-badge"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Shield size={14} />
                  <span>DOH-Approved Traditional Medicine Information</span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="details-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Details Header */}
                <div className="details-header-modern">
                  <h2>{plantName}</h2>
                  {scientificName && <p className="sci-name"><em>{scientificName}</em></p>}
                  <div className="plant-badges">
                    {plantInfo?.category && (
                      <span className="category-tag">{plantInfo.category}</span>
                    )}
                    {plantInfo?.dohApproved && (
                      <span className="doh-badge">🏥 DOH-Approved</span>
                    )}
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="details-content">
                  {plantInfo ? (
                    <>
                      {/* Description */}
                      <section className="detail-section-modern">
                        <h3><Leaf size={18} /> About</h3>
                        <p>{plantInfo.description}</p>
                      </section>

                      {/* Medicinal Uses */}
                      <section className="detail-section-modern">
                        <h3><Heart size={18} /> Medicinal Uses</h3>
                        <ul className="uses-list">
                          {plantInfo.uses.map((use, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <CheckCircle2 size={16} className="check-icon" />
                              {use}
                            </motion.li>
                          ))}
                        </ul>
                      </section>

                      {/* Preparation */}
                      <section className="detail-section-modern">
                        <h3><FlaskConical size={18} /> How to Prepare</h3>
                        <ol className="prep-list">
                          {plantInfo.preparation.map((step, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <span className="step-num">{idx + 1}</span>
                              {step}
                            </motion.li>
                          ))}
                        </ol>
                      </section>

                      {/* Warnings */}
                      <section className="detail-section-modern warnings">
                        <h3><AlertCircle size={18} /> Important Warnings</h3>
                        <ul className="warning-list">
                          {plantInfo.warnings.map((warning, idx) => (
                            <li key={idx}>{warning}</li>
                          ))}
                        </ul>
                      </section>
                    </>
                  ) : (
                    <div className="no-details-message">
                      <Leaf size={48} className="no-details-icon" />
                      <h3>Plant Identified</h3>
                      <p>Our AI has identified this plant as <strong>{plantName}</strong>.</p>
                      <p>Detailed DOH-approved information for this specific plant is being added to our database soon.</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="details-footer">
                  <button className="done-btn-modern" onClick={onClose}>
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlantIdentificationResult;
