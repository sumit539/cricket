import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Search, Trophy, Target, Users } from 'lucide-react';
import matchService, { type Match } from '../services/matchService';

const MatchHistory: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableMonths, setAvailableMonths] = useState<number[]>([]);

  useEffect(() => {
    loadMatches();
  }, []);

  useEffect(() => {
    filterMatches();
  }, [matches, selectedYear, selectedMonth, searchTerm]);

  useEffect(() => {
    if (selectedYear) {
      setAvailableMonths(matchService.getAvailableMonths(selectedYear));
    } else {
      setAvailableMonths([]);
    }
  }, [selectedYear]);

  const loadMatches = () => {
    const allMatches = matchService.getAllMatches();
    setMatches(allMatches);
    setAvailableYears(matchService.getAvailableYears());
  };

  const filterMatches = () => {
    let filtered = [...matches];

    // Filter by year
    if (selectedYear) {
      filtered = filtered.filter(match => new Date(match.date).getFullYear() === selectedYear);
    }

    // Filter by month
    if (selectedMonth) {
      filtered = filtered.filter(match => new Date(match.date).getMonth() === selectedMonth - 1);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(match =>
        match.opponent.toLowerCase().includes(term) ||
        match.venue.toLowerCase().includes(term) ||
        match.manOfTheMatch.toLowerCase().includes(term) ||
        match.keyEvents.some(event => event.toLowerCase().includes(term))
      );
    }

    setFilteredMatches(filtered);
  };

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
    setSearchTerm('');
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

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  };

  const stats = matchService.getMatchStats();

  return (
    <div className="match-history">
      <div className="container">
        <div className="page-header">
          <h1>Match History</h1>
          <p>Complete history of all BITStorm matches</p>
        </div>

        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Matches</div>
          </div>
          <div className="stat-card won">
            <div className="stat-number">{stats.won}</div>
            <div className="stat-label">Won</div>
          </div>
          <div className="stat-card lost">
            <div className="stat-number">{stats.lost}</div>
            <div className="stat-label">Lost</div>
          </div>
          <div className="stat-card tied">
            <div className="stat-number">{stats.tied}</div>
            <div className="stat-label">Tied</div>
          </div>
          <div className="stat-card percentage">
            <div className="stat-number">{stats.winPercentage}%</div>
            <div className="stat-label">Win Rate</div>
          </div>
        </div>

        <div className="filters-section">
          <div className="filters-row">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search matches, opponents, venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Year</label>
              <select
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">All Years</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Month</label>
              <select
                value={selectedMonth || ''}
                onChange={(e) => setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)}
                disabled={!selectedYear}
              >
                <option value="">All Months</option>
                {availableMonths.map(month => (
                  <option key={month} value={month}>{getMonthName(month)}</option>
                ))}
              </select>
            </div>

            <button onClick={clearFilters} className="clear-filters-btn">
              <Filter className="filter-icon" />
              Clear Filters
            </button>
          </div>
        </div>

        <div className="matches-grid">
          {filteredMatches.length === 0 ? (
            <div className="no-matches">
              <Calendar className="no-matches-icon" />
              <h3>No matches found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            filteredMatches.map((match) => (
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
                      <span className="team-name">BITStorm</span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;
