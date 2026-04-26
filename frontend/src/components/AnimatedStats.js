import React, { useState, useEffect, useRef } from 'react';
import { Camera, Leaf, Users, Award } from 'lucide-react';
import './AnimatedStats.css';

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      icon: <Camera size={32} />,
      value: 7900,
      suffix: '+',
      label: 'Training Images',
      description: 'High-quality photos from Calbayog'
    },
    {
      icon: <Leaf size={32} />,
      value: 40,
      suffix: '',
      label: 'Medicinal Plants',
      description: 'Traditional Philippine herbs'
    },
    {
      icon: <Award size={32} />,
      value: 98,
      suffix: '%',
      label: 'AI Accuracy',
      description: 'DenseNet121 trained model'
    },
    {
      icon: <Users size={32} />,
      value: 1000,
      suffix: '+',
      label: 'Community Users',
      description: 'Growing herbal community'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="animated-stats-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`stat-box ${isVisible ? 'animate-in' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="stat-icon-wrapper">
              {stat.icon}
              <div className="stat-pulse"></div>
            </div>
            <div className="stat-value-wrapper">
              <Counter 
                end={stat.value} 
                suffix={stat.suffix} 
                isVisible={isVisible} 
              />
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-description">{stat.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Counter = ({ end, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end]);

  return (
    <span className="counter-value">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedStats;
