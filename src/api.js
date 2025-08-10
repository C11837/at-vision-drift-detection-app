import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';

// Base API URL; can be overridden with environment variable VITE_API_URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create an Axios instance with the base URL
export function useApi() {
  const { token } = useContext(AuthContext);
  const instance = axios.create({ baseURL: API_URL });
  // Intercept requests to add Authorization header
  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
  return instance;
}