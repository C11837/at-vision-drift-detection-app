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

  useEffect(() => {
    api
      .get('/business-metrics')
      .then((res) => setMetrics(res.data))
      .catch(() => setError('Failed to load business metrics'));
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Business Metrics</h1>
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