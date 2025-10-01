import React, { useState, useEffect } from 'react';
import { Users, Eye, BarChart3 } from 'lucide-react';

const VisitorCounter: React.FC = () => {
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    // Check if this is a new visitor session
    const sessionVisited = sessionStorage.getItem('bitstorm_session_visited');
    
    if (!sessionVisited) {
      // New visitor in this session
      setIsNewVisitor(true);
      sessionStorage.setItem('bitstorm_session_visited', 'true');
      
      // Hide new visitor indicator after 3 seconds
      setTimeout(() => setIsNewVisitor(false), 3000);
    }
  }, []);

  return (
    <div className="visitor-counter">
      <div className="counter-content">
        <div className="counter-icon">
          <BarChart3 className="icon" />
        </div>
        <div className="counter-info">
          <div className="counter-number">
            Analytics
            {isNewVisitor && <span className="new-visitor-indicator">New!</span>}
          </div>
          <div className="counter-label">
            Tracked by Netlify Analytics
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
