import React from 'react';
import { Quote, Star, Heart, Target } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  reason: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Captain",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "BITStorm has given me more than just cricket skills. As a BIT Mesra alumni, it's amazing to reconnect with fellow graduates over our shared love for cricket. The camaraderie here is unmatched.",
      reason: "I love how there's no favoritism here - every talent gets equal opportunity. The club feels like a second family, just like our college days.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Vice Captain",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "Being part of BITStorm has been transformative. The coaching, the friendships with fellow BIT Mesra alumni, and the opportunities to grow as a player have been incredible.",
      reason: "The inclusive environment with no favoritism and the focus on both individual growth and team success make this club special. Everyone gets a chance to shine.",
      rating: 5
    },
    {
      id: 3,
      name: "Amit Singh",
      role: "Wicket Keeper",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "The technical improvement I've seen in my game since joining BITStorm is remarkable. But more than that, I've found lifelong friends and mentors from my BIT Mesra days.",
      reason: "The club's emphasis on technique and mental toughness with no favoritism has made me a better player. The support system here is amazing.",
      rating: 5
    },
    {
      id: 4,
      name: "Sneha Patel",
      role: "Bowler",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "From a beginner to a key player, BITStorm has been my journey. The coaches and fellow BIT Mesra alumni teammates have always believed in my potential.",
      reason: "I love how the club encourages everyone to take on challenges with no favoritism. The bowling practice sessions have been game-changing for me.",
      rating: 5
    },
    {
      id: 5,
      name: "Vikram Reddy",
      role: "Opening Batsman",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      quote: "BITStorm's approach to cricket is holistic. It's not just about winning matches, but about developing character and building lasting relationships with fellow BIT Mesra alumni.",
      reason: "The match preparation and the way we analyze our games helps everyone improve. The club culture with no favoritism is what keeps me coming back.",
      rating: 5
    },
    {
      id: 6,
      name: "Anita Joshi",
      role: "All-rounder",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      quote: "BITStorm has shown me that cricket is about passion, dedication, and the joy of playing. Every practice session with fellow BIT Mesra alumni is a learning opportunity.",
      reason: "The diversity in the team and the respect everyone has for each other's skills with no favoritism makes this club unique. It's a place where everyone belongs.",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`star ${index < rating ? 'filled' : ''}`}
        size={16}
      />
    ));
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Players Say</h2>
          <p className="section-subtitle">
            Hear from our team members about their journey with the club
          </p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <Quote className="quote-icon" />
              </div>
              
              <div className="testimonial-content">
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                
                <div className="testimonial-reason">
                  <div className="reason-header">
                    <Heart className="reason-icon" />
                    <span>Why I love this club:</span>
                  </div>
                  <p className="reason-text">{testimonial.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
