import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from 'chart.js';
import { fetchMonitoringData } from '../api';

// Register Chart.js components.  Without this call, the line chart will not render.
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

/**
 * MonitoringService page displays evaluation metrics over time.  It loads data
 * from the backend and renders a line chart showing precision and recall.  The
 * Datadog article notes that different metrics emphasise different trade‑offs;
 * for example, if false positives are costly you prioritise precision, while
 * high recall is needed when missed positives are expensive【780776212558263†L650-L662】.  Replace the
 * sample data with your own monitoring metrics via `fetchMonitoringData()`.
 */
export default function MonitoringService() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchMonitoringData()
      .then((res) => {
        if (!isMounted) return;
        setData(res);
      })
      .catch(() => {
        // Provide sample data if the API fails.  This sample represents
        // precision and recall values for three model versions.
        if (!isMounted) return;
        setError('Failed to load monitoring data, using sample data.');
        setData({
          labels: ['2025‑07‑01', '2025‑07‑08', '2025‑07‑15', '2025‑07‑22', '2025‑07‑29'],
          precision: [0.91, 0.90, 0.92, 0.89, 0.93],
          recall: [0.86, 0.88, 0.85, 0.87, 0.86],
        });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!data) {
    return <p>Loading monitoring data…</p>;
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Precision',
        data: data.precision,
        borderColor: '#4e54c8',
        backgroundColor: 'rgba(78, 84, 200, 0.2)',
        fill: true,
      },
      {
        label: 'Recall',
        data: data.recall,
        borderColor: '#8f94fb',
        backgroundColor: 'rgba(143, 148, 251, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Model Evaluation Metrics Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Metric Value',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div>
      <h2>Monitoring Service</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        This page illustrates how you can track evaluation metrics such as
        precision, recall and others.  Choose metrics that align with your
        business use case【780776212558263†L650-L662】 and correlate them with business KPIs【780776212558263†L683-L699】.
      </p>
      <div style={{ maxWidth: '600px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}