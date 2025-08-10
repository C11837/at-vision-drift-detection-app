import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  EyeIcon,
  BellIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

// Define the navigation items with associated icons and routes
const navItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Registered Models', path: '/models', icon: BookOpenIcon },
  { name: 'Business Metrics', path: '/metrics', icon: ChartBarIcon },
  { name: 'Drift Detection', path: '/drift', icon: ExclamationTriangleIcon },
  { name: 'Model Metadata', path: '/model-metadata', icon: ClipboardDocumentListIcon },
  { name: 'Monitoring', path: '/monitoring', icon: EyeIcon },
  { name: 'Notifications', path: '/notifications', icon: BellIcon },
  { name: 'Connectors', path: '/connectors', icon: PuzzlePieceIcon },
  { name: 'User Management', path: '/users', icon: UserGroupIcon },
];

export default function NavBar() {
  return (
    <nav className="flex flex-col space-y-2 p-4 w-64 bg-gray-800 min-h-screen text-gray-100">
      <div className="mb-6 text-2xl font-semibold px-2">Vision AI</div>
      {navItems.map(({ name, path, icon: Icon }) => (
        <NavLink
          key={name}
          to={path}
          end
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-lg transition-colors hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <Icon className="h-5 w-5 mr-3" />
          <span>{name}</span>
        </NavLink>
      ))}
    </nav>
  );
}