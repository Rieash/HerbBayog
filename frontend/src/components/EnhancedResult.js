import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, TrendingUp, Camera, Sparkles, ArrowLeft, Leaf, Heart, FlaskConical, AlertTriangle } from 'lucide-react';
import './EnhancedResult.css';
import { getLocalName } from '../utils/plantNameMapping';

const EnhancedResult = ({ result, isOpen, onClose, onFeedback, onRetake }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  if (!isOpen || !result) return null;

  // Handle error case
  if (result.error || result.prediction?.plant_name === 'Error') {
    return (
      <div className="enhanced-result-overlay">
        <div className="enhanced-result-card error">
          <div className="result-header" style={{ borderColor: '#ef4444' }}>
            <div className="confidence-badge" style={{ background: '#ef4444' }}>
              <AlertCircle className="confidence-icon" />
              <span>Error</span>
            </div>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          <div className="result-main">
            <div className="unknown-result">
              <div className="unknown-icon">⚠️</div>
              <h2>Classification Failed</h2>
              <p>{result.error || 'Unable to process image. Please try again.'}</p>
            </div>
            <div className="result-actions">
              <button className="action-btn primary" onClick={onRetake}>
                <Camera className="btn-icon" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle both old format (prediction) and new API format (direct fields)
  const apiPlantName = result.prediction?.plant_name || result.plant_name || 'Unknown';
  const plantName = getLocalName(apiPlantName);
  const scientificName = result.prediction?.scientific_name || result.scientific_name || '';
  const confidencePercent = Math.round(result.prediction?.confidence || result.confidence || 0);
  const plant_details = result.plant_details || null;
  
  // Extended plant database for common Philippine medicinal plants
  const plantDatabase = {
    'Lagundi': {
      description: 'Lagundi is a shrub that grows in the Philippines and is widely used as a traditional herbal medicine. It has been clinically tested for its effectiveness in treating cough, colds, and asthma.',
      medicinalUses: [
        'Treatment of coughs, colds, and fever',
        'Relief from asthma and bronchitis',
        'Treatment of pharyngitis',
        'Relief from diarrhea and dysentery',
        'Treatment of skin diseases and wounds'
      ],
      preparation: [
        'Boil 2-3 tablespoons of dried leaves in 2 cups of water for 10-15 minutes',
        'Let it cool and strain',
        'Drink as tea, 3-4 times daily',
        'For cough: Add honey to sweeten'
      ],
      warnings: [
        'Not recommended for pregnant women',
        'Consult doctor if symptoms persist',
        'May cause allergic reactions in some people'
      ],
      category: 'Respiratory'
    },
    'Sambong': {
      description: 'Sambong is a traditional herbal medicine in the Philippines known for its diuretic properties. It helps in the treatment of kidney stones and urinary tract infections.',
      medicinalUses: [
        'Treatment of kidney stones and edema',
        'Relief from rheumatism and arthritis',
        'Treatment of coughs and colds',
        'Anti-diarrheal properties',
        'Treatment of hypertension'
      ],
      preparation: [
        'Wash fresh leaves thoroughly',
        'Boil 1 cup of chopped leaves in 2 cups of water',
        'Simmer for 15-20 minutes',
        'Drink 3-4 cups daily',
        'Can also be used as poultice for wounds'
      ],
      warnings: [
        'May increase urination frequency',
        'Consult doctor before use with other medications',
        'Not for long-term use without medical supervision'
      ],
      category: 'Urinary/Kidney'
    },
    'Malunggay': {
      description: 'Malunggay, also known as Moringa, is called the "miracle tree" due to its high nutritional value. It is rich in vitamins, minerals, and antioxidants.',
      medicinalUses: [
        'Boosts immune system',
        'Treatment of malnutrition',
        'Controls blood sugar levels',
        'Anti-inflammatory properties',
        'Improves lactation in nursing mothers',
        'Treatment of anemia'
      ],
      preparation: [
        'Young leaves can be eaten raw in salads',
        'Add leaves to soups and stews (do not overcook)',
        'Make tea: Steep 1 tsp dried leaves in hot water for 5 mins',
        'Leaf powder can be added to smoothies',
        'Seeds can be eaten like peas'
      ],
      warnings: [
        'Generally safe for consumption',
        'Roots contain toxic compounds - avoid consuming',
        'May lower blood sugar - diabetics should monitor levels'
      ],
      category: 'Nutritional'
    },
    'Bayabas': {
      description: 'Bayabas or Guava is not just a fruit but also has medicinal properties. Its leaves are commonly used for treating wounds and diarrhea.',
      medicinalUses: [
        'Treatment of diarrhea and dysentery',
        'Wound healing and disinfection',
        'Relief from toothache',
        'Treatment of stomach problems',
        'Controls blood sugar levels',
        'Treatment of gum problems'
      ],
      preparation: [
        'For diarrhea: Boil 10-15 leaves in 2 cups water for 15 mins',
        'For wounds: Crush young leaves and apply as poultice',
        'For toothache: Chew young leaves',
        'As mouthwash: Gargle with cooled decoction'
      ],
      warnings: [
        'May cause constipation if overused',
        'Pregnant women should consult doctor first',
        'May interact with diabetes medication'
      ],
      category: 'Digestive/Wounds'
    },
    'Ampalaya': {
      description: 'Ampalaya or Bitter Melon is widely used in the Philippines for managing diabetes. Despite its bitter taste, it offers numerous health benefits.',
      medicinalUses: [
        'Lowers blood sugar levels',
        'Treatment of diabetes',
        'Boosts immune system',
        'Antioxidant properties',
        'Treatment of skin diseases',
        'Aids in weight loss'
      ],
      preparation: [
        'Wash and slice fresh fruit',
        'Can be cooked as vegetable dish (ginisang ampalaya)',
        'Make juice: Blend with water and strain',
        'Dried leaves can be made into tea',
        'Seeds can be eaten (remove red covering)'
      ],
      warnings: [
        'Diabetics should monitor blood sugar closely',
        'Pregnant women should avoid (may cause miscarriage)',
        'May cause stomach upset in large amounts',
        'Do not take with diabetes medication without doctor advice'
      ],
      category: 'Diabetes/Antidiabetic'
    },
    'Tawa-tawa': {
      description: 'Tawa-tawa is traditionally used for treating asthma and respiratory problems. It has gained attention for its potential in treating dengue fever.',
      medicinalUses: [
        'Treatment of asthma and bronchitis',
        'May help increase platelet count in dengue',
        'Treatment of dysentery',
        'Treatment of skin sores and wounds',
        'Relief from intestinal worms'
      ],
      preparation: [
        'Boil 1 cup of whole plant in 4 cups water for 10 mins',
        'Let cool and strain',
        'Drink 3-4 cups daily',
        'For wounds: Crush leaves and apply directly'
      ],
      warnings: [
        'Not proven cure for dengue - seek medical attention',
        'Should not replace professional medical treatment',
        'May cause allergic reactions',
        'Consult doctor before use'
      ],
      category: 'Respiratory'
    },
    'Oregano': {
      description: 'Oregano is a popular herb used for respiratory ailments. It has antiseptic, antispasmodic, and expectorant properties.',
      medicinalUses: [
        'Relief from coughs and colds',
        'Treatment of asthma',
        'Relief from indigestion',
        'Treatment of menstrual cramps',
        'Relief from headaches',
        'Antibacterial properties'
      ],
      preparation: [
        'Make tea: Steep 1-2 tsp dried leaves in hot water for 10 mins',
        'For cough: Add honey and lemon',
        'Can be used as steam inhalation',
        'Leaves can be chewed fresh for toothache'
      ],
      warnings: [
        'May cause stomach upset in large doses',
        'Pregnant women should use with caution',
        'May interact with blood thinners',
        'Can cause allergic reactions'
      ],
      category: 'Respiratory'
    },
    'Tanglad': {
      description: 'Tanglad or Lemongrass is widely used for its calming properties and digestive benefits. It has a pleasant citrus scent.',
      medicinalUses: [
        'Relief from digestive problems',
        'Reduces stress and anxiety',
        'Lowers cholesterol',
        'Relief from insomnia',
        'Treatment of fever',
        'Relief from menstrual pain'
      ],
      preparation: [
        'Make tea: Boil 2-3 stalks in 2 cups water for 10 mins',
        'Can be used as flavoring in cooking',
        'Oil can be used for massage',
        'As inhalant for colds'
      ],
      warnings: [
        'Generally safe',
        'May lower blood sugar',
        'Pregnant women should consult doctor',
        'May cause skin irritation in sensitive people'
      ],
      category: 'Digestive/Relaxant'
    },
    'Yerba Buena': {
      description: 'Yerba Buena is one of the most popular Philippine medicinal plants. It is known for its pain-relieving properties.',
      medicinalUses: [
        'Relief from body pain and aches',
        'Treatment of coughs and colds',
        'Relief from insect bites',
        'Treatment of nausea and dizziness',
        'Relief from menstrual cramps',
        'Treatment of toothache'
      ],
      preparation: [
        'Make tea: Steep fresh or dried leaves in hot water for 5-10 mins',
        'For pain: Apply crushed leaves as poultice',
        'For insect bites: Rub fresh leaves on affected area',
        'As inhalant for headaches'
      ],
      warnings: [
        'Generally safe for most people',
        'May interact with medications',
        'Pregnant women should consult doctor'
      ],
      category: 'Pain Relief'
    },
    'Pansit-pansitan': {
      description: 'Pansit-pansitan is a small succulent plant that grows wild in many areas. It is effective for treating arthritis and gout.',
      medicinalUses: [
        'Treatment of arthritis and gout',
        'Relief from abdominal pain',
        'Treatment of high blood pressure',
        'Treatment of kidney problems',
        'Relief from skin boils',
        'Treatment of eye inflammation'
      ],
      preparation: [
        'Wash fresh leaves',
        'Eat raw (1-2 handfuls) daily',
        'Or make tea: Boil leaves in water for 10 mins',
        'Can be added to salads'
      ],
      warnings: [
        'May lower blood pressure',
        'Pregnant women should avoid',
        'Do not consume in large amounts',
        'May increase potassium levels'
      ],
      category: 'Arthritis/Gout'
    },
    'Akapulko': {
      description: 'Akapulko is commonly known as the "ringworm bush" due to its effectiveness in treating fungal skin infections.',
      medicinalUses: [
        'Treatment of ringworm and fungal infections',
        'Treatment of skin diseases',
        'Treatment of insect bites',
        'Relief from herpes',
        'Treatment of scabies',
        'Anti-inflammatory properties'
      ],
      preparation: [
        'Crush fresh leaves to extract juice',
        'Apply juice directly to affected skin',
        'For ringworm: Apply 2-3 times daily',
        'Can also make poultice with crushed leaves'
      ],
      warnings: [
        'For external use only - do not ingest',
        'May cause skin irritation in some people',
        'Test on small area first',
        'Keep away from eyes'
      ],
      category: 'Skin/Fungal'
    },
    'Bawang': {
      description: 'Bawang or Garlic is one of the most widely used medicinal plants. It has antimicrobial and cardiovascular benefits.',
      medicinalUses: [
        'Lowers blood pressure',
        'Reduces cholesterol',
        'Antibacterial and antiviral',
        'Boosts immune system',
        'Relief from coughs and colds',
        'Treatment of intestinal worms'
      ],
      preparation: [
        'Eat 1-2 cloves raw daily (crush first and let sit 10 mins)',
        'Can be added to cooking',
        'Make tea: Steep crushed garlic in hot water',
        'For cough: Mix with honey'
      ],
      warnings: [
        'May cause bad breath and body odor',
        'May interact with blood thinners',
        'Can cause heartburn in some people',
        'May lower blood sugar'
      ],
      category: 'Cardiovascular'
    },
    'Papaya': {
      description: 'Papaya (Carica papaya) is a tropical fruit tree widely cultivated in the Philippines. Both the fruit and leaves have recognized medicinal properties supported by the Department of Health.',
      medicinalUses: [
        'Aids digestion and relieves constipation',
        'Rich in papain enzyme for protein breakdown',
        'Anti-inflammatory properties',
        'Supports wound healing',
        'Boosts immune system with high Vitamin C',
        'May help lower blood sugar levels',
        'Contains antioxidants for heart health'
      ],
      preparation: [
        'Eat ripe papaya fruit daily for digestion',
        'Papaya leaf tea: Boil 2-3 young leaves in 2 cups water for 10 mins',
        'For wounds: Apply pulp of unripe papaya as poultice',
        'Seeds can be dried and powdered for digestive aid'
      ],
      warnings: [
        'Unripe papaya contains latex - avoid during pregnancy',
        'May cause allergic reactions in sensitive individuals',
        'Excessive consumption may cause digestive upset',
        'Consult doctor if on blood thinning medications'
      ],
      category: 'Digestive/Nutritional'
    },
  };

  // Get plant info from local database (after plantDatabase is defined)
  const plantInfo = plantDatabase[plantName];

  // Helper function to determine confidence level
  const getConfidenceLevel = (confidence) => {
    if (confidence >= 80) return 'high';
    if (confidence >= 60) return 'medium';
    return 'low';
  };

  // Determine confidence level
  let confidenceLevel, confidenceColor, confidenceIcon, confidenceMessage;
  
  if (confidencePercent >= 80) {
    confidenceLevel = 'high';
    confidenceColor = '#22c55e';
    confidenceIcon = <CheckCircle2 className="confidence-icon high" />;
    confidenceMessage = 'High confidence - This identification is very reliable';
  } else if (confidencePercent >= 50) {
    confidenceLevel = 'medium';
    confidenceColor = '#f59e0b';
    confidenceIcon = <HelpCircle className="confidence-icon medium" />;
    confidenceMessage = 'Moderate confidence - Verify with plant details below';
  } else {
    confidenceLevel = 'low';
    confidenceColor = '#ef4444';
    confidenceIcon = <AlertCircle className="confidence-icon low" />;
    confidenceMessage = 'Low confidence - Try taking a clearer photo';
  }

  // Get top 3 alternatives if available
  const alternatives = result.prediction?.top_predictions?.slice(1, 4) || [];
  
  // Calculate quality score based on multiple factors
  const hasPlantDetails = plant_details && plant_details.name !== 'Unknown Plant';
  const isUnknown = plantName === 'Unknown Plant' || plantName === 'Unknown' || !plantName;

  return (
    <div className="enhanced-result-overlay">
      <div className="enhanced-result-card">
        {/* Header */}
        <div className="result-header">
          <span className={`confidence-badge ${getConfidenceLevel(confidencePercent)}`}>
            {confidencePercent}% Match
          </span>
          {showDetails ? (
            <button className="back-btn" onClick={() => setShowDetails(false)}>
              <ArrowLeft size={20} /> Back
            </button>
          ) : (
            <button className="close-btn" onClick={onClose}>×</button>
          )}
        </div>

        {!showDetails && (
          <>
            <div className="plant-image-container">
              {plant_details?.image_url ? (
                <img src={plant_details.image_url} alt={plantName} className="plant-image" />
              ) : (
                <div className="plant-image-placeholder">
                  <span className="plant-emoji">🌿</span>
                </div>
              )}
              <div className="confidence-ring" style={{ borderColor: confidenceColor }}>
                <svg viewBox="0 0 100 100">
                  <circle
                    className="ring-bg"
                    cx="50"
                    cy="50"
                    r="45"
                  />
                  <circle
                    className="ring-fill"
                    cx="50"
                    cy="50"
                    r="45"
                    style={{
                      stroke: confidenceColor,
                      strokeDasharray: `${confidencePercent * 2.83} 283`
                    }}
                  />
                </svg>
                <div className="ring-text">{confidencePercent}%</div>
              </div>
            </div>

            <h1 className="plant-name">{plantName}</h1>
            {scientificName && (
              <p className="scientific-name"><em>{scientificName}</em></p>
            )}
            {result.is_in_database === false && (
              <div className="api-notice" style={{background: '#f0fdf4', padding: '8px 12px', borderRadius: '6px', marginTop: '8px', fontSize: '0.85rem', color: '#166534'}}>
                🤖 Identified by HerbBayog AI
              </div>
            )}

            {/* Confidence Message */}
            <div className={`confidence-message ${confidenceLevel}`}>
              {confidenceIcon}
              <span>{confidenceMessage}</span>
            </div>
          </>
        )}

        {/* Alternatives Section (for medium/low confidence) */}
        {alternatives.length > 0 && confidencePercent < 80 && !isUnknown && (
          <div className="alternatives-section">
            <h3><TrendingUp className="section-icon" /> Could Also Be:</h3>
            <div className="alternatives-list">
              {alternatives.map((alt, index) => (
                <div key={index} className="alternative-item">
                  <span className="alt-rank">#{index + 2}</span>
                  <span className="alt-name">{alt.plant_name}</span>
                  <div className="alt-confidence">
                    <div 
                      className="alt-confidence-bar" 
                      style={{ width: `${alt.confidence}%`, background: confidenceColor }}
                    />
                    <span>{Math.round(alt.confidence)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plant Details (if available) */}
        {hasPlantDetails && (
          <div className="plant-details-section">
            <h3><Sparkles className="section-icon" /> About This Plant</h3>
            <p className="plant-description">{plant_details.description}</p>
            
            {plant_details.medicinal_uses?.length > 0 && (
              <div className="detail-section">
                <h4>🌱 Medicinal Uses</h4>
                <ul>
                  {plant_details.medicinal_uses.slice(0, 3).map((use, i) => (
                    <li key={i}>{use}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="result-actions">
          {isUnknown || confidencePercent < 50 ? (
            <button className="action-btn primary" onClick={onRetake}>
              <Camera className="btn-icon" />
              Try Again
            </button>
          ) : (
            <>
              <button className="action-btn primary" onClick={() => setShowDetails(true)}>
                <CheckCircle2 className="btn-icon" />
                Correct! Show Info
              </button>
              <button className="action-btn secondary" onClick={onFeedback}>
                <AlertCircle className="btn-icon" />
                Wrong?
              </button>
            </>
          )}
        </div>

        {/* Tips for Low Confidence */}
        {confidencePercent < 50 && !showDetails && (
          <div className="photo-tips">
            <h4>📸 Tips for Better Results:</h4>
            <ul>
              <li>Use natural daylight</li>
              <li>Focus on a single leaf</li>
              <li>Fill the camera frame with the plant</li>
              <li>Avoid shadows and blur</li>
            </ul>
          </div>
        )}
        
        {/* Detailed Plant View */}
        {showDetails && (
          <div className="plant-details-view">
            <div className="details-header">
              <h1 className="plant-title">{plantName}</h1>
              {scientificName && (
                <p className="scientific-title"><em>{scientificName}</em></p>
              )}
              {plantInfo?.category && (
                <span className="category-badge">{plantInfo.category}</span>
              )}
            </div>
            
            {/* Description */}
            <div className="detail-section">
              <h3>🌿 About</h3>
              <p>{plantInfo?.description || `Our AI has identified this plant as ${plantName}. Detailed medicinal information for this specific plant is being added to our database soon.`}</p>
            </div>
            
            {/* Medicinal Uses */}
            {plantInfo?.medicinalUses && (
              <div className="detail-section">
                <h3>❤️ Medicinal Uses</h3>
                <ul>
                  {plantInfo.medicinalUses.map((use, idx) => (
                    <li key={idx}>{use}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Preparation */}
            {plantInfo?.preparation && (
              <div className="detail-section">
                <h3>🧪 How to Prepare</h3>
                <ol>
                  {plantInfo.preparation.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
            
            {/* Warnings */}
            {plantInfo?.warnings && (
              <div className="detail-section warnings">
                <h3>⚠️ Warnings</h3>
                <ul>
                  {plantInfo.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Not in database notice */}
            {!plantInfo && (
              <div className="detail-section info-notice">
                <p>This plant has been identified by our AI. Detailed medicinal information will be available soon.</p>
              </div>
            )}
            
            <button className="done-btn" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedResult;
