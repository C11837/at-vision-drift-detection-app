import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { fetchCostMetrics, fetchResourceMetrics } from '../api';

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

/**
 * BusinessMetrics page visualises cost and resource utilisation metrics.  Cost
 * metrics include API call costs, infrastructure costs and operational costs【990409115726910†L240-L290】.  Resource
 * utilisation metrics can show CPU/GPU usage, memory usage and throughput.
 */
export default function BusinessMetrics() {
  const [costData, setCostData] = useState(null);
  const [resourceData, setResourceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchCostMetrics()
      .then((res) => {
        if (!isMounted) return;
        setCostData(res);
      })
      .catch(() => {
        if (!isMounted) return;
        setError('Failed to load cost metrics, using sample data.');
        setCostData({
          labels: ['Inference', 'Training', 'RAG Workflows'],
          apiCallCost: [120, 0, 60],
          infrastructureCost: [200, 500, 150],
          operationCost: [50, 100, 80],
        });
      });
    fetchResourceMetrics()
      .then((res) => {
        if (!isMounted) return;
        setResourceData(res);
      })
      .catch(() => {
        if (!isMounted) return;
        setError('Failed to load resource metrics, using sample data.');
        setResourceData({
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          cpuUsage: [65, 70, 60, 75],
          gpuUsage: [80, 85, 78, 90],
          throughput: [120, 150, 140, 160],
        });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!costData || !resourceData) {
    return <p>Loading business metrics…</p>;
  }

  const costChartData = {
    labels: costData.labels,
    datasets: [
      {
        label: 'API Call Cost',
        data: costData.apiCallCost,
        backgroundColor: '#4e54c8',
      },
      {
        label: 'Infrastructure Cost',
        data: costData.infrastructureCost,
        backgroundColor: '#8f94fb',
      },
      {
        label: 'Operation Cost',
        data: costData.operationCost,
        backgroundColor: '#a5b1f3',
      },
    ],
  };
  const costChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Cost Metrics per Operation',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost (USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Operation',
        },
      },
    },
  };

  const resourceChartData = {
    labels: resourceData.labels,
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: resourceData.cpuUsage,
        borderColor: '#4e54c8',
        backgroundColor: 'rgba(78, 84, 200, 0.2)',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'GPU Usage (%)',
        data: resourceData.gpuUsage,
        borderColor: '#8f94fb',
        backgroundColor: 'rgba(143, 148, 251, 0.2)',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Throughput (req/s)',
        data: resourceData.throughput,
        borderColor: '#a5b1f3',
        backgroundColor: 'rgba(165, 177, 243, 0.2)',
        fill: false,
        tension: 0.3,
      },
    ],
  };
  const resourceChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Resource Utilisation Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Usage / Throughput',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time Period',
        },
      },
    },
  };

  return (
    <div>
      <h2>Business Metrics</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        This section highlights the business impact of your AI systems.  Cost
        metrics track expenses such as API calls, infrastructure and operations【990409115726910†L240-L290】.  Resource utilisation metrics
        measure CPU/GPU usage and throughput to ensure efficient use of
        compute.
      </p>
      <div style={{ maxWidth: '700px', marginBottom: '40px' }}>
        <Bar data={costChartData} options={costChartOptions} />
      </div>
      <div style={{ maxWidth: '700px' }}>
        <Line data={resourceChartData} options={resourceChartOptions} />
      </div>
    </div>
  );
}