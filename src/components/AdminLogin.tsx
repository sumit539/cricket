import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import authService from '../services/authService';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = authService.login(username, password);
    
    if (success) {
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">
            <Lock className="icon" />
          </div>
          <h2>Admin Login</h2>
          <p>Enter your credentials to access admin features</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              <User className="input-icon" />
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock className="input-icon" />
              Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p className="demo-credentials">
            <strong>Demo Credentials:</strong><br />
            Username: bitstorm_admin<br />
            Password: BITStorm2025!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
