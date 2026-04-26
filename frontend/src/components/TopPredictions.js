import React from 'react';
import { HelpCircle, ChevronRight } from 'lucide-react';
import './TopPredictions.css';

const TopPredictions = ({ predictions, threshold, onSelect, actualConfidence }) => {
  if (!predictions || predictions.length === 0) return null;
  
  const isLowConfidence = actualConfidence < 65;

  return (
    <div className="top-predictions">
      <div className={`predictions-header ${isLowConfidence ? 'low-confidence' : ''}`}>
        <HelpCircle size={20} />
        <span>{isLowConfidence ? 'Low confidence prediction - results may vary' : 'AI is unsure. Here are the top possibilities:'}</span>
      </div>
      
      <div className="predictions-list">
        {predictions.map((pred, index) => (
          <div 
            key={index} 
            className={`prediction-item ${index === 0 ? 'top' : ''} ${pred.confidence >= threshold ? 'above-threshold' : ''}`}
            onClick={() => onSelect && onSelect(pred)}
          >
            <div className="prediction-rank">#{index + 1}</div>
            <div className="prediction-info">
              <span className="prediction-name">{pred.plant_name}</span>
              <div className="prediction-bar-container">
                <div 
                  className="prediction-bar" 
                  style={{ width: `${pred.confidence}%` }}
                />
              </div>
            </div>
            <div className="prediction-confidence">
              {pred.confidence}%
            </div>
            <ChevronRight size={16} className="prediction-arrow" />
          </div>
        ))}
      </div>
      
      <p className="predictions-tip">
        💡 <strong>Tip:</strong> Try taking a clearer photo with better lighting, or focus on a single leaf.
      </p>
    </div>
  );
};

export default TopPredictions;
