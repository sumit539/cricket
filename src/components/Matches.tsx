import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Trophy, Target, Users, Plus, History } from 'lucide-react';
import matchService, { type Match } from '../services/matchService';
import AddMatchForm from './AddMatchForm';
import authService from '../services/authService';

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadMatches();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    setIsAdmin(authService.isAuthenticated());
  };

  const loadMatches = () => {
    const recentMatches = matchService.getRecentMatches(4);
    setMatches(recentMatches);
  };

  const handleAddMatch = (matchData: any) => {
    matchService.addMatch(matchData);
    loadMatches();
    setShowAddForm(false);
  };

  const handleAddMatchClick = () => {
    if (isAdmin) {
      setShowAddForm(true);
    } else {
      // Redirect to header admin login
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'won': return <Trophy className="result-icon won" />;
      case 'lost': return <Target className="result-icon lost" />;
      case 'tied': return <Users className="result-icon tied" />;
      default: return null;
    }
  };

  const getResultClass = (result: string) => {
    return `match-result ${result}`;
  };

  return (
    <section id="matches" className="matches">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Recent Matches</h2>
          <p className="section-subtitle">
            Our journey through the latest games and achievements
          </p>
                 <div className="section-actions">
                   {isAdmin && (
                     <button
                       className="btn btn-primary"
                       onClick={handleAddMatchClick}
                     >
                       <Plus className="btn-icon" />
                       Add Match
                     </button>
                   )}
                   <button 
                     className="btn btn-secondary"
                     onClick={() => navigate('/matches')}
                   >
                     <History className="btn-icon" />
                     View History
                   </button>
                 </div>
        </div>
        
        <div className="matches-grid">
          {matches.map((match) => (
            <div key={match.id} className="match-card">
              <div className="match-header">
                <div className="match-date">
                  <Calendar className="date-icon" />
                  <span>{new Date(match.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className={getResultClass(match.result)}>
                  {getResultIcon(match.result)}
                  <span className="result-text">
                    {match.result === 'won' ? 'Won' : match.result === 'lost' ? 'Lost' : 'Tied'}
                  </span>
                </div>
              </div>
              
              <div className="match-details">
                <h3 className="match-title">vs {match.opponent}</h3>
                <p className="match-venue">{match.venue}</p>
                
                <div className="match-scores">
                  <div className="score">
                    <span className="team-name">Our Team</span>
                    <span className="score-value">{match.ourScore}</span>
                  </div>
                  <div className="score">
                    <span className="team-name">{match.opponent}</span>
                    <span className="score-value">{match.opponentScore}</span>
                  </div>
                </div>
                
                <div className="match-man-of-match">
                  <Trophy className="motm-icon" />
                  <span>Man of the Match: <strong>{match.manOfTheMatch}</strong></span>
                </div>
              </div>
              
              <div className="match-events">
                <h4>Key Events:</h4>
                <ul className="events-list">
                  {match.keyEvents.map((event, index) => (
                    <li key={index} className="event-item">{event}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {showAddForm && (
          <div className="modal-overlay">
            <AddMatchForm
              onSubmit={handleAddMatch}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

      </div>
    </section>
  );
};

export default Matches;
