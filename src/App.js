import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import MonitoringService from './components/MonitoringService';
import NotificationService from './components/NotificationService';
import DriftDetectionEngine from './components/DriftDetectionEngine';
import ModelMetadataRegistration from './components/ModelMetadataRegistration';
import BusinessMetrics from './components/BusinessMetrics';

import './App.css';

/**
 * App is the top‑level component that handles authentication state and
 * rendering of the login page versus the main dashboard.  When the user
 * authenticates, we show the sidebar and the routed pages.
 */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // In a real application you would perform authentication here.  For this
    // demo we simply flip the flag.
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <NavBar onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/monitoring" element={<MonitoringService />} />
          <Route path="/notifications" element={<NotificationService />} />
          <Route path="/drift" element={<DriftDetectionEngine />} />
          <Route path="/metadata" element={<ModelMetadataRegistration />} />
          <Route path="/metrics" element={<BusinessMetrics />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  );
}