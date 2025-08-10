import React, { useState } from 'react';
import { fetchDriftMetrics } from '../api';

/**
 * DriftDetectionEngine page describes what data drift is and provides a
 * button to run a drift analysis via the backend API.  It emphasises
 * establishing a baseline, choosing appropriate metrics (JSD, PSI), setting
 * thresholds and responding to drift events【823480329544921†L365-L399】.  If the API call
 * fails, the component falls back to a sample drift result.
 */
export default function DriftDetectionEngine() {
  const [driftResult, setDriftResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const runDriftAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchDriftMetrics();
      setDriftResult(result);
    } catch (err) {
      setError('Failed to fetch drift metrics, using sample result.');
      // Provide a sample drift result for demonstration purposes.
      setDriftResult({
        metrics: {
          jsd: 0.12,
          psi: 0.08,
        },
        interpretation: 'Low data drift detected; monitoring recommended.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Drift Detection Engine</h2>
      <p>
        Data drift occurs when the statistical properties of input data change
        over time【823480329544921†L258-L264】.  It serves as an early warning proxy for
        performance decline when ground‑truth labels are delayed【823480329544921†L266-L270】.  Common
        drift metrics include the Jensen–Shannon Divergence (JSD) and the
        Population Stability Index (PSI)【823480329544921†L276-L283】.  To implement drift
        detection:
      </p>
      <ul>
        <li>Establish a baseline dataset (e.g. your training data)【823480329544921†L365-L373】.</li>
        <li>Select appropriate metrics (JSD/PSI) based on your data type【823480329544921†L375-L383】.</li>
        <li>Set drift thresholds considering business impact and feature importance【823480329544921†L383-L389】.</li>
        <li>Monitor distributions continuously and configure alerts【823480329544921†L391-L396】.</li>
        <li>When drift exceeds thresholds, investigate root causes and decide whether to retrain【823480329544921†L398-L404】.</li>
      </ul>
      <button onClick={runDriftAnalysis} style={{ padding: '8px 16px', marginBottom: '10px' }}>
        {loading ? 'Running…' : 'Run Drift Analysis'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {driftResult && (
        <div style={{ background: '#fff', padding: '10px', borderRadius: '4px', maxWidth: '400px' }}>
          <h3>Drift Metrics</h3>
          <p>JSD: {driftResult.metrics.jsd}</p>
          <p>PSI: {driftResult.metrics.psi}</p>
          <p><strong>Interpretation:</strong> {driftResult.interpretation}</p>
        </div>
      )}
    </div>
  );
}