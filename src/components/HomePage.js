import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from './CardComponent';
import './HomePage.css';

/**
 * HomePage lays out cards for each service.  When a card is clicked, we
 * navigate to the corresponding route.
 */
export default function HomePage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Monitoring Service',
      description: 'Track precision, recall, and other evaluation metrics to ensure models meet business objectives.',
      icon: '📈',
      path: '/monitoring',
    },
    {
      title: 'Notification Service',
      description: 'Configure alerts via email, Teams, and webhooks.  Rate‑limit notifications to avoid storms.',
      icon: '🔔',
      path: '/notifications',
    },
    {
      title: 'Drift Detection Engine',
      description: 'Detect data, feature and prediction drift using metrics like JSD and PSI.',
      icon: '🌊',
      path: '/drift',
    },
    {
      title: 'Model Metadata',
      description: 'Register models, versions and descriptive metadata for better traceability.',
      icon: '📦',
      path: '/metadata',
    },
    {
      title: 'Business Metrics',
      description: 'Visualise cost and resource utilisation to highlight business impact.',
      icon: '💹',
      path: '/metrics',
    },
  ];

  return (
    <div className="home-container">
      <h1>Dashboard</h1>
      <div className="card-grid">
        {cards.map((card) => (
          <CardComponent
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
            onClick={() => navigate(card.path)}
          />
        ))}
      </div>
    </div>
  );
}