import React, { useState } from 'react';
import { ThumbsDown, Send, X, CheckCircle } from 'lucide-react';
import './FeedbackForm.css';

const FeedbackForm = ({ prediction, imageUrl, onSubmit, onClose }) => {
  const [correctPlant, setCorrectPlant] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const commonPlants = [
    'Lagundi', 'Sambong', 'Malunggay', 'Bayabas', 'Ampalaya',
    'Tawa-tawa', 'Guava', 'Oregano', 'Tanglad', 'Yerba Buena',
    'Pansit-pansitan', 'Niyog-niyogan', 'Akapulko',
    'Ulasimang Bato', 'Bawang', 'Tsaang Gubat'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit({
        predicted: prediction?.plant_name,
        correct: correctPlant,
        confidence: prediction?.confidence,
        image_path: imageUrl,
        notes: notes
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Feedback error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="feedback-success">
        <CheckCircle size={48} className="success-icon" />
        <h3>Thank you!</h3>
        <p>Your feedback helps us improve the AI model.</p>
        <button onClick={onClose} className="btn-close">Close</button>
      </div>
    );
  }

  return (
    <div className="feedback-form">
      <div className="feedback-header">
        <ThumbsDown size={20} />
        <span>Wrong prediction? Help us improve!</span>
        <button onClick={onClose} className="btn-x"><X size={18} /></button>
      </div>
      
      <div className="feedback-content">
        <p className="current-prediction">
          AI predicted: <strong>{prediction?.plant_name}</strong> 
          ({prediction?.confidence}% confidence)
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>What plant is this actually?</label>
            <select 
              value={correctPlant} 
              onChange={(e) => setCorrectPlant(e.target.value)}
              required
            >
              <option value="">Select the correct plant...</option>
              {commonPlants.map(plant => (
                <option key={plant} value={plant}>{plant}</option>
              ))}
              <option value="Unknown">Unknown / Not in list</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Additional notes (optional)</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any details about the photo or plant..."
              rows={3}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading || !correctPlant}
          >
            {loading ? 'Sending...' : (
              <><Send size={16} /> Submit Feedback</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
