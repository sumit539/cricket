import React from 'react';
import { Instagram, MapPin, Phone, Mail, Clock, Users } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Connect with us and join our cricket community
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <Instagram className="icon" />
              </div>
              <div className="contact-details">
                <h3>Follow Us</h3>
                <p>Stay updated with our latest news, match results, and behind-the-scenes content</p>
                <a 
                  href="https://instagram.com/bitstormcricket" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  @bitstormcricket
                </a>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <MapPin className="icon" />
              </div>
              <div className="contact-details">
                <h3>Visit Us</h3>
                <p>Central Cricket Ground<br />
                Sports Complex, Main Street<br />
                City, State 12345</p>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <Phone className="icon" />
              </div>
              <div className="contact-details">
                <h3>Call Us</h3>
                <p>For inquiries about joining the club or match schedules</p>
                <a href="tel:+1234567890" className="contact-link">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <Mail className="icon" />
              </div>
              <div className="contact-details">
                <h3>Email Us</h3>
                <p>Send us your questions or feedback</p>
                <a href="mailto:info@bitstormcricket.com" className="contact-link">
                  info@bitstormcricket.com
                </a>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <Clock className="icon" />
              </div>
              <div className="contact-details">
                <h3>Practice Hours</h3>
                <p>Monday - Friday: 6:00 PM - 8:00 PM<br />
                Saturday - Sunday: 9:00 AM - 12:00 PM</p>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <Users className="icon" />
              </div>
              <div className="contact-details">
                <h3>Join Our Team</h3>
                <p>We welcome players of all skill levels, especially BIT Mesra alumni. Come and be part of our cricket family!</p>
                <a 
                  href="https://instagram.com/bitstormcricket" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Contact us on Instagram
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-map">
            <div className="map-placeholder">
              <MapPin className="map-icon" />
              <h3>Find Us Here</h3>
              <p>Central Cricket Ground<br />
              Sports Complex, Main Street<br />
              City, State 12345</p>
              <div className="map-features">
                <div className="feature">
                  <span className="feature-icon">🏏</span>
                  <span>Professional Cricket Ground</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🚗</span>
                  <span>Free Parking Available</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🏪</span>
                  <span>Club House & Facilities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
