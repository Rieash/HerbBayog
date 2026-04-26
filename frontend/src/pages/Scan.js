import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Scanner from '../components/Scanner';
import axios from 'axios';
import './Scan.css';
import '../styles/animations.css';

const Scan = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleScanComplete = async (imageData) => {
    try {
      setIsAnalyzing(true);
      // Store the image preview
      setUploadedImage(imageData);
      // Convert base64 to blob
      const blob = await fetch(imageData).then(r => r.blob());
      const file = new File([blob], 'scan.jpg', { type: 'image/jpeg' });
      
      await uploadImage(file, imageData);
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Scan error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = async (file) => {
    setIsAnalyzing(true);
    // Create preview URL from file
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    await uploadImage(file, imageUrl);
    setIsAnalyzing(false);
  };

  const uploadImage = async (file, imagePreviewUrl) => {
    console.log('[DEBUG] Starting upload...');
    console.log('[DEBUG] Image preview URL:', imagePreviewUrl);
    try {
      const formData = new FormData();
      formData.append('image', file);

      console.log('[DEBUG] Sending request to backend...');
      const response = await axios.post('/api/classify-api/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('[DEBUG] Response:', response.data);

      if (response.data && response.data.success) {
        const prediction = response.data.prediction;
        const plantName = prediction?.plant_name;
        const isReliable = prediction?.is_reliable;
        
        // Check if it's not a plant (Unknown Plant or low confidence)
        if (plantName === 'Unknown Plant' || !isReliable) {
          setError('We couldn\'t clearly identify this plant. The photo may be blurry, too dark, or the plant may not be in our database. Please try again with a clearer photo.');
          setUploadedImage(null); // Clear the image to allow retry
        } else {
          setError('');
          // Navigate to the full-page result with the image URL
          navigate('/scan-result', { 
            state: { 
              result: response.data, 
              uploadedImage: imagePreviewUrl 
            } 
          });
        }
      } else {
        const errorMsg = response.data?.error || response.data?.message || 'Failed to analyze image';
        setError(errorMsg);
        console.log('[DEBUG] Error:', response.data);
      }
    } catch (err) {
      console.error('[DEBUG] Classification error:', err);
      console.error('[DEBUG] Error response:', err.response?.data);
      setError(err.response?.data?.error || 'Failed to classify image. Please try again.');
    }
  };

  return (
    <div className="scan-page">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Plant Scanner
          </h1>
          <p className="text-gray-600">
            Use your camera or upload an image to identify medicinal plants
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📷</span>
              <h3 className="text-orange-800 font-semibold text-lg">Photo Not Clear Enough</h3>
            </div>
            <p className="text-orange-700 ml-9 mb-3">{error}</p>
            <div className="ml-9 bg-white/70 rounded-lg p-3 text-sm">
              <p className="font-semibold text-orange-800 mb-2">💡 Try these tips:</p>
              <ul className="text-orange-700 space-y-1 list-disc list-inside">
                <li>Move closer so the leaf fills most of the frame</li>
                <li>Hold the camera steady to avoid blur</li>
                <li>Use natural daylight (avoid shade or shadows)</li>
                <li>Focus on a single leaf, not the whole plant</li>
                <li>Make sure the leaf details (veins, edges) are visible</li>
              </ul>
            </div>
          </div>
        )}

        {/* Scanner Component */}
        <Scanner
          onScanComplete={handleScanComplete}
          onImageUpload={handleImageUpload}
          isAnalyzing={isAnalyzing}
        />



        {/* Instructions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-shadow p-6 bg-gradient-to-br from-green-50 to-emerald-50">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📸</span> Photo Tips for Best Results
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                <span className="text-xl">☀️</span>
                <div>
                  <strong className="text-gray-800 block">Good Lighting</strong>
                  <span className="text-sm">Use natural daylight, avoid harsh shadows</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                <span className="text-xl">🎯</span>
                <div>
                  <strong className="text-gray-800 block">Fill the Frame</strong>
                  <span className="text-sm">Make the leaf take up 50%+ of the image</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                <span className="text-xl">🔍</span>
                <div>
                  <strong className="text-gray-800 block">Show Details</strong>
                  <span className="text-sm">Capture leaf veins, edges, and stem clearly</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                <span className="text-xl">🌿</span>
                <div>
                  <strong className="text-gray-800 block">Single Leaf</strong>
                  <span className="text-sm">Focus on one leaf, avoid cluttered backgrounds</span>
                </div>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800">
                <strong>💡 Pro Tip:</strong> Our AI is trained on 7,900+ images with 98.6% accuracy. 
                If unsure, it will show you the top 3 possibilities!
              </p>
            </div>
          </div>

          <div className="card-shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Supported Plants</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-600">• Lagundi</span>
              <span className="text-gray-600">• Sambong</span>
              <span className="text-gray-600">• Tsaang Gubat</span>
              <span className="text-gray-600">• Ampalaya</span>
              <span className="text-gray-600">• Bawang</span>
              <span className="text-gray-600">• Bayabas</span>
              <span className="text-gray-600">• Niyog-niyogan</span>
              <span className="text-gray-600">• Yerba Buena</span>
              <span className="text-gray-600">• Akapulko</span>
              <span className="text-gray-600">• Ulasimang Bato</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
