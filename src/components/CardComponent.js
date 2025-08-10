import React from 'react';
import './CardComponent.css';

/**
 * Generic card component used on the home page.  It accepts a title,
 * description, icon (as a React node) and an onClick handler for
 * navigation.
 */
export default function CardComponent({ title, description, icon, onClick }) {
  return (
    <div className="dashboard-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
}