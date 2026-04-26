import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'Maria Santos',
      role: 'Herbalist',
      location: 'Calbayog City',
      quote: 'HerbBayog helped me identify Lagundi quickly. The AI accuracy is impressive! Now I can verify plants before preparing traditional remedies.',
      rating: 5,
      avatar: '👩‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Jose Cruz',
      role: 'Traditional Healer',
      location: 'Samar Province',
      quote: 'As a herbolario for 30 years, this app validates our traditional knowledge with modern science. My patients trust it more now.',
      rating: 5,
      avatar: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Ana Reyes',
      role: 'Wellness Enthusiast',
      location: 'Cebu City',
      quote: 'I love how easy it is to scan plants and get detailed medicinal information. The preparation guides are so helpful!',
      rating: 5,
      avatar: '💚'
    },
    {
      id: 4,
      name: 'Ramon Garcia',
      role: 'Agriculture Student',
      location: 'UP Los Baños',
      quote: 'Perfect for my ethnobotany research! The cultural relevance section preserves knowledge that might otherwise be lost.',
      rating: 5,
      avatar: '📚'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="testimonials-tag">Community Stories</span>
          <h2 className="testimonials-title">What People Say</h2>
          <p className="testimonials-subtitle">
            Hear from healers, researchers, and wellness enthusiasts using HerbBayog
          </p>
        </div>

        <div className="testimonials-slider">
          <button className="slider-nav prev" onClick={goToPrev}>
            <ChevronLeft size={24} />
          </button>

          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${
                  index === activeIndex ? 'active' : 
                  index === (activeIndex + 1) % testimonials.length ? 'next' : 
                  index === (activeIndex - 1 + testimonials.length) % testimonials.length ? 'prev' : ''
                }`}
                style={{
                  transform: `translateX(${(index - activeIndex) * 100}%) scale(${index === activeIndex ? 1 : 0.85})`,
                  opacity: index === activeIndex ? 1 : 0.5,
                  zIndex: index === activeIndex ? 10 : 1
                }}
              >
                <div className="quote-icon">
                  <Quote size={32} />
                </div>
                
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#FFB74D" color="#FFB74D" />
                  ))}
                </div>

                <p className="testimonial-quote">{testimonial.quote}</p>

                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <span className="author-name">{testimonial.name}</span>
                    <span className="author-role">{testimonial.role}</span>
                    <span className="author-location">{testimonial.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-nav next" onClick={goToNext}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                setIsAnimating(true);
                setActiveIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="testimonial-leaf leaf-1">🍃</div>
      <div className="testimonial-leaf leaf-2">🌿</div>
      <div className="testimonial-leaf leaf-3">🍀</div>
    </section>
  );
};

export default Testimonials;
