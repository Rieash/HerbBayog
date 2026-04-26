import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Grid, List, Leaf, Heart, ArrowRight,
  Sparkles, BookOpen, Beaker, Shield, AlertCircle
} from 'lucide-react';
import AnimatedPage, { 
  AnimatedSection, StaggerContainer, TiltCard, FloatingElement 
} from '../components/AnimatedPage';
import { MiniLoader } from '../components/LoadingScreen';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import './Plants.css';

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 'all', label: 'All Plants', icon: '🌿', count: 10 },
    { id: 'respiratory', label: 'Respiratory', icon: '🫁', count: 3 },
    { id: 'digestive', label: 'Digestive', icon: '🍃', count: 5 },
    { id: 'pain', label: 'Pain Relief', icon: '💊', count: 1 },
    { id: 'diabetes', label: 'Diabetes', icon: '🩺', count: 1 },
    { id: 'kidney', label: 'Kidney/UTI', icon: '🏥', count: 1 },
    { id: 'skin', label: 'Skin Care', icon: '✨', count: 1 },
    { id: 'cardiovascular', label: 'Heart Health', icon: '❤️', count: 1 },
    { id: 'nutritional', label: 'Nutritional', icon: '🥗', count: 1 }
  ];

  useEffect(() => {
    fetchPlants();
    // Load favorites from localStorage
    const saved = localStorage.getItem('herbbayog_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let filtered = plants;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.medicinal_uses?.some(use => 
          use.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(plant => 
        plant.medicinal_uses?.some(use => 
          use.toLowerCase().includes(selectedCategory)
        )
      );
    }

    setFilteredPlants(filtered);
  }, [searchTerm, selectedCategory, plants]);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      // Fetch real plants from backend API
      const response = await axios.get(API_ENDPOINTS.PLANTS);
      const plantData = response.data.plants || response.data;
      
      // Filter for DOH-approved plants only
      const dohApprovedPlants = plantData.filter(plant => plant.doh_approved === true);
      
      // Transform backend data to frontend format
      const transformedPlants = dohApprovedPlants.map((plant, index) => ({
        id: plant.id || index + 1,
        name: plant.name,
        scientific_name: plant.scientific_name || '',
        image: plant.image_url || plant.image || '🌿',
        medicinal_uses: plant.medicinal_uses || plant.properties || [],
        description: plant.description || plant.medicinal_value || '',
        category: plant.category || 'general',
        featured: plant.featured || index < 6 // First 6 are featured
      }));
      
      setPlants(transformedPlants);
      setFilteredPlants(transformedPlants);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching plants:', err);
      setError('Failed to load plants. Please try again.');
      setLoading(false);
    }
  };

  const toggleFavorite = (plantId) => {
    const newFavorites = favorites.includes(plantId)
      ? favorites.filter(id => id !== plantId)
      : [...favorites, plantId];
    setFavorites(newFavorites);
    localStorage.setItem('herbbayog_favorites', JSON.stringify(newFavorites));
  };

  if (loading) {
    return (
      <div className="plants-loading">
        <MiniLoader size="large" />
        <p>Loading herbal library...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="plants-error">
        <AlertCircle size={48} />
        <p>{error}</p>
        <button onClick={fetchPlants}>Try Again</button>
      </div>
    );
  }

  return (
    <AnimatedPage withParticles={false}>
      {/* Hero Header */}
      <section className="plants-hero">
        <AnimatedSection animation="reveal">
          <div className="plants-hero-content">
            <FloatingElement animation="float-gentle" delay={0}>
              <span className="hero-badge">
                <Sparkles size={16} />
                Herbal Encyclopedia
              </span>
            </FloatingElement>
            
            <h1 className="plants-hero-title text-2xl md:text-3xl lg:text-4xl">
              Discover <span className="gradient-text">10 DOH-Approved</span>
              <br />Medicinal Plants
            </h1>
            
            <p className="plants-hero-subtitle text-sm md:text-base lg:text-lg">
              Explore our comprehensive library of DOH-approved traditional medicines. 
              Search by name, ailment, or category.
            </p>

            {/* Search Bar */}
            <div className="search-container-enhanced flex flex-col sm:flex-row gap-3">
              <div className="search-input-wrapper flex-1">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search plants, ailments, or remedies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input-enhanced text-sm md:text-base"
                />
                {searchTerm && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                  >
                    ×
                  </button>
                )}
              </div>
              
              <div className="view-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection animation="reveal" delay={200}>
          <div className="category-filter flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-pill text-xs md:text-sm ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
                <span className="cat-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Stats Bar */}
      <AnimatedSection animation="reveal">
        <div className="plants-stats-bar">
          <div className="stat-item-plants">
            <Leaf size={20} />
            <span>{filteredPlants.length} plants found</span>
          </div>
          <div className="stat-item-plants">
            <BookOpen size={20} />
            <span>10 DOH-approved plants</span>
          </div>
          <div className="stat-item-plants">
            <Shield size={20} />
            <span>DOH verified information</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Plants Grid */}
      <section className={`plants-grid-section ${viewMode}`}>
        {filteredPlants.length === 0 ? (
          <div className="no-results">
            <Leaf size={64} />
            <h3>No plants found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <StaggerContainer className={`plants-grid ${viewMode}`}>
            {filteredPlants.map(plant => (
              <TiltCard key={plant.id}>
                <div className={`plant-card-enhanced ${plant.featured ? 'featured' : ''}`}>
                  {plant.featured && (
                    <div className="featured-badge">
                      <Sparkles size={14} />
                      Featured
                    </div>
                  )}
                  
                  <button 
                    className={`favorite-btn ${favorites.includes(plant.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(plant.id);
                    }}
                  >
                    <Heart size={18} fill={favorites.includes(plant.id) ? 'currentColor' : 'none'} />
                  </button>

                  <Link to={`/plant/${plant.id}`} className="plant-card-link">
                    <div className="plant-emoji-display">
                      {plant.image && plant.image.startsWith('/') ? (
                        <img src={plant.image} alt={plant.name} className="plant-emoji" />
                      ) : (
                        <span className="plant-emoji">{plant.image || '🌿'}</span>
                      )}
                      <div className="plant-emoji-glow"></div>
                    </div>
                    
                    <div className="plant-card-content">
                      <h3 className="plant-name">{plant.name}</h3>
                      <p className="plant-scientific">{plant.scientific_name}</p>
                      <p className="plant-description">{plant.description}</p>
                      
                      <div className="plant-tags">
                        {plant.medicinal_uses.slice(0, 3).map((use, idx) => (
                          <span key={idx} className="plant-tag">{use}</span>
                        ))}
                      </div>
                      
                      <div className="learn-more-link">
                        <span>View Details</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </div>
              </TiltCard>
            ))}
          </StaggerContainer>
        )}
      </section>

      {/* Bottom CTA */}
      <AnimatedSection animation="reveal-scale">
        <section className="plants-cta-bottom">
          <div className="cta-content">
            <Beaker size={48} />
            <h2>Can't find what you're looking for?</h2>
            <p>Use our AI scanner to identify any Philippine medicinal plant instantly!</p>
            <Link to="/scan" className="btn-scan-now ripple">
              <Sparkles size={20} />
              Scan Plant Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default Plants;
