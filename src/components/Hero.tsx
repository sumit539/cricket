import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <Trophy className="badge-icon" />
            <span>Established 2025</span>
          </div>
          <h1 className="hero-title">
            Welcome to <span className="highlight">BitStorm Cricket Club</span>
          </h1>
          <p className="hero-description">
            Born over a cup of tea and masala dosa in 2025, BitStorm is where every talent gets 
            the opportunity to shine. No favoritism, just pure passion for cricket. Join our 
            community of BIT Mesra alumni and cricket enthusiasts.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <Star className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">50+</span>
                <span className="stat-label">Active Members</span>
              </div>
            </div>
            <div className="stat">
              <Target className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">25+</span>
                <span className="stat-label">Matches Won</span>
              </div>
            </div>
            <div className="stat">
              <Trophy className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">5</span>
                <span className="stat-label">Trophies</span>
              </div>
            </div>
          </div>
          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
