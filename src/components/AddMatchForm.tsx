import React, { useState } from 'react';
import { Plus, X, Calendar, Users, MapPin, Trophy, Target, Users as UsersIcon } from 'lucide-react';
import type { MatchFormData } from '../services/matchService';

interface AddMatchFormProps {
  onSubmit: (matchData: MatchFormData) => void;
  onCancel: () => void;
}

const AddMatchForm: React.FC<AddMatchFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<MatchFormData>({
    date: '',
    opponent: '',
    venue: '',
    result: 'won',
    ourScore: '',
    opponentScore: '',
    keyEvents: [''],
    manOfTheMatch: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.opponent.trim()) newErrors.opponent = 'Opponent is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
    if (!formData.ourScore.trim()) newErrors.ourScore = 'Our score is required';
    if (!formData.opponentScore.trim()) newErrors.opponentScore = 'Opponent score is required';
    if (!formData.manOfTheMatch.trim()) newErrors.manOfTheMatch = 'Man of the match is required';
    
    const validEvents = formData.keyEvents.filter(event => event.trim());
    if (validEvents.length === 0) newErrors.keyEvents = 'At least one key event is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const validEvents = formData.keyEvents.filter(event => event.trim());
      onSubmit({
        ...formData,
        keyEvents: validEvents
      });
    }
  };

  const addKeyEvent = () => {
    setFormData(prev => ({
      ...prev,
      keyEvents: [...prev.keyEvents, '']
    }));
  };

  const removeKeyEvent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyEvents: prev.keyEvents.filter((_, i) => i !== index)
    }));
  };

  const updateKeyEvent = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      keyEvents: prev.keyEvents.map((event, i) => i === index ? value : event)
    }));
  };

  return (
    <div className="add-match-form">
      <div className="form-header">
        <h2>Add New Match</h2>
        <button className="close-btn" onClick={onCancel}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="match-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              <Calendar className="input-icon" />
              Match Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="opponent">
              <Users className="input-icon" />
              Opponent Team
            </label>
            <input
              type="text"
              id="opponent"
              value={formData.opponent}
              onChange={(e) => setFormData(prev => ({ ...prev, opponent: e.target.value }))}
              placeholder="e.g., Thunder Bolts CC"
              className={errors.opponent ? 'error' : ''}
            />
            {errors.opponent && <span className="error-text">{errors.opponent}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="venue">
            <MapPin className="input-icon" />
            Venue
          </label>
          <input
            type="text"
            id="venue"
            value={formData.venue}
            onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
            placeholder="e.g., Central Cricket Ground"
            className={errors.venue ? 'error' : ''}
          />
          {errors.venue && <span className="error-text">{errors.venue}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ourScore">
              <Trophy className="input-icon" />
              Our Score
            </label>
            <input
              type="text"
              id="ourScore"
              value={formData.ourScore}
              onChange={(e) => setFormData(prev => ({ ...prev, ourScore: e.target.value }))}
              placeholder="e.g., 245/8 (50 overs)"
              className={errors.ourScore ? 'error' : ''}
            />
            {errors.ourScore && <span className="error-text">{errors.ourScore}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="opponentScore">
              <Target className="input-icon" />
              Opponent Score
            </label>
            <input
              type="text"
              id="opponentScore"
              value={formData.opponentScore}
              onChange={(e) => setFormData(prev => ({ ...prev, opponentScore: e.target.value }))}
              placeholder="e.g., 198/10 (45.2 overs)"
              className={errors.opponentScore ? 'error' : ''}
            />
            {errors.opponentScore && <span className="error-text">{errors.opponentScore}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="result">Match Result</label>
          <select
            id="result"
            value={formData.result}
            onChange={(e) => setFormData(prev => ({ ...prev, result: e.target.value as 'won' | 'lost' | 'tied' }))}
          >
            <option value="won">Won</option>
            <option value="lost">Lost</option>
            <option value="tied">Tied</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="manOfTheMatch">
            <UsersIcon className="input-icon" />
            Man of the Match
          </label>
          <input
            type="text"
            id="manOfTheMatch"
            value={formData.manOfTheMatch}
            onChange={(e) => setFormData(prev => ({ ...prev, manOfTheMatch: e.target.value }))}
            placeholder="e.g., Rajesh Kumar"
            className={errors.manOfTheMatch ? 'error' : ''}
          />
          {errors.manOfTheMatch && <span className="error-text">{errors.manOfTheMatch}</span>}
        </div>

        <div className="form-group">
          <label>Key Events</label>
          {formData.keyEvents.map((event, index) => (
            <div key={index} className="key-event-input">
              <input
                type="text"
                value={event}
                onChange={(e) => updateKeyEvent(index, e.target.value)}
                placeholder="e.g., Rajesh Kumar scored 89 runs"
              />
              {formData.keyEvents.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeKeyEvent(index)}
                  className="remove-event-btn"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addKeyEvent}
            className="add-event-btn"
          >
            <Plus size={16} />
            Add Key Event
          </button>
          {errors.keyEvents && <span className="error-text">{errors.keyEvents}</span>}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Match
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMatchForm;
