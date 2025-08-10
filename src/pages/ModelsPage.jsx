import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useApi } from '../api.js';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

export default function ModelsPage() {
  const api = useApi();
  const [models, setModels] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/models')
      .then((res) => setModels(res.data))
      .catch(() => setError('Failed to load models'));
  }, []);

  const toggle = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registered Models</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <div className="space-y-4">
        {models.map((model) => {
          const isOpen = expanded[model.id];
          return (
            <div key={model.id} className="bg-gray-800 rounded-lg shadow overflow-hidden">
              <button
                onClick={() => toggle(model.id)}
                className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-700"
              >
                <div>
                  <p className="font-semibold">{model.name}</p>
                  <p className="text-sm text-gray-400">Labels: {model.labels.join(', ')}</p>
                </div>
                {isOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
              </button>
              {isOpen && (
                <div className="p-4 border-t border-gray-700 bg-gray-900">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Table of feature statistics */}
                    <div>
                      <h3 className="font-semibold mb-2">Feature Statistics</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                          <thead>
                            <tr className="text-gray-300">
                              <th className="px-2 py-1">Feature</th>
                              <th className="px-2 py-1">Coefficient</th>
                              <th className="px-2 py-1">Mean</th>
                              <th className="px-2 py-1">Variance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {model.stats.feature_names.map((f, idx) => (
                              <tr key={f} className="odd:bg-gray-800 even:bg-gray-700">
                                <td className="px-2 py-1">{f}</td>
                                <td className="px-2 py-1">{model.stats.coefficients[idx]}</td>
                                <td className="px-2 py-1">{model.stats.feature_means[idx]}</td>
                                <td className="px-2 py-1">{model.stats.coefficient_variance[idx]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* Chart for coefficients */}
                    <div>
                      <h3 className="font-semibold mb-2">Coefficient Distribution</h3>
                      <Bar
                        data={{
                          labels: model.stats.feature_names,
                          datasets: [
                            {
                              label: 'Coefficient',
                              data: model.stats.coefficients,
                              backgroundColor: 'rgba(59, 130, 246, 0.5)',
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { display: true, labels: { color: '#cbd5e1' } },
                            tooltip: {},
                          },
                          scales: {
                            x: { ticks: { color: '#cbd5e1' }, grid: { color: '#374151' } },
                            y: { ticks: { color: '#cbd5e1' }, grid: { color: '#374151' } },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}