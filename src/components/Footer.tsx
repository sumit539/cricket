import React from 'react';
import { Trophy, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <Trophy className="footer-logo" />
              <span className="footer-brand-text">BITStorm</span>
            </div>
            <p className="footer-description">
              Born over tea and masala dosa, BITStorm is where every talent gets the opportunity. 
              Join our community of BIT Mesra alumni and be part of something special.
            </p>
            <div className="social-links">
              <a 
                href="https://instagram.com/bitstormcricket" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="social-icon" />
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#matches">Recent Matches</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#videos">Videos</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>Central Cricket Ground, Sports Complex</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>info@bitstormcricket.com</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Club Stats</h3>
            <div className="club-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Active Members</span>
              </div>
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">Matches Won</span>
              </div>
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Trophies</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 BITStorm Cricket Club. All rights reserved.
            </p>
            <p className="footer-note">
              Built with passion for cricket and community.
            </p>
          </div>
          <div className="footer-right">
            <VisitorCounter />
            <button 
              className="scroll-to-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp className="scroll-icon" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
