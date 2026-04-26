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
import './PlantDetails.css';

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchPlantDetails();
  }, [id]);

  const fetchPlantDetails = async () => {
    try {
      const response = await fetch(`/api/plants/${id}/`);
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
        <p>Loading plant information...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="plant-details-error">
        <AlertCircle className="error-icon" />
        <h2>Plant Not Found</h2>
        <button onClick={() => navigate('/plants')} className="btn-back">
          <ArrowLeft /> Back to Plants
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info size={18} /> },
    { id: 'medicinal', label: 'Medicinal Uses', icon: <Heart size={18} /> },
    { id: 'preparation', label: 'How to Prepare', icon: <Beaker size={18} /> },
    { id: 'cultural', label: 'Cultural Info', icon: <Leaf size={18} /> }
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
            <span className="plant-category">Medicinal Herb</span>
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
            <span className="stat-label">Preparation</span>
            <span className="stat-value">15-30 min</span>
          </div>
          <div className="stat-card">
            <Thermometer size={24} className="stat-icon" />
            <span className="stat-label">Storage</span>
            <span className="stat-value">Cool, Dry</span>
          </div>
          <div className="stat-card">
            <CheckCircle2 size={24} className="stat-icon" />
            <span className="stat-label">Safety</span>
            <span className="stat-value">Generally Safe</span>
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
                <h3>Description</h3>
                <p>{plant.description}</p>
              </div>
              
              <div className="panel-section">
                <h3>Key Benefits</h3>
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
                <h3>Traditional Medicinal Uses</h3>
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
                  <h3>Important Notes</h3>
                </div>
                <p className="warning-text">
                  Always consult with a healthcare provider before using herbal remedies, 
                  especially if you are pregnant, nursing, or taking medications.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'preparation' && (
            <div className="tab-panel">
              <div className="panel-section">
                <h3>Preparation Methods</h3>
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
                <h3>💡 Pro Tips</h3>
                <ul className="tips-list">
                  <li>Use fresh leaves for best potency</li>
                  <li>Harvest in the morning after dew dries</li>
                  <li>Store in a cool, dry place away from sunlight</li>
                  <li>Label preparations with date and plant name</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'cultural' && (
            <div className="tab-panel">
              <div className="panel-section">
                <h3>Cultural Significance</h3>
                <div className="cultural-content">
                  <p>{plant.cultural_relevance || 'Information about cultural significance coming soon.'}</p>
                </div>
              </div>
              
              <div className="panel-section heritage-section">
                <h3>Calbayog Heritage</h3>
                <p>
                  This plant is part of the rich botanical heritage of Calbayog City, 
                  Samar province. Traditional healers (herbolarios) have used these 
                  remedies for generations, passing down knowledge through oral tradition.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="plant-cta">
          <h3>Ready to identify this plant?</h3>
          <p>Use our AI scanner to identify plants instantly</p>
          <button 
            onClick={() => navigate('/scan')}
            className="btn-scan-plant"
          >
            <Leaf size={20} />
            Scan Plant Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
