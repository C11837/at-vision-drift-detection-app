import React, { useState } from 'react';
import './LoginPage.css';

/**
 * LoginPage presents a very simple authentication screen.  In a real
 * application you would integrate with an identity provider and handle
 * authentication tokens.  For this demo we simply call the `onLogin`
 * callback when the form is submitted.
 */
export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, perform input validation and call your auth API.
    if (onLogin) {
      onLogin({ username, password });
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-icon" aria-hidden="true">
          {/* Simple lock icon to represent sign‑in */}
          🔐
        </div>
        <h2 className="login-title">Vision Dashboard</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
}