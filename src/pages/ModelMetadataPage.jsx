import React from 'react';

export default function ModelMetadataPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Model Metadata Registration</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <p>
          This section is reserved for registering new models and managing their metadata.  In a real
          deployment, you would connect to your model registry or ML platform to add and update
          models.  Metadata can include descriptions, training data lineage, performance
          benchmarks and additional statistics beyond those shown in the 360° view.
        </p>
        <p>
          The Vision AI dashboard is designed to be platform‑agnostic.  Connectors can be added to
          integrate with Databricks, MLflow, or your custom on‑prem registry.  Due to the sensitive
          nature of some models, this registration workflow can also run in a lightweight client
          inside regulated environments and only send necessary information to the central service.
        </p>
        <p className="text-yellow-400 text-sm">
          To implement this feature, extend the backend API and build a form here that gathers
          required metadata and submits it to the server.
        </p>
      </div>
    </div>
  );
}