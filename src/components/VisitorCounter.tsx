import React, { useState, useEffect } from 'react';
import { Users, Eye } from 'lucide-react';

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    // Get or initialize visitor count
    const storedCount = localStorage.getItem('bitstorm_visitor_count');
    const sessionVisited = sessionStorage.getItem('bitstorm_session_visited');
    
    if (!sessionVisited) {
      // New visitor in this session
      const newCount = storedCount ? parseInt(storedCount) + 1 : 1;
      setVisitorCount(newCount);
      setIsNewVisitor(true);
      
      // Store updated count
      localStorage.setItem('bitstorm_visitor_count', newCount.toString());
      sessionStorage.setItem('bitstorm_session_visited', 'true');
      
      // Hide new visitor indicator after 3 seconds
      setTimeout(() => setIsNewVisitor(false), 3000);
    } else {
      // Returning visitor in same session
      setVisitorCount(storedCount ? parseInt(storedCount) : 0);
    }
  }, []);

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className="visitor-counter">
      <div className="counter-content">
        <div className="counter-icon">
          <Users className="icon" />
        </div>
        <div className="counter-info">
          <div className="counter-number">
            {formatCount(visitorCount)}
            {isNewVisitor && <span className="new-visitor-indicator">+1</span>}
          </div>
          <div className="counter-label">
            Visitors to BITStorm
          </div>
        </div>
        <div className="counter-stats">
          <div className="stat-item">
            <Eye className="stat-icon" />
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
