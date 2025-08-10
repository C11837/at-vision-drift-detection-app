import React, { useState } from 'react';
import { registerModel } from '../api';

/**
 * ModelMetadataRegistration page provides a simple form to register new
 * models.  Fields include name, version, description and author.  On
 * submission the form calls the backend API.  This component can be
 * extended to include more metadata fields as needed.
 */
export default function ModelMetadataRegistration() {
  const [model, setModel] = useState({
    name: '',
    version: '',
    description: '',
    author: '',
  });
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModel((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await registerModel(model);
      setMessage('Model registered successfully');
      setModel({ name: '', version: '', description: '', author: '' });
    } catch (err) {
      setMessage('Failed to register model (demo mode)');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Model Metadata Registration</h2>
      <p>
        Use this form to register models and their metadata.  A well‑curated
        model catalog improves governance and traceability.
      </p>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Model Name
            <input
              type="text"
              name="name"
              value={model.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Version
            <input
              type="text"
              name="version"
              value={model.version}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Description
            <textarea
              name="description"
              value={model.description}
              onChange={handleChange}
              rows={3}
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            ></textarea>
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Author
            <input
              type="text"
              name="author"
              value={model.author}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </label>
        </div>
        <button type="submit" disabled={submitting} style={{ padding: '8px 16px' }}>
          {submitting ? 'Submitting…' : 'Register Model'}
        </button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
}