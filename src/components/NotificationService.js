import React, { useState } from 'react';

/**
 * NotificationService page demonstrates how users might configure notification
 * settings.  Real implementations would persist these settings in a database
 * and integrate with email/Teams/webhook providers.  The Fiddler
 * documentation notes that you should rate‑limit notifications to avoid storms
 * during large drift events【823480329544921†L295-L302】.
 */
export default function NotificationService() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [teamsEnabled, setTeamsEnabled] = useState(false);
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [threshold, setThreshold] = useState(0.5);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application you would POST these settings to your backend.
    alert('Notification settings saved (demo).');
  };

  return (
    <div>
      <h2>Notification Service</h2>
      <p>
        Configure how you want to receive alerts about model events (e.g. drift,
        performance degradation).  Multi‑channel support (email, Teams,
        webhooks) ensures reliability, and rate limiting prevents notification
        storms【823480329544921†L295-L302】.
      </p>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={(e) => setEmailEnabled(e.target.checked)}
            />{' '}
            Enable Email
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={teamsEnabled}
              onChange={(e) => setTeamsEnabled(e.target.checked)}
            />{' '}
            Enable Microsoft Teams
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={webhookEnabled}
              onChange={(e) => setWebhookEnabled(e.target.checked)}
            />{' '}
            Enable Webhook
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Drift alert threshold: {threshold}
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Save Settings
        </button>
      </form>
    </div>
  );
}