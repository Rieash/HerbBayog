import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ message = 'Loading...', type = 'nature' }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(message);
  const [isComplete, setIsComplete] = useState(false);
  
  const loadingMessages = [
    'Growing neural networks...',
    'Analyzing leaf patterns...',
    'Identifying plant features...',
    'Consulting herbal wisdom...',
    'Processing botanical data...',
    'Scanning for medicinal properties...',
    'Learning from Calbayog flora...',
    'Almost there...'
  ];

  useEffect(() => {
    // Faster progress for navigation (completes in ~800ms)
    const increment = type === 'navigation' ? 25 : 8;
    const intervalTime = type === 'navigation' ? 80 : 200;
    const maxProgress = type === 'navigation' ? 100 : 95;
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= maxProgress) {
          if (type === 'navigation') {
            setIsComplete(true);
          }
          return maxProgress;
        }
        return prev + increment;
      });
    }, intervalTime);

    // Rotate messages (slower for initial load only)
    let messageInterval;
    if (type !== 'navigation') {
      messageInterval = setInterval(() => {
        setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
      }, 2500);
    }

    return () => {
      clearInterval(progressInterval);
      if (messageInterval) clearInterval(messageInterval);
    };
  }, [type, message]);

  // Ensure we reach 100% when parent signals completion
  useEffect(() => {
    if (progress >= 90 && type !== 'navigation') {
      const completeTimer = setTimeout(() => {
        setProgress(100);
      }, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [progress, type]);

  return (
    <div className={`loading-screen ${type} ${isComplete ? 'fade-out' : ''}`}>
      <div className="loading-container">
        {/* Animated Plant Growing */}
        <div className="plant-loader">
          <div className="soil">
            <div className="soil-particles">
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className="sprout">
            <div className="stem">
              <div className="leaf leaf-left"></div>
              <div className="leaf leaf-right"></div>
              <div className="leaf leaf-top"></div>
            </div>
          </div>
          <div className="growth-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar-nature">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
            <div className="progress-glow"></div>
          </div>
          <div className="progress-text">
            <span className="percentage">{Math.round(Math.min(progress, 100))}%</span>
            <span className="message">{loadingText}</span>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="floating-particles">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="particle-item"
              style={{
                left: `${10 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            >
              {['🍃', '🌿', '🌱', '🍀', '🌾', '🌲'][i]}
            </div>
          ))}
        </div>

        {/* Fun Facts - only show for initial load */}
        {type !== 'navigation' && (
          <div className="loading-facts">
            <div className="fact-bubble">
              <span className="fact-label">Did you know?</span>
              <p className="fact-text">
                The Philippines is home to over 8,000 plant species, 
                with 40+ used in traditional medicine!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Mini loader for buttons/components
export const MiniLoader = ({ size = 'medium' }) => {
  return (
    <div className={`mini-loader ${size}`}>
      <div className="leaf-spinner">
        <span className="leaf-1">🍃</span>
        <span className="leaf-2">🌿</span>
        <span className="leaf-3">🍃</span>
      </div>
    </div>
  );
};

// Scanning loader
export const ScanningLoader = () => {
  return (
    <div className="scanning-loader">
      <div className="scanner-frame">
        <div className="corner tl"></div>
        <div className="corner tr"></div>
        <div className="corner bl"></div>
        <div className="corner br"></div>
        <div className="scan-line-horizontal"></div>
        <div className="scan-line-vertical"></div>
        <div className="scan-center">
          <div className="ripple-ring"></div>
          <div className="ripple-ring"></div>
          <div className="ripple-ring"></div>
        </div>
      </div>
      <p className="scan-text">Scanning plant...</p>
    </div>
  );
};

// Pulse loader for AI thinking
export const ThinkingLoader = () => {
  return (
    <div className="thinking-loader">
      <div className="brain-waves">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className="thinking-dots">
        <span>Analyzing</span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
