import React, { useEffect, useState } from 'react';
import { useApi } from '../api.js';

export default function ConnectorsPage() {
  const api = useApi();
  const [connectors, setConnectors] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/connectors')
      .then((res) => setConnectors(res.data))
      .catch(() => setError('Failed to load connectors'));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Connectors</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {connectors ? (
        <div className="space-y-3">
          {connectors.map((c) => (
            <div
              key={c.name}
              className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow"
            >
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-gray-400 text-sm">Type: {c.type}</p>
              </div>
              <span
                className={
                  c.status === 'connected'
                    ? 'text-green-400 font-semibold'
                    : c.status === 'pending'
                    ? 'text-yellow-400 font-semibold'
                    : 'text-red-400 font-semibold'
                }
              >
                {c.status}
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