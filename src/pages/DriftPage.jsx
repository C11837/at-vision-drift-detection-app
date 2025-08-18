import React, { useEffect, useState } from 'react';
import { useApi } from '../api.js';

export default function DriftPage() {
  const api = useApi();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [models, setModels] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    api
      .get('/models')
      .then((res) => {
        setModels(res.data);
        if (res.data.length > 0) setSelectedId(res.data[0].id);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    api
      .get(`/drift/${selectedId}`)
      .then((res) => setData(res.data))
      .catch(() => setError('Failed to load drift information'));
  }, [selectedId]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Drift Detection Engine</h1>
      <div className="mb-4">
        <label className="mr-2">Select Model:</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {data ? (
        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Drift Score</h3>
            <div className="flex items-center space-x-4">
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 rounded-full ${data.drift_detected ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(100, data.drift_score * 100).toFixed(0)}%` }}
                ></div>
              </div>
              <span className="text-sm">{(data.drift_score * 100).toFixed(1)}%</span>
            </div>
            {data.drift_detected ? (
              <p className="mt-2 text-red-400">Alert: Drift has been detected.</p>
            ) : (
              <p className="mt-2 text-green-400">No drift detected.</p>
            )}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Feature Drift Details</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-300">
                    <th className="px-2 py-1">Feature</th>
                    <th className="px-2 py-1">Drift Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data.details).map(([feature, score]) => (
                    <tr key={feature} className="odd:bg-gray-800 even:bg-gray-700">
                      <td className="px-2 py-1">{feature}</td>
                      <td className="px-2 py-1">{(score * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}