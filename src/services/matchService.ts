import matchesData from '../data/matches.json';

export interface Match {
  id: number;
  date: string;
  opponent: string;
  venue: string;
  result: 'won' | 'lost' | 'tied';
  ourScore: string;
  opponentScore: string;
  keyEvents: string[];
  manOfTheMatch: string;
  createdAt: string;
}

export interface MatchFormData {
  date: string;
  opponent: string;
  venue: string;
  result: 'won' | 'lost' | 'tied';
  ourScore: string;
  opponentScore: string;
  keyEvents: string[];
  manOfTheMatch: string;
}

class MatchService {
  private matches: Match[] = matchesData.matches.map(match => ({
    ...match,
    result: match.result as 'won' | 'lost' | 'tied'
  }));

  getAllMatches(): Match[] {
    return this.matches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getRecentMatches(limit: number = 4): Match[] {
    return this.getAllMatches().slice(0, limit);
  }

  getMatchesByYear(year: number): Match[] {
    return this.matches.filter(match => new Date(match.date).getFullYear() === year);
  }

  getMatchesByMonth(year: number, month: number): Match[] {
    return this.matches.filter(match => {
      const matchDate = new Date(match.date);
      return matchDate.getFullYear() === year && matchDate.getMonth() === month - 1;
    });
  }

  addMatch(matchData: MatchFormData): Match {
    const newMatch: Match = {
      id: Math.max(...this.matches.map(m => m.id)) + 1,
      ...matchData,
      result: matchData.result as 'won' | 'lost' | 'tied',
      createdAt: new Date().toISOString()
    };
    
    this.matches.unshift(newMatch);
    this.saveMatches();
    return newMatch;
  }

  updateMatch(id: number, matchData: Partial<MatchFormData>): Match | null {
    const index = this.matches.findIndex(match => match.id === id);
    if (index === -1) return null;

    this.matches[index] = { ...this.matches[index], ...matchData };
    this.saveMatches();
    return this.matches[index];
  }

  deleteMatch(id: number): boolean {
    const index = this.matches.findIndex(match => match.id === id);
    if (index === -1) return false;

    this.matches.splice(index, 1);
    this.saveMatches();
    return true;
  }

  getMatchStats(): { total: number; won: number; lost: number; tied: number; winPercentage: number } {
    const total = this.matches.length;
    const won = this.matches.filter(m => m.result === 'won').length;
    const lost = this.matches.filter(m => m.result === 'lost').length;
    const tied = this.matches.filter(m => m.result === 'tied').length;
    const winPercentage = total > 0 ? Math.round((won / total) * 100) : 0;

    return { total, won, lost, tied, winPercentage };
  }

  getAvailableYears(): number[] {
    const years = [...new Set(this.matches.map(match => new Date(match.date).getFullYear()))];
    return years.sort((a, b) => b - a);
  }

  getAvailableMonths(year: number): number[] {
    const months = [...new Set(
      this.matches
        .filter(match => new Date(match.date).getFullYear() === year)
        .map(match => new Date(match.date).getMonth() + 1)
    )];
    return months.sort((a, b) => b - a);
  }

  private saveMatches(): void {
    // In a real application, this would save to a backend API
    // For now, we'll store in localStorage as a fallback
    localStorage.setItem('bitstorm_matches', JSON.stringify({ matches: this.matches }));
  }

  // Removed unused loadMatches method
}

// Initialize the service
const matchService = new MatchService();
export default matchService;
