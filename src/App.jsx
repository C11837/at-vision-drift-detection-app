import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { AuthProvider, AuthContext } from './AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ModelsPage from './pages/ModelsPage.jsx';
import MetricsPage from './pages/MetricsPage.jsx';
import DriftPage from './pages/DriftPage.jsx';
import MonitoringPage from './pages/MonitoringPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import ConnectorsPage from './pages/ConnectorsPage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import ModelMetadataPage from './pages/ModelMetadataPage.jsx';

function AppRoutes() {
  const { token } = useContext(AuthContext);
  // If not logged in, redirect all except login
  return (
    <div className="flex">
      {token && <NavBar />}
      <div className="flex-1 min-h-screen bg-gray-900 p-4 overflow-y-auto">
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/"
            element={token ? <HomePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/models"
            element={token ? <ModelsPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/metrics"
            element={token ? <MetricsPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/drift"
            element={token ? <DriftPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/monitoring"
            element={token ? <MonitoringPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/notifications"
            element={token ? <NotificationsPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/connectors"
            element={token ? <ConnectorsPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/users"
            element={token ? <UsersPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/model-metadata"
            element={token ? <ModelMetadataPage /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}