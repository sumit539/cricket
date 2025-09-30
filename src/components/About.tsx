import React from 'react';
import { Target, Users, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About BitStorm</h2>
          <p className="section-subtitle">
            Born over tea and masala dosa, where every talent gets the opportunity
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Our Story</h3>
            <p>
              BitStorm Cricket Club was born in 2025 over a simple cup of tea and masala dosa. 
              What started as a casual conversation between BIT Mesra alumni has grown into 
              a passionate community where every talent gets the opportunity to shine. We believe 
              cricket is more than just a sport - it's a way of life that teaches discipline, 
              teamwork, and sportsmanship.
            </p>
            <p>
              Our club is built on the principle of no favoritism - every player gets equal 
              opportunities regardless of their background. We provide a welcoming environment 
              for players of all skill levels, from beginners taking their first steps on the 
              pitch to experienced players looking to refine their game. Most of our members 
              are proud BIT Mesra alumni, united by our love for cricket and our alma mater.
            </p>
          </div>
          
          <div className="about-features">
            <div className="feature">
              <Target className="feature-icon" />
              <h4>Our Mission</h4>
              <p>To promote cricket as a sport and build a strong community of BIT Mesra alumni who share the passion for the game.</p>
            </div>
            <div className="feature">
              <Users className="feature-icon" />
              <h4>Community</h4>
              <p>We foster a supportive environment where every BIT Mesra alumni feels valued and encouraged to grow.</p>
            </div>
            <div className="feature">
              <Award className="feature-icon" />
              <h4>Excellence</h4>
              <p>We strive for excellence in both individual performance and team achievements, with no favoritism - only merit.</p>
            </div>
            <div className="feature">
              <Heart className="feature-icon" />
              <h4>Passion</h4>
              <p>Our love for cricket drives everything we do, from training to match day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
