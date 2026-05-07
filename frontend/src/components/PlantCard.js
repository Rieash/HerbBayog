import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Leaf, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const t = (key) => {
  const { language } = useLanguage();
  const translationKey = language === 'war' ? 'waray' : null;
  if (translationKey && translations?.[translationKey]?.[key]) {
    return translations[translationKey][key];
  }
  return key;
};

const PlantCard = ({ plant, confidence, isVisible, onClose }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { language } = useLanguage();

  // Helper function to get translated content
  const getTranslatedContent = (field) => {
    const translationKey = language === 'war' ? 'waray' : null;
    if (translationKey && plant.translations?.[translationKey]?.[field]) {
      return plant.translations[translationKey][field];
    }
    return plant[field];
  };
  
  if (!isVisible) return null;
  
  // Loading state when plant data is not yet available
  if (!plant) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mb-4" />
          <p className="text-gray-600">Loading plant information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 p-4">
      <div className="bg-white rounded-t-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="nature-green-gradient text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              {/* Plant Image */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                  </div>
                )}
                <img
                  src={plant.imageUrl || '/images/plants/default-plant.jpg'}
                  alt={plant.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false);
                    setImageError(true);
                  }}
                />
                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Leaf className="w-10 h-10 text-green-600" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{plant.name}</h2>
                <p className="text-green-100 italic">{plant.scientific_name}</p>
                {plant.localNames && plant.localNames.length > 0 && (
                  <p className="text-green-200 text-sm mt-1">
                    Also known as: {plant.localNames.join(', ')}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Confidence Score */}
          <div className="flex items-center bg-white bg-opacity-20 rounded-lg p-3">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-semibold">Confidence: {confidence}%</span>
          </div>
          
          {/* API Source Badge */}
          {plant.source && (
            <div className="flex items-center bg-blue-500 bg-opacity-30 rounded-lg p-2 mt-2">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              <span className="text-sm font-medium">Powered by {plant.source}</span>
            </div>
          )}

          {/* Herbal Classification Badge */}
          {plant.is_herbal !== undefined && (
            <div className={`flex items-center rounded-lg p-2 mt-2 ${
              plant.is_herbal ? 'bg-green-500' : 'bg-gray-500'
            } bg-opacity-30`}>
              <Leaf className={`w-5 h-5 mr-2 ${
                plant.is_herbal ? 'text-white' : 'text-gray-600'
              }`} />
              <span className={`text-sm font-medium ${
                plant.is_herbal ? 'text-white' : 'text-gray-600'
              }`}>
                {plant.is_herbal 
                  ? t('landing.hero.highlights.herbal') 
                  : t('landing.hero.highlights.nonHerbal')
                }
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {getTranslatedContent('description') || 'No description available for this plant.'}
            </p>
          </div>

          {/* Medicinal Uses */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-600" />
              Medicinal Uses
            </h3>
            {(getTranslatedContent('medicinal_uses') || plant.medicinal_uses) && (getTranslatedContent('medicinal_uses') || plant.medicinal_uses).length > 0 ? (
              <div className="grid gap-2">
                {(getTranslatedContent('medicinal_uses') || plant.medicinal_uses).map((use, index) => (
                  <div key={index} className="flex items-start bg-green-50 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{use}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Medicinal uses information not available.</p>
            )}
          </div>

          {/* Preparation Steps */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-green-600" />
              Preparation Steps
            </h3>
            {(getTranslatedContent('preparation_steps') || plant.preparation_steps) && (getTranslatedContent('preparation_steps') || plant.preparation_steps).length > 0 ? (
              <div className="space-y-3">
                {(getTranslatedContent('preparation_steps') || plant.preparation_steps).map((step, index) => (
                  <div key={index} className="flex bg-green-50 p-3 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                      {index + 1}
                    </div>
                    <p className="text-gray-600 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Preparation steps not available.</p>
            )}
          </div>

          {/* Cultural Relevance */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Cultural Relevance</h3>
            <p className="text-gray-600 leading-relaxed">
              {getTranslatedContent('culturalRelevance') || getTranslatedContent('cultural_relevance') || 'Cultural information not available.'}
            </p>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Important Notice</p>
                <p>This information is for educational purposes only. Always consult with a healthcare professional before using any medicinal plants.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
