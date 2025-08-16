import React, { useEffect, useState } from 'react';
import { useApi } from '../api.js';

/**
 * ModelMetadataPage implements a two‑phase workflow:
 *
 * 1. Ask the user whether the model/data are restricted.  If restricted, present
 *    instructions to download and run the client module.  The client module
 *    computes metrics locally and posts them back to the server.
 *
 * 2. If unrestricted, collect model name, connector and data paths, then
 *    request the server to compute the metrics.  On success the computed
 *    metrics are displayed.
 */
export default function ModelMetadataPage() {
  const api = useApi();
  const [connectors, setConnectors] = useState([]);
  const [restricted, setRestricted] = useState(null);
  const [modelName, setModelName] = useState('');
  const [connector, setConnector] = useState('');
  const [connectorDetails, setConnectorDetails] = useState({});
  const [trainPath, setTrainPath] = useState('');
  const [prodPath, setProdPath] = useState('');
  const [message, setMessage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch connectors for the select list
    api
      .get('/connectors')
      .then((res) => setConnectors(res.data))
      .catch(() => {});
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setInstructions('');
    setMetrics(null);
    const payload = {
      restricted,
      model_name: modelName,
      connector,
      connector_details: connectorDetails,
      training_data_path: restricted ? null : trainPath,
      production_data_path: restricted ? null : prodPath,
    };
    api
      .post('/model-metadata/register', payload)
      .then((res) => {
        setMessage(res.data.message);
        if (res.data.instructions) setInstructions(res.data.instructions);
        if (res.data.metrics) setMetrics(res.data.metrics);
      })
      .catch((err) => setError(err.response?.data?.detail || 'Failed to register model'));
  };

  const downloadClientModule = () => {
    window.open(`${api.defaults.baseURL}/client-module`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Model Metadata Registration</h1>
      {error && <p className="text-red-400">{error}</p>}
      {message && <p className="text-green-400">{message}</p>}
      {instructions && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="mb-2">{instructions}</p>
          <button
            onClick={downloadClientModule}
            className="py-2 px-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
          >
            Download Client Module
          </button>
        </div>
      )}
      {metrics && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Computed Metrics</h3>
          <pre className="text-sm text-gray-200 overflow-x-auto">
            {JSON.stringify(metrics, null, 2)}
          </pre>
        </div>
      )}
      {restricted === null && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="mb-4">Is the model/data usage restricted?</p>
          <div className="flex space-x-4">
            <button
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md"
              onClick={() => setRestricted(true)}
            >
              Yes
            </button>
            <button
              className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md"
              onClick={() => setRestricted(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      {restricted !== null && !instructions && !metrics && (
        <form onSubmit={handleRegister} className="bg-gray-800 p-4 rounded-lg space-y-4">
          <div>
            <label className="block text-sm mb-1">Model Name</label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Connector</label>
            <select
              value={connector}
              onChange={(e) => setConnector(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- Select connector --
              </option>
              {connectors.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {/* Connector details */}
          <div>
            <label className="block text-sm mb-1">Connector Details (optional, JSON)</label>
            <textarea
              value={JSON.stringify(connectorDetails) || ''}
              onChange={(e) => {
                try {
                  const obj = JSON.parse(e.target.value || '{}');
                  setConnectorDetails(obj);
                } catch {
                  // If parsing fails, store raw string under a generic key
                  setConnectorDetails({ raw: e.target.value });
                }
              }}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400">Provide additional connector parameters such as bucket, path, workspace, etc.</p>
          </div>
          {!restricted && (
            <>
              <div>
                <label className="block text-sm mb-1">Training Data Path</label>
                <input
                  type="text"
                  value={trainPath}
                  onChange={(e) => setTrainPath(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Production Data Path</label>
                <input
                  type="text"
                  value={prodPath}
                  onChange={(e) => setProdPath(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
          >
            Register Model
          </button>
        </form>
      )}
    </div>
  );
}