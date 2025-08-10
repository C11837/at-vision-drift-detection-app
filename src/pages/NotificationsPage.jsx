import React, { useEffect, useState } from 'react';
import { useApi } from '../api.js';
import { BellAlertIcon } from '@heroicons/react/24/outline';

export default function NotificationsPage() {
  const api = useApi();
  const [notifications, setNotifications] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/notifications')
      .then((res) => setNotifications(res.data))
      .catch(() => setError('Failed to load notifications'));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notification Service</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {notifications ? (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start p-4 bg-gray-800 rounded-lg shadow"
            >
              <BellAlertIcon className="h-6 w-6 text-blue-400 mr-3" />
              <div>
                <p className="font-semibold">{n.title}</p>
                <p className="text-gray-400 text-sm">{n.message}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(n.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}