import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BellIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useApi } from '../api.js';
import { AuthContext } from '../AuthContext.jsx';

// Map path segments to human-readable breadcrumb names
const BREADCRUMB_LABELS = {
  '': 'Home',
  models: 'Registered Models',
  metrics: 'Business Metrics',
  drift: 'Drift Detection',
  'model-metadata': 'Model Metadata',
  monitoring: 'Monitoring',
  notifications: 'Notifications',
  connectors: 'Connectors',
  users: 'User Management',
};

export default function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const api = useApi();
  const { user, logout } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch notifications to display count
    api
      .get('/notifications')
      .then((res) => setUnreadCount(res.data.length))
      .catch(() => {});
  }, []);

  // Build breadcrumbs from the current pathname
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const crumbs = [];
  let accumulatedPath = '';
  for (const segment of pathSegments) {
    accumulatedPath += `/${segment}`;
    const label = BREADCRUMB_LABELS[segment] || segment;
    crumbs.push({ label, path: accumulatedPath });
  }

  return (
    <div className="flex items-center justify-between bg-gray-800 px-4 py-3 shadow">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm">
        <span
          className="cursor-pointer text-blue-400 hover:underline"
          onClick={() => navigate('/')}
        >
          Home
        </span>
        {crumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.path}>
            <span>/</span>
            <span
              className="cursor-pointer text-blue-400 hover:underline"
              onClick={() => navigate(crumb.path)}
            >
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative cursor-pointer" onClick={() => navigate('/notifications')}>
          <BellIcon className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1">
              {unreadCount}
            </span>
          )}
        </div>
        {/* User management */}
        <UserIcon className="h-6 w-6 cursor-pointer" onClick={() => navigate('/users')} />
        {/* Logout */}
        <ArrowRightOnRectangleIcon className="h-6 w-6 cursor-pointer" onClick={logout} />
        {user && <span className="text-sm text-gray-300 ml-1">{user}</span>}
      </div>
    </div>
  );
}