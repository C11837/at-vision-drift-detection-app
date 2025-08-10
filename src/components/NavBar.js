import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

/**
 * NavBar renders a vertical navigation menu.  It uses NavLink so that the
 * active link is highlighted automatically.  Icons are represented with
 * simple emoji for ease of use; you can replace them with a dedicated
 * icon library (e.g. FontAwesome) if desired.
 */
export default function NavBar({ onLogout }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">Vision AI</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
            🏠 Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/monitoring" className={({ isActive }) => (isActive ? 'active' : '')}>
            📈 Monitoring
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications" className={({ isActive }) => (isActive ? 'active' : '')}>
            🔔 Notifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/drift" className={({ isActive }) => (isActive ? 'active' : '')}>
            🌊 Drift Detection
          </NavLink>
        </li>
        <li>
          <NavLink to="/metadata" className={({ isActive }) => (isActive ? 'active' : '')}>
            📦 Model Metadata
          </NavLink>
        </li>
        <li>
          <NavLink to="/metrics" className={({ isActive }) => (isActive ? 'active' : '')}>
            💹 Business Metrics
          </NavLink>
        </li>
      </ul>
      <button className="logout-button" onClick={onLogout}>
        Log Out
      </button>
    </nav>
  );
}