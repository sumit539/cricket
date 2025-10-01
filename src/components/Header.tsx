import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy, Users, Calendar, Camera, Video, MessageCircle, History, Lock, LogOut, Image } from 'lucide-react';
import authService from '../services/authService';
import AdminLogin from './AdminLogin';
import AdminMediaManager from './AdminMediaManager';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAdmin(authService.isAuthenticated());
    
    // Scroll to top on page load/refresh
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleAdminLogin = () => {
    setShowAdminLogin(true);
  };

  const handleLoginSuccess = () => {
    setShowAdminLogin(false);
    setIsAdmin(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAdmin(false);
  };

  const handleMediaManager = () => {
    setShowMediaManager(true);
  };

  return (
    <header className="header">
      <div className="container">
        <Link 
          to="/" 
          className="nav-brand"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMenuOpen(false);
          }}
        >
          <Trophy className="logo-icon" />
          <span className="brand-text">BITStorm</span>
        </Link>
        
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
          <Link to="/matches" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <History className="nav-icon" />
            Match History
          </Link>
          
          {/* Mobile Admin Controls */}
          <div className="mobile-admin-controls">
            {isAdmin ? (
              <div className="admin-controls">
                <span className="admin-badge">Admin</span>
                <button 
                  className="admin-logout-btn"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button 
                className="admin-login-btn"
                onClick={() => {
                  handleAdminLogin();
                  setIsMenuOpen(false);
                }}
                title="Admin Login"
              >
                <Lock size={16} />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </nav>

        <div className="header-actions">
          {isAdmin ? (
            <div className="admin-controls">
              <button 
                className="admin-media-btn"
                onClick={handleMediaManager}
                title="Media Manager"
              >
                <Image size={16} />
                <span>Media</span>
              </button>
              <span className="admin-badge">Admin</span>
              <button 
                className="admin-logout-btn"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              className="admin-login-btn"
              onClick={handleAdminLogin}
              title="Admin Login"
            >
              <Lock size={16} />
              <span>Admin</span>
            </button>
          )}
        </div>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {showAdminLogin && (
        <div className="modal-overlay">
          <AdminLogin onLogin={handleLoginSuccess} />
        </div>
      )}

      {showMediaManager && (
        <div className="modal-overlay">
          <AdminMediaManager onClose={() => setShowMediaManager(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
