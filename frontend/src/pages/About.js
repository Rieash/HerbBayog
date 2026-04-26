import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Camera, BookOpen, Heart, Shield, Users, Globe, Mail, MapPin, Sparkles, Zap, Award, Brain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

// Animated counter hook
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTime = null;
            const animate = (currentTime) => {
              if (!startTime) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / duration, 1);
              setCount(Math.floor(progress * (end - start) + start));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, start]);

  return { count, ref: countRef };
};

const StatCard = ({ number, label, suffix = '' }) => {
  const numericValue = parseInt(number.replace(/[^0-9]/g, ''));
  const { count, ref } = useCountUp(numericValue, 2000);

  return (
    <div className="stat-card-enhanced" ref={ref}>
      <div className="stat-glow"></div>
      <span className="stat-number-enhanced">
        {count}{suffix}
      </span>
      <span className="stat-label-enhanced">{label}</span>
    </div>
  );
};

const About = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const techStack = [
    { name: 'DenseNet121', role: 'AI Model Architecture', icon: '🧠', desc: 'Deep neural network for image classification' },
    { name: 'PlantNet API', role: 'Species Verification', icon: '🔍', desc: 'Cross-reference with global plant database' },
    { name: 'React + Django', role: 'Full-Stack Platform', icon: '⚡', desc: 'Fast, responsive web application' },
    { name: '7,900+ Images', role: 'Training Dataset', icon: '📊', desc: 'Curated dataset of medicinal plants' },
  ];

  const milestones = [
    { year: '2022', title: 'Project Inception', desc: 'HerbBayog started as a thesis project' },
    { year: '2023', title: 'AI Model Training', desc: 'Trained on 7,900+ plant images' },
    { year: '2024', title: 'Public Launch', desc: 'Released to help communities identify herbs' },
    { year: 'Future', title: 'Growing Database', desc: 'Expanding to 200+ plant species' },
  ];

  const dohPlants = [
    { name: 'Lagundi', image: '/images/plants/lagundi.jpg', use: 'Cough & Asthma' },
    { name: 'Sambong', image: '/images/plants/sambong.jpg', use: 'Kidney Health' },
    { name: 'Bayabas', image: '/images/plants/bayabas.jpg', use: 'Wounds & Diarrhea' },
    { name: 'Ampalaya', image: '/images/plants/Ampalaya.jpg', use: 'Diabetes' },
    { name: 'Malunggay', image: '/images/plants/malunggay.jpg', use: 'Nutrition' },
    { name: 'Yerba Buena', image: '/images/plants/yerba-buena.jpg', use: 'Pain Relief' },
    { name: 'Bawang', image: '/images/plants/bawang.jpg', use: 'Heart Health' },
    { name: 'Akapulko', image: '/images/plants/Akapulko.jpg', use: 'Skin Diseases' },
    { name: 'Tsaang Gubat', image: '/images/plants/tsaang-gubat.jpg', use: 'Digestive' },
    { name: 'Tawa-tawa', image: '/images/plants/tawa-tawa.jpg', use: 'Fever & Dengue' },
  ];

  return (
    <div className="about-page">
      {/* Hero Section - Enhanced */}
      <section className="about-hero-enhanced">
        <div className="hero-particles">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="floating-leaf" style={{ animationDelay: `${i * 0.5}s` }}>
              {['🍃', '🌿', '🌱', '🍀'][i % 4]}
            </span>
          ))}
        </div>
        <div className="about-hero-content-enhanced">
          <div className="hero-badge">
            <Sparkles size={18} />
            <span>{t('about.hero.badge')}</span>
          </div>
          <h1 className="about-hero-title-enhanced text-2xl md:text-3xl lg:text-4xl">
            {t('about.hero.title')}
          </h1>
          <p className="about-hero-subtitle-enhanced text-sm md:text-base lg:text-lg">
            {t('about.hero.subtitle')}
          </p>
          <div className="hero-stats-row flex flex-wrap gap-2 md:gap-4">
            <div className="hero-stat text-xs md:text-sm">
              <span className="hero-stat-icon">🇵🇭</span>
              <span>{t('about.hero.heritage')}</span>
            </div>
            <div className="hero-stat text-xs md:text-sm">
              <span className="hero-stat-icon">🤖</span>
              <span>{t('about.hero.ai')}</span>
            </div>
            <div className="hero-stat text-xs md:text-sm">
              <span className="hero-stat-icon">🏥</span>
              <span>{t('about.hero.doh')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Enhanced Cards */}
      <section id="mission" className={`reveal-section about-section-enhanced ${visibleSections.mission ? 'visible' : ''}`}>
        <div className="about-container-enhanced">
          <div className="section-header-enhanced">
            <span className="section-tag">Our Purpose</span>
            <h2 className="section-title-enhanced">Why HerbBayog Exists</h2>
            <p className="section-subtitle">Three pillars that drive everything we do</p>
          </div>

          <div className="mission-grid-enhanced grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="mission-card">
              <div className="mission-card-glow"></div>
              <div className="mission-icon-wrapper">
                <Heart className="mission-icon" />
              </div>
              <h3 className="text-base md:text-lg">{t('about.mission.preserve.title')}</h3>
              <p className="text-sm md:text-base">
                {t('about.mission.preserve.description')}
              </p>
              <div className="mission-tags">
                <span className="mission-tag text-xs">Cultural</span>
                <span className="mission-tag text-xs">Heritage</span>
              </div>
            </div>

            <div className="mission-card featured">
              <div className="mission-card-glow"></div>
              <div className="mission-icon-wrapper">
                <Brain className="mission-icon" />
              </div>
              <h3 className="text-base md:text-lg">{t('about.mission.innovation.title')}</h3>
              <p className="text-sm md:text-base">
                {t('about.mission.innovation.description')}
              </p>
              <div className="mission-tags">
                <span className="mission-tag text-xs">Technology</span>
                <span className="mission-tag text-xs">Accuracy</span>
              </div>
            </div>

            <div className="mission-card">
              <div className="mission-card-glow"></div>
              <div className="mission-icon-wrapper">
                <Shield className="mission-icon" />
              </div>
              <h3 className="text-base md:text-lg">{t('about.mission.safety.title')}</h3>
              <p className="text-sm md:text-base">
                {t('about.mission.safety.description')}
              </p>
              <div className="mission-tags">
                <span className="mission-tag">Safety</span>
                <span className="mission-tag">DOH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className={`reveal-section about-section-timeline ${visibleSections.timeline ? 'visible' : ''}`}>
        <div className="about-container-enhanced">
          <div className="section-header-enhanced">
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title-enhanced">The HerbBayog Story</h2>
            <p className="section-subtitle">From idea to impact</p>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <span className="timeline-year">{milestone.year}</span>
                  <h4>{milestone.title}</h4>
                  <p>{milestone.desc}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Animated */}
      <section id="stats" className={`reveal-section about-section-stats ${visibleSections.stats ? 'visible' : ''}`}>
        <div className="about-container-enhanced">
          <div className="stats-grid">
            <StatCard number="10" label="DOH-Approved Plants" />
            <StatCard number="112" label="Total Plants in Database" />
            <StatCard number="7900" label="Training Images" suffix="+" />
            <StatCard number="98" label="AI Accuracy Rate" suffix="%" />
          </div>
        </div>
      </section>

      {/* DOH Plants Gallery */}
      <section id="plants" className={`reveal-section about-section-plants ${visibleSections.plants ? 'visible' : ''}`}>
        <div className="about-container-enhanced">
          <div className="section-header-enhanced">
            <span className="section-tag">Officially Recognized</span>
            <h2 className="section-title-enhanced">DOH-Approved Medicinal Plants</h2>
            <p className="section-subtitle">10 plants scientifically proven safe and effective</p>
          </div>

          <div className="plants-gallery">
            {dohPlants.map((plant, index) => (
              <div key={index} className="plant-card-enhanced">
                <div className="plant-image-wrapper">
                  <img src={plant.image} alt={plant.name} className="plant-image" />
                  <div className="plant-overlay">
                    <span className="plant-use">{plant.use}</span>
                  </div>
                </div>
                <div className="plant-info">
                  <h4>{plant.name}</h4>
                  <div className="plant-badge">
                    <Award size={14} />
                    <span>DOH Approved</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`reveal-section about-section-alt-enhanced ${visibleSections.features ? 'visible' : ''}`}>
        <div className="about-container-enhanced">
          <div className="section-header-enhanced">
            <span className="section-tag">Capabilities</span>
            <h2 className="section-title-enhanced">What You Can Do</h2>
          </div>

          <div className="features-grid-enhanced">
            <div className="feature-card-enhanced">
              <div className="feature-icon-bg">
                <Camera className="feature-icon-enhanced" />
              </div>
              <h4>Instant Plant ID</h4>
              <p>Snap a photo and our AI identifies the plant in seconds with confidence scores.</p>
              <div className="feature-highlight">
                <Zap size={16} />
                <span>Works offline</span>
              </div>
            </div>

            <div className="feature-card-enhanced">
              <div className="feature-icon-bg">
                <BookOpen className="feature-icon-enhanced" />
              </div>
              <h4>Herbal Encyclopedia</h4>
              <p>Detailed profiles with medicinal uses, preparation methods, and safety info.</p>
              <div className="feature-highlight">
                <span>112+ plants</span>
              </div>
            </div>

            <div className="feature-card-enhanced">
              <div className="feature-icon-bg">
                <Leaf className="feature-icon-enhanced" />
              </div>
              <h4>Traditional Remedies</h4>
              <p>Learn authentic Filipino preparation methods passed down through generations.</p>
              <div className="feature-highlight">
                <span>Cultural heritage</span>
              </div>
            </div>

            <div className="feature-card-enhanced">
              <div className="feature-icon-bg">
                <Users className="feature-icon-enhanced" />
              </div>
              <h4>Community Learning</h4>
              <p>Join a growing community of herbal enthusiasts sharing discoveries and tips.</p>
              <div className="feature-highlight">
                <span>Free forever</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech" className={`reveal-section about-section-team ${visibleSections.tech ? 'visible' : ''}`}>
        <div className="about-container-enhanced">
          <div className="section-header-enhanced">
            <span className="section-tag">The Technology</span>
            <h2 className="section-title-enhanced">Powered By</h2>
            <p className="section-subtitle">Cutting-edge tools and technologies behind HerbBayog</p>
          </div>

          <div className="team-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{tech.icon}</div>
                <h4>{tech.name}</h4>
                <span className="team-role">{tech.role}</span>
                <p className="tech-desc">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & CTA Section */}
      <section id="contact" className={`reveal-section about-section-cta-enhanced ${visibleSections.contact ? 'visible' : ''}`}>
        <div className="about-container-enhanced">
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>Have questions about herbal medicine or want to contribute to our database?</p>
              
              <div className="contact-items">
                <div className="contact-item-enhanced">
                  <div className="contact-icon-wrapper">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="contact-label">Email</span>
                    <span>contact@herbbayog.com</span>
                  </div>
                </div>
                <div className="contact-item-enhanced">
                  <div className="contact-icon-wrapper">
                    <Globe size={20} />
                  </div>
                  <div>
                    <span className="contact-label">Website</span>
                    <span>www.herbbayog.com</span>
                  </div>
                </div>
                <div className="contact-item-enhanced">
                  <div className="contact-icon-wrapper">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="contact-label">Location</span>
                    <span>Calbayog City, Samar, Philippines</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cta-box">
              <div className="cta-badge">
                <Sparkles size={16} />
                <span>Start Your Journey</span>
              </div>
              <h3>Ready to Explore Herbal Medicine?</h3>
              <p>Identify plants, learn remedies, and join our community of herbal enthusiasts.</p>
              <Link to="/scan" className="cta-button-enhanced">
                <Camera size={20} />
                <span>Start Scanning</span>
              </Link>
              <span className="cta-note">100% Free • No Registration Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer-enhanced">
        <div className="footer-content">
          <div className="footer-brand">
            <Leaf className="footer-logo" />
            <span>HerbBayog</span>
          </div>
          <p>© 2024 HerbBayog. Preserving Filipino herbal wisdom for future generations.</p>
          <div className="footer-tagline">
            <span>Made with 💚 in Calbayog, Philippines</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
