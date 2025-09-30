import React, { useState } from 'react';
import { Menu, X, Trophy, Users, Calendar, Camera, Video, MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav-brand">
          <Trophy className="logo-icon" />
          <span className="brand-text">BITStorm</span>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#about" onClick={() => scrollToSection('about')} className="nav-link">
            About
          </a>
          <a href="#team" onClick={() => scrollToSection('team')} className="nav-link">
            <Users className="nav-icon" />
            Team
          </a>
          <a href="#matches" onClick={() => scrollToSection('matches')} className="nav-link">
            <Calendar className="nav-icon" />
            Matches
          </a>
          <a href="#testimonials" onClick={() => scrollToSection('testimonials')} className="nav-link">
            <MessageCircle className="nav-icon" />
            Testimonials
          </a>
          <a href="#gallery" onClick={() => scrollToSection('gallery')} className="nav-link">
            <Camera className="nav-icon" />
            Gallery
          </a>
          <a href="#videos" onClick={() => scrollToSection('videos')} className="nav-link">
            <Video className="nav-icon" />
            Videos
          </a>
          <a href="#contact" onClick={() => scrollToSection('contact')} className="nav-link">
            Contact
          </a>
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
