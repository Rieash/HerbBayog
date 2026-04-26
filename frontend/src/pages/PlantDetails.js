import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Leaf, 
  Heart, 
  AlertCircle, 
  Beaker, 
  Clock, 
  Thermometer,
  CheckCircle2,
  Info,
  Share2,
  Bookmark
} from 'lucide-react';
import { API_ENDPOINTS } from '../config';
import { useLanguage } from '../contexts/LanguageContext';
import './PlantDetails.css';

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    fetchPlantDetails();
  }, [id]);

  const fetchPlantDetails = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.PLANTS}${id}/`);
      const data = await response.json();
      setPlant(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plant:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="plant-details-loading">
        <div className="loading-spinner-nature"></div>
        <p>{t('plantDetails.loading')}</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="plant-details-error">
        <AlertCircle className="error-icon" />
        <h2>{t('plantDetails.notFound')}</h2>
        <button onClick={() => navigate('/plants')} className="btn-back">
          <ArrowLeft /> {t('plantDetails.backToPlants')}
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: t('plantDetails.tabs.overview'), icon: <Info size={18} /> },
    { id: 'medicinal', label: t('plantDetails.tabs.medicinal'), icon: <Heart size={18} /> },
    { id: 'preparation', label: t('plantDetails.tabs.preparation'), icon: <Beaker size={18} /> },
    { id: 'cultural', label: t('plantDetails.tabs.cultural'), icon: <Leaf size={18} /> }
  ];

  return (
    <div className="plant-details-page">
      {/* Hero Section */}
      <div className="plant-hero">
        <div 
          className="plant-hero-bg"
          style={{ backgroundImage: `url(${plant.image_url || '/default-plant.jpg'})` }}
        />
        <div className="plant-hero-overlay" />
        
        <div className="plant-hero-content">
          <button onClick={() => navigate(-1)} className="btn-back-floating">
            <ArrowLeft size={20} />
          </button>
          
          <div className="plant-hero-info">
            <span className="plant-category">{t('plantDetails.category')}</span>
            <h1 className="plant-name">{plant.name}</h1>
            <p className="plant-scientific">{plant.scientific_name}</p>
            
            <div className="plant-actions">
              <button 
                className={`btn-action ${isBookmarked ? 'active' : ''}`}
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark size={20} />
              </button>
              <button className="btn-action">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="plant-content">
        {/* Quick Stats */}
        <div className="plant-stats">
          <div className="stat-card">
            <Clock size={24} className="stat-icon" />
            <span className="stat-label">{t('plantDetails.stats.preparation')}</span>
            <span className="stat-value">{t('plantDetails.stats.preparationValue')}</span>
          </div>
          <div className="stat-card">
            <Thermometer size={24} className="stat-icon" />
            <span className="stat-label">{t('plantDetails.stats.storage')}</span>
            <span className="stat-value">{t('plantDetails.stats.storageValue')}</span>
          </div>
          <div className="stat-card">
            <CheckCircle2 size={24} className="stat-icon" />
            <span className="stat-label">{t('plantDetails.stats.safety')}</span>
            <span className="stat-value">{t('plantDetails.stats.safetyValue')}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="plant-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="tab-panel overview-panel">
              <div className="panel-section">
                <h3>{t('plantDetails.overview.description')}</h3>
                <p>{plant.description}</p>
              </div>
              
              <div className="panel-section">
                <h3>{t('plantDetails.overview.benefits')}</h3>
                <div className="benefits-grid">
                  {plant.medicinal_uses?.slice(0, 4).map((use, idx) => (
                    <div key={idx} className="benefit-card">
                      <div className="benefit-icon">
                        <Leaf size={20} />
                      </div>
                      <span>{use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medicinal' && (
            <div className="tab-panel">
              <div className="panel-section">
                <h3>{t('plantDetails.medicinal.title')}</h3>
                <ul className="uses-list">
                  {plant.medicinal_uses?.map((use, idx) => (
                    <li key={idx} className="use-item">
                      <div className="use-bullet">{idx + 1}</div>
                      <div className="use-content">
                        <p>{use}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="panel-section warning-section">
                <div className="warning-header">
                  <AlertCircle size={24} />
                  <h3>{t('plantDetails.medicinal.notes')}</h3>
                </div>
                <p className="warning-text">
                  {t('plantDetails.medicinal.notesText')}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'preparation' && (
            <div className="tab-panel">
              <div className="panel-section">
                <h3>{t('plantDetails.preparation.title')}</h3>
                <div className="preparation-steps">
                  {plant.preparation_steps?.map((step, idx) => (
                    <div key={idx} className="prep-step">
                      <div className="step-number-large">{idx + 1}</div>
                      <div className="step-content">
                        <p>{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="panel-section tips-section">
                <h3>💡 {t('plantDetails.preparation.tips')}</h3>
                <ul className="tips-list">
                  <li>{t('plantDetails.preparation.tip1')}</li>
                  <li>{t('plantDetails.preparation.tip2')}</li>
                  <li>{t('plantDetails.preparation.tip3')}</li>
                  <li>{t('plantDetails.preparation.tip4')}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'cultural' && (
            <div className="tab-panel">
              <div className="panel-section">
                <h3>{t('plantDetails.cultural.title')}</h3>
                <div className="cultural-content">
                  <p>{plant.cultural_relevance || t('plantDetails.cultural.noInfo')}</p>
                </div>
              </div>
              
              <div className="panel-section heritage-section">
                <h3>{t('plantDetails.cultural.heritage')}</h3>
                <p>
                  {t('plantDetails.cultural.heritageText')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="plant-cta">
          <h3>{t('plantDetails.cta.title')}</h3>
          <p>{t('plantDetails.cta.subtitle')}</p>
          <button 
            onClick={() => navigate('/scan')}
            className="btn-scan-plant"
          >
            <Leaf size={20} />
            {t('plantDetails.cta.button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
