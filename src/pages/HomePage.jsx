import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ExclamationTriangleIcon,
  BellIcon,
  EyeIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const cards = [
  {
    title: 'Registered Models',
    desc: 'Explore all registered models and view comprehensive statistics.',
    icon: BookOpenIcon,
    path: '/models',
  },
  {
    title: 'Business Metrics',
    desc: 'Visualise cost, resource utilisation and performance metrics.',
    icon: ChartBarIcon,
    path: '/metrics',
  },
  {
    title: 'Drift Detection',
    desc: 'Monitor data drift and stay ahead of model degradation.',
    icon: ExclamationTriangleIcon,
    path: '/drift',
  },
  {
    title: 'Model Metadata',
    desc: 'Register new models and manage metadata seamlessly.',
    icon: ClipboardDocumentListIcon,
    path: '/model-metadata',
  },
  {
    title: 'Monitoring',
    desc: 'Check the health of services and receive alerts.',
    icon: EyeIcon,
    path: '/monitoring',
  },
  {
    title: 'Notifications',
    desc: 'View recent events and system notifications.',
    icon: BellIcon,
    path: '/notifications',
  },
  {
    title: 'Connectors',
    desc: 'Manage integrations with cloud and on‑prem platforms.',
    icon: PuzzlePieceIcon,
    path: '/connectors',
  },
  {
    title: 'User Management',
    desc: 'Add users and change passwords.',
    icon: UserGroupIcon,
    path: '/users',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Welcome to Vision AI Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ title, desc, icon: Icon, path }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="cursor-pointer p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors shadow"
            onClick={() => navigate(path)}
          >
            <div className="flex items-center mb-4">
              <Icon className="h-6 w-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <p className="text-gray-400 text-sm">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}