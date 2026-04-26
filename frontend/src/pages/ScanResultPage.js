import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Leaf, 
  Heart, 
  Shield, 
  Beaker, 
  Info,
  Share2,
  Camera,
  Sparkles
} from 'lucide-react';
import { dohPlantDatabase } from '../data/dohPlantDatabase';
import { getLocalName } from '../utils/plantNameMapping';
import { useLanguage } from '../contexts/LanguageContext';
import './ScanResultPage.css';

const ScanResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, uploadedImage } = location.state || {};
  const { t, language } = useLanguage();

  // Helper function to get translated content
  const getTranslatedContent = (plantData, field) => {
    const translationKey = language === 'war' ? 'waray' : null;
    if (translationKey && plantData?.translations?.[translationKey]?.[field]) {
      return plantData.translations[translationKey][field];
    }
    return plantData?.[field];
  };

  if (!result) {
    return (
      <div className="scan-result-error">
        <h2>{t('scanResult.notFound')}</h2>
        <button onClick={() => navigate('/scan')} className="back-button">
          <ArrowLeft size={20} />
          {t('scanResult.backToScan')}
        </button>
      </div>
    );
  }

  const plantName = getLocalName(result.plant_name || result.prediction?.plant_name) || result.plant_name || 'Unknown';
  const plantInfo = dohPlantDatabase[plantName] || null;
  const plantDetails = result.plant_details || result.prediction?.plant_details || {};
  const confidence = result.confidence || result.prediction?.confidence || 0;

  // Debug logging
  console.log('[ScanResultPage] uploadedImage:', uploadedImage);
  console.log('[ScanResultPage] plantDetails:', plantDetails);
  console.log('[ScanResultPage] plantDetails.image_url:', plantDetails?.image_url);

  return (
    <div className="scan-result-page">
      {/* Header */}
      <header className="scan-result-header">
        <button onClick={() => navigate('/scan')} className="back-button">
          <ArrowLeft size={24} />
          <span>{t('scanResult.backToScan')}</span>
        </button>
        <div className="scan-badge">
          <Sparkles size={18} />
          <span>AI Identified</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="scan-result-content">
        {/* Photo Comparison Section */}
        <section className="photo-comparison-section">
          <h2 className="section-title">Photo Comparison</h2>
          <div className={`photos-grid ${uploadedImage ? 'two-photos' : 'one-photo'}`}>
            {uploadedImage && (
              <div className="photo-card user-photo">
                <img 
                  src={uploadedImage} 
                  alt="Your uploaded plant"
                  onError={(e) => {
                    console.error('[ScanResultPage] Failed to load uploaded image');
                    e.target.style.display = 'none';
                  }}
                />
                <div className="photo-label user-label">
                  <Camera size={18} />
                  <span>Your Photo</span>
                </div>
              </div>
            )}
            <div className="photo-card reference-photo">
              {plantDetails?.image_url ? (
                <img 
                  src={plantDetails.image_url} 
                  alt={plantName}
                  onError={(e) => {
                    console.error('[ScanResultPage] Failed to load reference image');
                    e.target.style.display = 'none';
                    e.target.parentElement.querySelector('.no-image-placeholder').style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="no-image-placeholder" style={{ display: plantDetails?.image_url ? 'none' : 'flex' }}>
                <Leaf size={48} />
                <span>No reference image available</span>
              </div>
              <div className="photo-label reference-label">
                <Leaf size={18} />
                <span>Reference</span>
              </div>
            </div>
          </div>
        </section>

        {/* Identification Result */}
        <section className="identification-result">
          <div className="confidence-badge" style={{ '--confidence': `${confidence}%` }}>
            <div className="confidence-ring">
              <span className="confidence-value">{confidence}%</span>
              <span className="confidence-label">{t('scanResult.confidence')}</span>
            </div>
          </div>

          <h1 className="plant-name">{plantName}</h1>
          <p className="scientific-name">{plantDetails.scientific_name || plantInfo?.scientific_name || 'Scientific name not available'}</p>

          {/* Quick Info Cards */}
          <div className="info-cards-grid">
            <div className="info-card">
              <Shield size={24} className="info-icon" />
              <span className="info-label">Category</span>
              <span className="info-value">{plantInfo?.category || plantDetails.category || 'Medicinal Plant'}</span>
            </div>
            <div className="info-card">
              <Heart size={24} className="info-icon" />
              <span className="info-label">{t('scanResult.medicinalUses')}</span>
              <span className="info-value">
                {(plantInfo?.medicinal_uses || plantDetails.medicinal_uses || []).length || 0} Benefits
              </span>
            </div>
            <div className={`info-card ${(plantInfo?.doh_approved || plantDetails.doh_approved) ? 'doh-card' : ''}`}>
              {(plantInfo?.doh_approved || plantDetails.doh_approved) ? (
                <>
                  <span className="doh-icon">🏥</span>
                  <span className="info-label">Status</span>
                  <span className="info-value doh-value">DOH-Approved</span>
                </>
              ) : (
                <>
                  <Shield size={24} className="info-icon" />
                  <span className="info-label">Status</span>
                  <span className="info-value">Traditional</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Detailed Information */}
        <section className="detailed-info">
          <h3>
            <Info size={20} />
            About this Plant
          </h3>
          <p className="description">
            {getTranslatedContent(plantInfo || plantDetails, 'description') || `The ${plantName} is a medicinal plant commonly found in the Philippines. It has been traditionally used for various health benefits.`}
          </p>

          {/* Medicinal Uses */}
          {(plantInfo?.medicinal_uses || plantDetails.medicinal_uses || []).length > 0 && (
            <div className="uses-section">
              <h4>
                <Heart size={18} />
                {t('scanResult.medicinalUses')}
              </h4>
              <ul className="uses-list">
                {(getTranslatedContent(plantInfo || plantDetails, 'medicinal_uses') || plantInfo?.medicinal_uses || plantDetails.medicinal_uses || []).map((use, index) => (
                  <li key={index} className="use-item">
                    <span className="use-bullet">•</span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medicinal Uses - uses field from local database */}
          {(plantInfo?.uses || []).length > 0 && (
            <div className="uses-section">
              <h4>
                <Heart size={18} />
                {t('scanResult.medicinalUses')}
              </h4>
              <ul className="uses-list">
                {plantInfo.uses.map((use, index) => (
                  <li key={index} className="use-item">
                    <span className="use-bullet">•</span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preparation */}
          {(plantInfo?.preparation || plantDetails.preparation || plantDetails.preparation_steps) && (
            <div className="preparation-section">
              <h4>
                <Beaker size={18} />
                {t('scanResult.preparation')}
              </h4>
              {Array.isArray(getTranslatedContent(plantInfo || plantDetails, 'preparation_steps') || plantInfo?.preparation || plantDetails.preparation) ? (
                <ul className="preparation-list">
                  {(getTranslatedContent(plantInfo || plantDetails, 'preparation_steps') || plantInfo?.preparation || plantDetails.preparation).map((step, index) => (
                    <li key={index} className="preparation-item">
                      <span className="prep-number">{index + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{getTranslatedContent(plantInfo || plantDetails, 'preparation_steps') || plantInfo?.preparation || plantDetails.preparation}</p>
              )}
            </div>
          )}

          {/* Warnings */}
          {(plantInfo?.warnings || []).length > 0 && (
            <div className="warnings-section">
              <h4>
                <Shield size={18} />
                {t('scanResult.safety')}
              </h4>
              <ul className="warnings-list">
                {plantInfo.warnings.map((warning, index) => (
                  <li key={index} className="warning-item">
                    <span className="warning-bullet">⚠</span>
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cultural Significance */}
          {(plantInfo?.cultural_significance || plantDetails.cultural_significance || plantDetails.cultural_relevance) && (
            <div className="cultural-section">
              <h4>
                <Sparkles size={18} />
                Cultural Significance
              </h4>
              <p>{getTranslatedContent(plantInfo || plantDetails, 'cultural_relevance') || plantInfo?.cultural_significance || plantDetails.cultural_significance}</p>
            </div>
          )}
        </section>

        {/* Actions */}
        <section className="action-buttons">
          <button className="action-btn primary" onClick={() => navigate('/plants')}>
            <Leaf size={20} />
            Browse All Plants
          </button>
          <button className="action-btn secondary" onClick={() => navigate('/scan')}>
            <Camera size={20} />
            {t('scanResult.scanAnother')}
          </button>
          <button className="action-btn share">
            <Share2 size={20} />
            Share Result
          </button>
        </section>
      </main>
    </div>
  );
};

export default ScanResultPage;
