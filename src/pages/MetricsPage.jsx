import React, { useEffect, useState } from 'react';
import { useApi } from '../api.js';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

function MetricCard({ title, series, color }) {
  const data = {
    labels: series.timestamps,
    datasets: [
      {
        label: series.name,
        data: series.values,
        fill: false,
        borderColor: color,
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {},
    },
    scales: {
      x: { ticks: { color: '#cbd5e1' }, grid: { color: '#374151' } },
      y: { ticks: { color: '#cbd5e1' }, grid: { color: '#374151' } },
    },
  };
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-2">{title}</h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default function MetricsPage() {
  const api = useApi();
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');
  const [models, setModels] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  // Fetch models on mount
  useEffect(() => {
    api
      .get('/models')
      .then((res) => {
        setModels(res.data);
        if (res.data.length > 0) setSelectedId(res.data[0].id);
      })
      .catch(() => {});
  }, []);

  // Fetch metrics when selected model changes
  useEffect(() => {
    if (!selectedId) return;
    setError('');
    api
      .get(`/business-metrics/${selectedId}`)
      .then((res) => setMetrics(res.data))
      .catch(() => setError('Failed to load business metrics'));
  }, [selectedId]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Business Metrics</h1>
      {/* Model selection */}
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
      {metrics ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard title="Cost ($k)" series={metrics.cost} color="rgb(96, 165, 250)" />
          <MetricCard title="Resource Utilization (%)" series={metrics.resource_utilization} color="rgb(167, 139, 250)" />
          <MetricCard title="Model Accuracy (%)" series={metrics.performance} color="rgb(74, 222, 128)" />
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}