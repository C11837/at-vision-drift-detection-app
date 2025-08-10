import React, { createContext, useState, useEffect } from 'react';

// Create a context for authentication
export const AuthContext = createContext(null);

/**
 * AuthProvider wraps the application and manages authentication state.
 * It stores the token in localStorage so that page refreshes do not
 * immediately log a user out.  It also exposes login and logout
 * functions that call the backend API.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => localStorage.getItem('username') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('username', user);
    } else {
      localStorage.removeItem('username');
    }
  }, [user]);

  const login = (username, token) => {
    setToken(token);
    setUser(username);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}