import React, { useState, useEffect } from 'react';
import { Home, Info, List, Star, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../navbar.css';
import logo from '../assets/logo.png';

export default function ModernFuturisticNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Detect scroll for navbar styling
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Calculate scroll progress
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set active item based on current URL
    const path = window.location.pathname;
    if (path === '/') setActiveItem('home');
    else if (path === '/about') setActiveItem('about');
    else if (path === '/food-list') setActiveItem('food-list');
    else if (path === '/recommendation') setActiveItem('recommendation');
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="futuristic-navbar">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-circle">
              <img src={logo} alt="Nutrition Recommendations Logo" className="logo-image" />
              <div className="logo-glow"></div>
            </div>
            <span className="logo-text">Nutrition<span className="logo-accent">Recommendations</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <Link 
              to="/"
              className={`nav-item ${activeItem === 'home' ? 'active' : ''}`}
              onClick={() => setActiveItem('home')}
            >
              <div className="nav-item-inner">
                <span className="nav-icon"><Home size={18} /></span>
                <span>Home</span>
              </div>
            </Link>
            
            <Link 
              to="/about"
              className={`nav-item ${activeItem === 'about' ? 'active' : ''}`}
              onClick={() => setActiveItem('about')}
            >
              <div className="nav-item-inner">
                <span className="nav-icon"><Info size={18} /></span>
                <span>About</span>
              </div>
            </Link>
            
            <Link 
              to="/food-list"
              className={`nav-item ${activeItem === 'food-list' ? 'active' : ''}`}
              onClick={() => setActiveItem('food-list')}
            >
              <div className="nav-item-inner">
                <span className="nav-icon"><List size={18} /></span>
                <span>Daftar Makanan</span>
              </div>
            </Link>
            
            <Link 
              to="/recommendation"
              className={`nav-item ${activeItem === 'recommendation' ? 'active' : ''}`}
              onClick={() => setActiveItem('recommendation')}
            >
              <div className="nav-item-inner">
                <span className="nav-icon"><Star size={18} /></span>
                <span>Rekomendasi</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="menu-button" onClick={toggleMenu}>
            <div className="menu-button-background"></div>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-track">
          <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-backdrop"></div>
          <div className="mobile-nav-items">
            <Link 
              to="/"
              className={`mobile-nav-item ${activeItem === 'home' ? 'active' : ''}`}
              onClick={() => {
                setActiveItem('home');
                setIsMenuOpen(false);
              }}
            >
              <span className="mobile-nav-icon"><Home size={18} /></span>
              <span>Home</span>
              <div className="nav-highlight"></div>
            </Link>
            
            <Link 
              to="/about"
              className={`mobile-nav-item ${activeItem === 'about' ? 'active' : ''}`}
              onClick={() => {
                setActiveItem('about');
                setIsMenuOpen(false);
              }}
            >
              <span className="mobile-nav-icon"><Info size={18} /></span>
              <span>About</span>
              <div className="nav-highlight"></div>
            </Link>
            
            <Link 
              to="/food-list"
              className={`mobile-nav-item ${activeItem === 'food-list' ? 'active' : ''}`}
              onClick={() => {
                setActiveItem('food-list');
                setIsMenuOpen(false);
              }}
            >
              <span className="mobile-nav-icon"><List size={18} /></span>
              <span>Daftar Makanan</span>
              <div className="nav-highlight"></div>
            </Link>
            
            <Link 
              to="/recommendation"
              className={`mobile-nav-item ${activeItem === 'recommendation' ? 'active' : ''}`}
              onClick={() => {
                setActiveItem('recommendation');
                setIsMenuOpen(false);
              }}
            >
              <span className="mobile-nav-icon"><Star size={18} /></span>
              <span>Rekomendasi</span>
              <div className="nav-highlight"></div>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Spacer for fixed navigation */}
      <div className="content-spacer"></div>
    </div>
  );
}