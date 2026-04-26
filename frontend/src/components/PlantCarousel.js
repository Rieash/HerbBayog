import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';
import './PlantCarousel.css';

const PlantCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const intervalRef = useRef(null);

  const featuredPlants = [
    {
      id: 1,
      name: 'Lagundi',
      scientific: 'Vitex negundo',
      tagline: 'The Cough Remedy',
      description: 'A shrub with five-leaflet leaves, commonly used for respiratory ailments.',
      uses: ['Cough & Cold', 'Asthma Relief', 'Fever Reducer'],
      color: '#2D5016',
      image: '/images/plants/lagundi.jpg',
      fact: 'Lagundi is one of the most studied Philippine medicinal plants with proven bronchodilator properties.'
    },
    {
      id: 2,
      name: 'Sambong',
      scientific: 'Blumea balsamifera',
      tagline: 'Kidney Health Guardian',
      description: 'A weed with strong aromatic leaves, used for urinary stones and hypertension.',
      uses: ['Kidney Stones', 'Hypertension', 'Anti-inflammatory'],
      color: '#4A7C23',
      image: '/images/plants/sambong.jpg',
      fact: 'Sambong is listed in the Philippine Pharmacopoeia as a diuretic medicine.'
    },
    {
      id: 3,
      name: 'Bayabas',
      scientific: 'Psidium guajava',
      tagline: 'Nature\'s Antiseptic',
      description: 'Guava leaves have powerful antiseptic and anti-diarrheal properties.',
      uses: ['Wound Healing', 'Diarrhea Treatment', 'Toothache Relief'],
      color: '#7CB342',
      image: '/images/plants/bayabas.jpg',
      fact: 'Bayabas leaves contain quercetin with strong antimicrobial activity.'
    },
    {
      id: 4,
      name: 'Akapulko',
      scientific: 'Senna alata',
      tagline: 'Ringworm Fighter',
      description: 'Known as ringworm bush, its leaves treat fungal skin infections.',
      uses: ['Ringworm Treatment', 'Fungal Infections', 'Skin Diseases'],
      color: '#33691E',
      image: '/images/plants/Akapulko.jpg',
      fact: 'Akapulko contains chrysophanic acid, a natural antifungal compound.'
    },
    {
      id: 5,
      name: 'Ampalaya',
      scientific: 'Momordica charantia',
      tagline: 'Blood Sugar Regulator',
      description: 'Bitter melon helps regulate blood sugar and boosts immunity.',
      uses: ['Diabetes Management', 'Blood Sugar Control', 'Immunity Boost'],
      color: '#558B2F',
      image: '/images/plants/Ampalaya.jpg',
      fact: 'Ampalaya contains charantin, which has blood glucose-lowering effects.'
    },
    {
      id: 6,
      name: 'Tsaang Gubat',
      scientific: 'Ehretia microphylla',
      tagline: 'Digestive Protector',
      description: 'Wild tea used for treating diarrhea, stomach aches, and skin allergies.',
      uses: ['Diarrhea Relief', 'Stomach Ache', 'Skin Allergies'],
      color: '#689F38',
      image: '/images/plants/tsaang-gubat.jpg',
      fact: 'Tsaang Gubat is approved by the Philippine Department of Health for treating diarrhea.'
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredPlants.length);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, featuredPlants.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % featuredPlants.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + featuredPlants.length) % featuredPlants.length);
  };

  return (
    <div className="plant-carousel-section">
      <div className="carousel-header">
        <span className="carousel-tag">Featured Herbs</span>
        <h2 className="carousel-title">Discover Healing Plants</h2>
        <p className="carousel-subtitle">
          Swipe to explore the medicinal wonders of Philippine flora
        </p>
      </div>

      <div className="carousel-container">
        <button className="carousel-nav prev" onClick={prevSlide}>
          <ChevronLeft />
        </button>

        <div className="carousel-track">
          {featuredPlants.map((plant, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;
            
            return (
              <div
                key={plant.id}
                className={`carousel-card ${isActive ? 'active' : ''} ${offset === 1 ? 'next' : ''} ${offset === -1 ? 'prev' : ''}`}
                style={{
                  transform: `translateX(${offset * 110}%) scale(${isActive ? 1 : 0.85})`,
                  opacity: Math.abs(offset) > 1 ? 0 : 1,
                  zIndex: isActive ? 10 : 5 - Math.abs(offset)
                }}
                onMouseEnter={() => setHoveredCard(plant.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className="card-glow"
                  style={{ 
                    background: `radial-gradient(circle at 50% 0%, ${plant.color}40, transparent 70%)` 
                  }}
                />
                
                <div className="card-content">
                  <div 
                    className="plant-image-container"
                    style={{ 
                      transform: hoveredCard === plant.id ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="plant-card-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="plant-emoji-fallback"
                      style={{ display: 'none' }}
                    >
                      🌿
                    </div>
                  </div>
                  
                  <h3 className="plant-name-card">{plant.name}</h3>
                  <p className="plant-scientific-card">{plant.scientific}</p>
                  <span 
                    className="plant-tagline"
                    style={{ color: plant.color }}
                  >
                    {plant.tagline}
                  </span>
                  
                  <p className="plant-description">{plant.description}</p>
                  
                  <div className="uses-tags">
                    {plant.uses.map((use, idx) => (
                      <span 
                        key={idx} 
                        className="use-tag"
                        style={{ 
                          backgroundColor: `${plant.color}20`,
                          color: plant.color,
                          animationDelay: `${idx * 0.1}s`
                        }}
                      >
                        <Leaf size={12} />
                        {use}
                      </span>
                    ))}
                  </div>
                  
                  <div className={`fact-box ${hoveredCard === plant.id ? 'show' : ''}`}>
                    <span className="fact-label">Did you know?</span>
                    <p>{plant.fact}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="carousel-nav next" onClick={nextSlide}>
          <ChevronRight />
        </button>
      </div>

      <div className="carousel-dots">
        {featuredPlants.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <div className="carousel-progress">
        <div 
          className="progress-bar"
          style={{ 
            width: `${((currentIndex + 1) / featuredPlants.length) * 100}%`,
            backgroundColor: featuredPlants[currentIndex].color
          }}
        />
      </div>
    </div>
  );
};

export default PlantCarousel;
