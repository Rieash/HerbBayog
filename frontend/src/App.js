import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Plants from './pages/Plants';
import PlantDetails from './pages/PlantDetails';
import Scan from './pages/Scan';
import ScanResultPage from './pages/ScanResultPage';
import About from './pages/About';
import LoadingScreen from './components/LoadingScreen';
import './App.css';
import './styles/global-animations.css';

// Navigation loading wrapper
function AppContent() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location);

  useEffect(() => {
    if (location !== prevLocation) {
      setIsNavigating(true);
      setPrevLocation(location);
      
      // Show loading for 800ms during navigation
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [location, prevLocation]);

  return (
    <>
      {isNavigating && (
        <LoadingScreen 
          message="Loading..." 
          type="navigation" 
          className="navigation-loading"
        />
      )}
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/plant/:id" element={<PlantDetails />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/scan-result" element={<ScanResultPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Router>
        <LoadingScreen message="Growing HerbBayog..." type="nature" />
      </Router>
    );
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
