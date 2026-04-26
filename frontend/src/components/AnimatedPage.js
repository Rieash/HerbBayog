import React, { useEffect } from 'react';
import { useScrollAnimation, useParallax, useTilt } from '../hooks/useScrollAnimation';
import './AnimatedPage.css';

// Wrap any component with animations
export const AnimatedSection = ({ 
  children, 
  animation = 'reveal', 
  delay = 0,
  className = '' 
}) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <div 
      ref={ref} 
      className={`${animation} ${isVisible ? 'active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Card with 3D tilt effect
export const TiltCard = ({ children, className = '' }) => {
  const [ref, tilt] = useTilt(10);

  return (
    <div 
      ref={ref}
      className={`tilt-card ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
    >
      {children}
    </div>
  );
};

// Parallax wrapper
export const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const [ref, offset] = useParallax(speed);

  return (
    <div 
      ref={ref}
      className={`parallax-section ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
};

// Floating animation wrapper
export const FloatingElement = ({ 
  children, 
  animation = 'float-gentle',
  delay = 0,
  className = '' 
}) => {
  return (
    <div 
      className={`${animation} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

// Stagger container for list animations
export const StaggerContainer = ({ children, className = '' }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div 
      ref={ref}
      className={`stagger-children ${isVisible ? 'active' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// Pulse animation wrapper
export const PulseElement = ({ children, className = '' }) => {
  return (
    <div className={`pulse ${className}`}>
      {children}
    </div>
  );
};

// Glow hover effect wrapper
export const GlowWrapper = ({ children, className = '' }) => {
  return (
    <div className={`hover-glow ${className}`}>
      {children}
    </div>
  );
};

// Magnetic button wrapper
export const MagneticButton = ({ children, className = '' }) => {
  return (
    <button className={`magnetic-btn ripple btn-fancy ${className}`}>
      {children}
    </button>
  );
};

// Animated underline text
export const UnderlineText = ({ children, className = '' }) => {
  return (
    <span className={`underline-hover ${className}`}>
      {children}
    </span>
  );
};

// 3D flip card
export const FlipCard = ({ front, back, className = '' }) => {
  return (
    <div className={`card-3d ${className}`}>
      <div className="card-3d-inner">
        <div className="card-3d-front">
          {front}
        </div>
        <div className="card-3d-back">
          {back}
        </div>
      </div>
    </div>
  );
};

// Background particles
export const ParticleBackground = ({ count = 20 }) => {
  useEffect(() => {
    // Particles are rendered via CSS
  }, []);

  return (
    <div className="particle-background">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
            fontSize: `${0.8 + Math.random() * 1.5}rem`
          }}
        >
          {['🍃', '🌿', '🍀', '🌱', '🌾'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  );
};

// Main page wrapper with all effects
const AnimatedPage = ({ children, withParticles = true }) => {
  return (
    <div className="animated-page">
      {withParticles && <ParticleBackground count={15} />}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default AnimatedPage;
