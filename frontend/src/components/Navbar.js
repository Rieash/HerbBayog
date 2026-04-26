import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, Camera, BookOpen, Home, Scan, Info, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const { t, changeLanguage, currentLanguage, languages } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t('nav.home'), icon: <Home className="nav-icon" /> },
    { path: '/scan', label: t('nav.scan'), icon: <Scan className="nav-icon" /> },
    { path: '/plants', label: t('nav.plants'), icon: <BookOpen className="nav-icon" /> },
    { path: '/about', label: t('nav.about'), icon: <Info className="nav-icon" /> }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon-wrapper">
            <Leaf className="logo-icon" />
            <div className="logo-pulse"></div>
          </div>
          <div className="logo-text">
            <span className="logo-main">Herb</span>
            <span className="logo-accent">Bayog</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <span className="nav-link-icon">{link.icon}</span>
              <span className="nav-link-text">{link.label}</span>
              {isActive(link.path) && <div className="nav-indicator"></div>}
            </Link>
          ))}
        </div>

        {/* Language Switcher */}
        <div className="navbar-lang desktop">
          <button
            className="lang-switcher"
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          >
            <Globe size={18} />
            <span>{currentLanguage.flag}</span>
          </button>
          {isLangMenuOpen && (
            <div className="lang-dropdown">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-option ${lang.code === currentLanguage.code ? 'active' : ''}`}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsLangMenuOpen(false);
                  }}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="navbar-cta desktop">
          <Link to="/scan" className="btn-scan">
            <Camera className="btn-scan-icon" />
            <span>{t('nav.scan')}</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {link.icon}
              <span>{link.label}</span>
              {isActive(link.path) && <div className="mobile-active-indicator"></div>}
            </Link>
          ))}
          <Link to="/scan" className="mobile-cta">
            <Camera />
            {t('nav.scan')}
          </Link>

          {/* Mobile Language Switcher */}
          <div className="mobile-lang">
            <span className="mobile-lang-label">Language:</span>
            <div className="mobile-lang-options">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`mobile-lang-btn ${lang.code === currentLanguage.code ? 'active' : ''}`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
