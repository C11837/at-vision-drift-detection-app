/**
 * API helper functions.
 *
 * Replace `API_BASE_URL` with the base URL of your backend services.  All
 * functions return a Promise that resolves to the parsed JSON response.  If
 * the network request fails or the server returns a non‑OK status, the
 * functions will throw an error.  Adjust endpoints and data formats to
 * match your API contract.
 */

const API_BASE_URL = '';

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export async function fetchDriftMetrics() {
  // Replace `/drift/metrics` with your drift detection API endpoint.
  const url = `${API_BASE_URL}/drift/metrics`;
  return fetchJSON(url);
}

export async function fetchCostMetrics() {
  // Replace `/metrics/costs` with your cost metrics API endpoint.
  const url = `${API_BASE_URL}/metrics/costs`;
  return fetchJSON(url);
}

export async function fetchResourceMetrics() {
  // Replace `/metrics/resources` with your resource utilisation API endpoint.
  const url = `${API_BASE_URL}/metrics/resources`;
  return fetchJSON(url);
}

export async function fetchMonitoringData() {
  // Replace `/metrics/monitoring` with your monitoring service API endpoint.
  const url = `${API_BASE_URL}/metrics/monitoring`;
  return fetchJSON(url);
}

export async function registerModel(model) {
  // Replace `/models` with your model registration API endpoint.
  const url = `${API_BASE_URL}/models`;
  return fetchJSON(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(model),
  });
}

// If your backend requires authentication or custom headers, you can add
// another helper that sets those headers based on your auth token.