import React, { useEffect, useState } from 'react';
import { useApi } from '../api.js';

export default function MonitoringPage() {
  const api = useApi();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/monitoring')
      .then((res) => setStatus(res.data))
      .catch(() => setError('Failed to load monitoring status'));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Monitoring Service</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {status ? (
        <div className="space-y-2">
          {status.map((item) => (
            <div
              key={item.service}
              className="flex justify-between items-center p-4 rounded-lg bg-gray-800 shadow"
            >
              <div>
                <p className="font-semibold">{item.service}</p>
                <p className="text-xs text-gray-400">Last checked: {new Date(item.last_checked).toLocaleString()}</p>
              </div>
              <span
                className={
                  item.status === 'healthy'
                    ? 'text-green-400 font-semibold'
                    : item.status === 'degraded'
                    ? 'text-yellow-400 font-semibold'
                    : 'text-red-400 font-semibold'
                }
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}