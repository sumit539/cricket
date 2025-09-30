import React from 'react';
import { Calendar, Trophy, Target, Users } from 'lucide-react';

interface Match {
  id: number;
  date: string;
  opponent: string;
  venue: string;
  result: 'won' | 'lost' | 'tied';
  ourScore: string;
  opponentScore: string;
  keyEvents: string[];
  manOfTheMatch: string;
}

const Matches: React.FC = () => {
  const matches: Match[] = [
    {
      id: 1,
      date: "2025-09-15",
      opponent: "Thunder Bolts CC",
      venue: "Central Cricket Ground",
      result: "won",
      ourScore: "245/8 (50 overs)",
      opponentScore: "198/10 (45.2 overs)",
      keyEvents: [
        "Rajesh Kumar scored 89 runs",
        "Priya Sharma took 4 wickets",
        "Amit Singh made 3 catches",
        "Partnership of 120 runs between Rajesh and Vikram"
      ],
      manOfTheMatch: "Rajesh Kumar"
    },
    {
      id: 2,
      date: "2025-09-08",
      opponent: "Lightning Strikers",
      venue: "Sports Complex",
      result: "won",
      ourScore: "312/6 (50 overs)",
      opponentScore: "289/9 (50 overs)",
      keyEvents: [
        "Vikram Reddy century (102 runs)",
        "Sneha Patel 5-wicket haul",
        "Anita Joshi 2 crucial catches",
        "Last over thriller - won by 23 runs"
      ],
      manOfTheMatch: "Vikram Reddy"
    },
    {
      id: 3,
      date: "2025-08-25",
      opponent: "Royal Challengers",
      venue: "Cricket Academy",
      result: "lost",
      ourScore: "178/10 (42.3 overs)",
      opponentScore: "182/7 (48.1 overs)",
      keyEvents: [
        "Tight bowling by Sneha Patel",
        "Amit Singh's 45 runs",
        "Close finish - lost by 3 wickets",
        "Good fielding display"
      ],
      manOfTheMatch: "Amit Singh"
    },
    {
      id: 4,
      date: "2025-08-15",
      opponent: "Victory Lions",
      venue: "Main Stadium",
      result: "won",
      ourScore: "267/5 (50 overs)",
      opponentScore: "234/10 (47.5 overs)",
      keyEvents: [
        "Priya Sharma all-round performance",
        "Rajesh Kumar 78 runs",
        "Anita Joshi 3 wickets",
        "Team effort in fielding"
      ],
      manOfTheMatch: "Priya Sharma"
    }
  ];

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
      </div>
    </section>
  );
};

export default Matches;
