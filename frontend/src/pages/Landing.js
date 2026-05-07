import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Leaf, BookOpen, Sparkles, ChevronRight, Star, 
  Scan, Brain, Shield, ArrowRight, Play, Pause, Heart,
  Zap, Globe, Award, Users, ChevronDown
} from 'lucide-react';
import PlantCarousel from '../components/PlantCarousel';
import AnimatedStats from '../components/AnimatedStats';
import Testimonials from '../components/Testimonials';
import AnimatedPage, { 
  AnimatedSection, TiltCard, FloatingElement, 
  StaggerContainer, MagneticButton, UnderlineText 
} from '../components/AnimatedPage';
import { useLanguage } from '../contexts/LanguageContext';
import './LandingNew.css';

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate demo if playing
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveDemo((prev) => (prev + 1) % 3);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const features = [
    {
      icon: <Scan className="feature-icon" />,
      title: t('landing.features.instant.title'),
      description: t('landing.features.instant.description'),
      color: '#2D5016',
      stat: t('landing.features.instant.stat'),
      statLabel: t('landing.features.instant.statLabel')
    },
    {
      icon: <Brain className="feature-icon" />,
      title: t('landing.features.ai.title'),
      description: t('landing.features.ai.description'),
      color: '#4A7C23',
      stat: t('landing.features.ai.stat'),
      statLabel: t('landing.features.ai.statLabel')
    },
    {
      icon: <BookOpen className="feature-icon" />,
      title: t('landing.features.wisdom.title'),
      description: t('landing.features.wisdom.description'),
      color: '#7CB342',
      stat: t('landing.features.wisdom.stat'),
      statLabel: t('landing.features.wisdom.statLabel')
    },
    {
      icon: <Shield className="feature-icon" />,
      title: t('landing.features.trusted.title'),
      description: t('landing.features.trusted.description'),
      color: '#558B2F',
      stat: t('landing.features.trusted.stat'),
      statLabel: t('landing.features.trusted.statLabel')
    }
  ];

  const demoSteps = [
    { 
      title: 'Point Your Camera', 
      desc: 'Aim at any plant leaf, flower, or stem',
      emoji: '📷',
      action: 'Capture'
    },
    { 
      title: 'AI Analysis', 
      desc: 'Our AI identifies the plant species',
      emoji: '🧠',
      action: 'Processing'
    },
    { 
      title: 'Get Results', 
      desc: 'Learn about medicinal uses instantly',
      emoji: '🌿',
      action: 'Discover'
    }
  ];

  // Animated demo state
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % demoSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const highlights = [
    { icon: <Zap />, text: t('landing.hero.highlights.accuracy') },
    { icon: <Award />, text: t('landing.hero.highlights.doh') },
    { icon: <Users />, text: t('landing.hero.highlights.free') }
  ];

  return (
    <AnimatedPage withParticles={true}>
      {/* Hero Section - Complete Makeover */}
      <section className="hero-section-enhanced">
        <AnimatedSection animation="reveal" className="hero-content-enhanced">
          <FloatingElement animation="float-gentle" delay={0}>
            <div className="hero-badge-enhanced">
              <Sparkles className="badge-icon" />
              <span>{t('landing.hero.badge')}</span>
            </div>
          </FloatingElement>
          
          <h1 className="hero-title-enhanced">
            <span className="title-line">Your Pocket</span>
            <span className="title-line highlight">
              <UnderlineText>Herbal Expert</UnderlineText>
            </span>
            <span className="title-line">in Calbayog</span>
          </h1>
          
          <p className="hero-subtitle-enhanced">
            {t('landing.hero.subtitle')}
          </p>
          
          <div className="hero-highlights">
            {highlights.map((item, idx) => (
              <div key={idx} className="highlight-pill">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          
          <div className="hero-cta-enhanced">
            <Link to="/scan" className="btn-primary-enhanced ripple">
              <Camera className="btn-icon" />
              <span>{t('landing.hero.cta.primary')}</span>
              <ArrowRight className="btn-arrow" />
            </Link>
            <a href="#how-it-works" className="btn-secondary-enhanced">
              <Play size={18} />
              <span>{t('landing.hero.cta.secondary')}</span>
            </a>
          </div>

          {/* Live Stats Ticker */}
          <div className="stats-ticker">
            <div className="ticker-content">
              <span className="ticker-item">🌿 {t('landing.hero.stats.images')}</span>
              <span className="ticker-separator">•</span>
              <span className="ticker-item">🎯 {t('landing.hero.stats.accuracy')}</span>
              <span className="ticker-separator">•</span>
              <span className="ticker-item">🏥 {t('landing.hero.stats.plants')}</span>
              <span className="ticker-separator">•</span>
              <span className="ticker-item">📍 {t('landing.hero.stats.location')}</span>
              <span className="ticker-separator">•</span>
              <span className="ticker-item">🧠 {t('landing.hero.stats.ai')}</span>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* How It Works - Animated Instructions + Phone Design */}
      <section id="how-it-works" className="web-demo-section">
        <div className="web-demo-container">
          <AnimatedSection animation="reveal">
            <div className="web-demo-header">
              <span className="web-demo-tag">🚀 How It Works</span>
              <h2 className="web-demo-title">Simple. Fast. Accurate.</h2>
              <p className="web-demo-subtitle">
                Our AI-powered scanner makes plant identification effortless
              </p>
            </div>
          </AnimatedSection>

          <div className="demo-layout">
            {/* Left: Animated Steps */}
            <div className="animated-steps">
              {demoSteps.map((step, idx) => (
                <AnimatedSection 
                  key={idx}
                  animation="fade-right" 
                  delay={idx * 200}
                >
                  <div className={`animated-step ${activeStep === idx ? 'active' : ''}`}>
                    <div className="step-progress-bar">
                      <div 
                        className="step-progress-fill"
                        style={{ width: activeStep === idx ? '100%' : '0%' }}
                      />
                    </div>
                    <div className="step-content">
                      <div className="step-number">{idx + 1}</div>
                      <div className="step-details">
                        <div className="step-header">
                          <span className="step-emoji">{step.emoji}</span>
                          <h4>{step.title}</h4>
                          <span className={`step-action ${activeStep === idx ? 'show' : ''}`}>
                            {step.action}
                          </span>
                        </div>
                        <p className="step-desc">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Right: Phone Design Mockup */}
            <AnimatedSection animation="fade-left" delay={400}>
              <TiltCard className="phone-mockup-container">
                <div className="phone-frame">
                  <div className="phone-notch"></div>
                  <div className="phone-screen">
                    {/* Header */}
                    <div className="app-header">
                      <Leaf size={20} />
                      <span>HerbBayog</span>
                      <div className="header-dots">
                        <span className="h-dot red"></span>
                        <span className="h-dot yellow"></span>
                        <span className="h-dot green"></span>
                      </div>
                    </div>
                    
                    {/* Screen Content - Shows based on active step */}
                    <div className="app-content">
                      {activeStep === 0 && (
                        <div className="screen-capture animate-fade">
                          <div className="camera-view">
                            <div className="camera-grid"></div>
                            <div className="focus-frame"></div>
                            <div className="capture-hint">
                              <Camera size={16} />
                              <span>Tap to capture</span>
                            </div>
                          </div>
                          <div className="capture-btn"></div>
                        </div>
                      )}
                      
                      {activeStep === 1 && (
                        <div className="screen-analyzing animate-fade">
                          <div className="scanning-image">
                            <div className="scan-line"></div>
                            <div className="scan-particles">
                              <span></span><span></span><span></span>
                            </div>
                          </div>
                          <div className="analyzing-text">
                            <Brain size={20} className="pulse" />
                            <span>Analyzing...</span>
                          </div>
                          <div className="progress-dots">
                            <span className="dot active"></span>
                            <span className="dot active"></span>
                            <span className="dot"></span>
                          </div>
                        </div>
                      )}
                      
                      {activeStep === 2 && (
                        <div className="screen-result animate-fade">
                          <div className="result-badge">✓ Identified</div>
                          <div className="plant-icon">🌿</div>
                          <h5 className="plant-name">Malunggay</h5>
                          <p className="plant-scientific">Moringa oleifera</p>
                          <div className="confidence-bar">
                            <div className="confidence-fill"></div>
                          </div>
                          <span className="confidence-text">98% Match</span>
                          <div className="uses-preview">
                            <span className="mini-tag">Immunity</span>
                            <span className="mini-tag">+2 more</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Bottom Nav */}
                    <div className="app-nav">
                      <div className={`nav-item ${activeStep === 0 ? 'active' : ''}`}>
                        <Scan size={18} />
                      </div>
                      <div className={`nav-item ${activeStep === 1 ? 'active' : ''}`}>
                        <Brain size={18} />
                      </div>
                      <div className={`nav-item ${activeStep === 2 ? 'active' : ''}`}>
                        <BookOpen size={18} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <FloatingElement animation="float-bob" delay={0} className="stat-float float-1">
                  <span>⚡ Instant</span>
                </FloatingElement>
                <FloatingElement animation="float-bob" delay={0.5} className="stat-float float-2">
                  <span>🎯 98.6% Accurate</span>
                </FloatingElement>
                <FloatingElement animation="float-bob" delay={1} className="stat-float float-3">
                  <span>🌿 40 Plants</span>
                </FloatingElement>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with Tilt Cards */}
      <section className="features-section-enhanced">
        <AnimatedSection animation="reveal">
          <div className="section-header-enhanced">
            <span className="section-tag-enhanced">✨ Why Choose Us</span>
            <h2 className="section-title-enhanced">
              Everything You Need to
              <span className="gradient-text"> Master Herbal Medicine</span>
            </h2>
            <p className="section-subtitle-enhanced">
              Built for herbalists, students, researchers, and anyone passionate 
              about traditional Filipino healing
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="features-grid-enhanced grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <TiltCard key={index}>
              <div 
                className="feature-card-enhanced"
                style={{ '--feature-color': feature.color }}
              >
                <div className="feature-glow"></div>
                <div className="feature-icon-wrapper-enhanced" style={{ backgroundColor: `${feature.color}15` }}>
                  {feature.icon}
                </div>
                <div className="feature-stat-badge">
                  <span className="stat-number-card">{feature.stat}</span>
                  <span className="stat-label-card">{feature.statLabel}</span>
                </div>
                <h3 className="feature-title-enhanced">{feature.title}</h3>
                <p className="feature-description-enhanced">{feature.description}</p>
                <div className="feature-hover-reveal">
                  <span className="learn-more">Learn more <ArrowRight size={16} /></span>
                </div>
              </div>
            </TiltCard>
          ))}
        </StaggerContainer>
      </section>

      {/* Interactive Plant Carousel */}
      <PlantCarousel />

      {/* Animated Stats Section */}
      <AnimatedStats />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter / Community Section */}
      <AnimatedSection animation="reveal-scale">
        <section className="community-section">
          <div className="community-content">
            <Heart className="community-icon pulse" />
            <h2>Join the Herbal Community</h2>
            <p>
              Be part of 1,000+ plant enthusiasts preserving Filipino herbal heritage. 
              Share discoveries, learn from experts, and contribute to our growing database.
            </p>
            <div className="community-stats">
              <div className="comm-stat">
                <span className="comm-number">1,000+</span>
                <span className="comm-label">Active Users</span>
              </div>
              <div className="comm-stat">
                <span className="comm-number">500+</span>
                <span className="comm-label">Photos Shared</span>
              </div>
              <div className="comm-stat">
                <span className="comm-number">40</span>
                <span className="comm-label">Plant Species</span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section - Enhanced */}
      <AnimatedSection animation="reveal">
        <section className="cta-section-enhanced">
          <div className="cta-content-enhanced">
            <div className="cta-badge">
              <Sparkles size={20} />
              <span>100% Free • No Ads • No Sign-up Required</span>
            </div>
            <h2 className="cta-title-enhanced">
              Start Your Herbal Journey Today
            </h2>
            <p className="cta-text-enhanced">
              Discover the healing power of Philippine plants. Identify, learn, and preserve 
              traditional knowledge for future generations.
            </p>
            <div className="cta-buttons">
              <Link to="/scan" className="btn-cta-primary ripple">
                <Camera size={22} />
                <span>Launch Free Scanner</span>
                <ArrowRight size={22} />
              </Link>
              <Link to="/plants" className="btn-cta-secondary">
                <BookOpen size={20} />
                <span>Browse Plant Library</span>
              </Link>
            </div>
            <div className="cta-trust">
              <div className="trust-item">
                <Shield size={18} />
                <span>Privacy Protected</span>
              </div>
              <div className="trust-item">
                <Award size={18} />
                <span>DOH Verified Info</span>
              </div>
              <div className="trust-item">
                <Heart size={18} />
                <span>Made with ❤️ in Calbayog</span>
              </div>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <FloatingElement animation="float-gentle" delay={0} className="cta-float-1">
            <span>🌿</span>
          </FloatingElement>
          <FloatingElement animation="float-bob" delay={0.5} className="cta-float-2">
            <span>🍃</span>
          </FloatingElement>
          <FloatingElement animation="float-gentle" delay={1} className="cta-float-3">
            <span>🌱</span>
          </FloatingElement>
        </section>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default Landing;
