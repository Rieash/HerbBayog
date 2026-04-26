import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, Loader2, AlertCircle, PlusCircle, Scan, Leaf, ImageIcon } from 'lucide-react';
import PhotoSubmission from './PhotoSubmission';
import './Scanner.css';

const Scanner = ({ onScanComplete, onImageUpload, isAnalyzing, lastPrediction = null }) => {
  const webcamRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [showSubmission, setShowSubmission] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef(null);

  const capture = useCallback(async () => {
    if (!webcamRef.current) return;
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setIsScanning(true);
      setError('');
      try {
        await onScanComplete(imageSrc);
      } finally {
        setIsScanning(false);
      }
    }
  }, [webcamRef, onScanComplete]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError('');
    setIsUploading(true);
    try {
      await onImageUpload(file);
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const activateCamera = () => {
    setCameraActive(true);
    setError('');
  };

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'environment'
  };

  return (
    <div className="scanner-container">
      {/* Main Camera Area */}
      <div className="camera-section">
        {cameraActive ? (
          <div className="camera-active">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="webcam-video"
            />
            
            {/* Scanning Frame Overlay */}
            <div className="scan-frame">
              <div className="scan-corner top-left"></div>
              <div className="scan-corner top-right"></div>
              <div className="scan-corner bottom-left"></div>
              <div className="scan-corner bottom-right"></div>
            </div>
            
            {/* Scanning Overlay */}
            {isScanning && (
              <div className="scanning-overlay">
                <div className="scanning-content">
                  <Loader2 className="scanning-spinner" />
                  <p className="scanning-text">Scanning...</p>
                </div>
              </div>
            )}

            {/* Analysis Overlay */}
            {isAnalyzing && (
              <div className="analyzing-overlay">
                <div className="analyzing-content">
                  <Loader2 className="analyzing-spinner" />
                  <p className="analyzing-title">Analyzing plant...</p>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                  <p className="analyzing-subtitle">Processing with AI model</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="camera-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">
                <Scan className="icon-main" />
                <Leaf className="icon-accent" />
              </div>
              <h3 className="placeholder-title">Ready to Scan</h3>
              <p className="placeholder-text">Click "Start Camera" to begin identifying plants</p>
              <button onClick={activateCamera} className="start-camera-btn">
                <Camera className="btn-icon" />
                Start Camera
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Processing Overlay - shows for both upload and analysis */}
      {(isUploading || isAnalyzing) && (
        <div className="processing-overlay">
          <div className="processing-content">
            <Loader2 className="processing-spinner" />
            <p className="processing-title">
              {isUploading ? 'Uploading image...' : 'Analyzing plant...'}
            </p>
            <div className="progress-bar">
              <div className="progress-fill animate"></div>
            </div>
            <p className="processing-subtitle">
              {isUploading 
                ? 'Sending image to server...' 
                : 'AI model processing image...'}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons flex flex-col sm:flex-row gap-3 sm:gap-4">
        {cameraActive && (
          <button
            onClick={capture}
            disabled={isAnalyzing}
            className="btn-capture"
          >
            <Camera className="btn-icon" />
            Capture Photo
          </button>
        )}
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isAnalyzing || isUploading}
          className={`btn-upload ${isUploading ? 'btn-loading' : ''}`}
        >
          {isUploading ? (
            <>
              <Loader2 className="btn-icon spinner" />
              Uploading...
            </>
          ) : (
            <>
              <ImageIcon className="btn-icon" />
              Upload Image
            </>
          )}
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <AlertCircle className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      {/* Contribute Button */}
      <div className="contribute-section">
        <button
          onClick={() => setShowSubmission(true)}
          className="btn-contribute text-sm md:text-base"
        >
          <PlusCircle className="btn-icon" />
          Help improve HerbBayog - Contribute a plant photo
        </button>
      </div>

      {/* Photo Submission Modal */}
      {showSubmission && (
        <PhotoSubmission
          onClose={() => setShowSubmission(false)}
          aiPrediction={lastPrediction?.plant_name}
          aiConfidence={lastPrediction?.confidence}
        />
      )}

      {/* Instructions */}
      <div className="instructions">
        <h3 className="instructions-title text-base md:text-lg">
          <Leaf className="title-icon" />
          Tips for Best Results
        </h3>
        <ul className="instructions-list text-sm md:text-base">
          <li>Position the plant clearly in the center frame</li>
          <li>Use natural daylight for accurate colors</li>
          <li>Focus on leaves, flowers, or distinctive features</li>
          <li>Avoid blurry or dark photos</li>
        </ul>
      </div>
    </div>
  );
};

export default Scanner;
