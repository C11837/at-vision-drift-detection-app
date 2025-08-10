# Vision Dashboard (React)

## Overview

This project implements a lightweight proof‑of‑concept dashboard for a vision‑AI/MLOps platform.  It includes a login page, a left‑hand navigation bar and several pages/cards for monitoring services, notification service, a drift detection engine, model metadata registration, and a business‑benefit section.

The goal of the dashboard is twofold:

1. **Demonstrate core capabilities.**  Each card links to a page that illustrates a component of a typical MLOps platform (drift detection, monitoring, notifications, metadata management).  These pages contain sample forms, charts and placeholder text that you can extend.
2. **Highlight business benefits.**  The `BusinessMetrics` page displays cost and resource‑utilization metrics for an AI system.  Cost metrics can include API call costs, infrastructure costs and operational costs【990409115726910†L240-L290】.  Resource‑utilization metrics can include CPU/GPU utilization, memory usage and throughput.  These metrics are presented as charts using the `chart.js` library.

The code is organised using modern React (functional components and hooks) and React Router for page navigation.  A separate `api.js` module encapsulates all calls to backend APIs; replacing the placeholder endpoints with your own services will allow the dashboard to display live data.

## Prerequisites

You will need **Node.js (>=16)** and **npm** installed on your machine.  If you do not already have these, download and install them from <https://nodejs.org>.

## Setup Steps

Follow these steps to bootstrap and run the dashboard locally:

1. **Create a React app**.  Navigate to a directory where you want the project to live and run:

   ```bash
   npx create-react-app vision-dashboard
   cd vision-dashboard
   ```

   This scaffolds a React application with the necessary configuration and build scripts.

2. **Install additional dependencies.**  From inside the `vision-dashboard` directory run:

   ```bash
   npm install react-router-dom chart.js react-chartjs-2
   ```

   These packages provide routing and chart components.

3. **Replace the default source files.**  Copy the contents of the `src` directory from this repository into your newly created app’s `src` folder, overwriting existing files.  The key files are:

   - `src/index.js` – entry point that sets up routing and authentication state.
   - `src/App.js` – top‑level component containing the navigation bar and routing logic.
   - `src/components` – reusable components (LoginPage, NavBar, HomePage, etc.).
   - `src/api.js` – helper functions to call backend APIs.

   You can copy these files manually or use a script such as:

   ```bash
   rsync -av <path_to_repository>/vision-dashboard/src/ ./src/
   ```

4. **Run the development server.**  Execute:

   ```bash
   npm start
   ```

   Your browser should open at `http://localhost:3000`, showing the login page.  After logging in (no actual authentication is performed), you will be taken to the home page with cards for each service.

5. **Customise API endpoints.**  Open `src/api.js` and set the `API_BASE_URL` constant to the address of your backend.  Each function (e.g. `fetchDriftMetrics`, `fetchCostMetrics`, `fetchResourceMetrics`) calls a specific endpoint and returns a Promise.  Update these functions to match your server’s API contract.

## Architecture

* **Login page** (`LoginPage.js`)
  
  A simple form that collects a username and password.  On submission, it sets an `isAuthenticated` flag in the root component and redirects to the home page.  The page includes a placeholder logo/icon at the top.

* **Navigation bar** (`NavBar.js`)
  
  A vertical bar displayed on the left side after login.  It lists links to Home, Monitoring Service, Notification Service, Drift Detection Engine, Model Metadata Registration and Business Metrics.  The navigation bar remains visible across pages.

* **Home page** (`HomePage.js`)
  
  Shows cards for each component.  Clicking a card navigates to the corresponding page.  Card details and styling can be customised via props.

* **Monitoring service** (`MonitoringService.js`)
  
  Illustrates how you could monitor model evaluation metrics.  It contains a placeholder for time‑series charts of precision, recall and other metrics.  The Datadog article on ML monitoring notes that you should align your metrics (precision, recall, AU‑ROC, RMSE) with business priorities【780776212558263†L650-L682】 and correlate them with key business KPIs【780776212558263†L683-L699】.  Replace the placeholder with your own chart calls to `fetchMonitoringData()` in `api.js`.

* **Notification service** (`NotificationService.js`)
  
  Describes how the system might send alerts via email, Teams or webhooks.  It references the Fiddler documentation on monitoring: you should configure alerts and rate‑limit notifications to prevent storms during large drift events【823480329544921†L295-L302】.  The page includes a settings form where users can choose notification channels and thresholds.

* **Drift detection engine** (`DriftDetectionEngine.js`)
  
  Provides background on data drift.  It explains that data drift occurs when the statistical properties of input data change over time【823480329544921†L258-L264】 and acts as a proxy for performance decline when ground‑truth labels are delayed【823480329544921†L266-L270】.  The page lists drift metrics such as the **Jensen–Shannon divergence** and **Population Stability Index**【823480329544921†L276-L283】 and describes how to establish a baseline, choose metrics, set thresholds and implement monitoring【823480329544921†L365-L399】.  A “Run Drift Analysis” button calls `fetchDriftMetrics()` from `api.js` and displays the results.

* **Model metadata registration** (`ModelMetadataRegistration.js`)
  
  Contains a form for registering new models (name, version, description, author).  The `handleSubmit` handler calls `registerModel()` in `api.js`.

* **Business metrics** (`BusinessMetrics.js`)
  
  Displays cost and resource‑utilization charts.  Cost metrics include API call costs, infrastructure costs and operation costs【990409115726910†L240-L290】.  Resource‑utilization metrics show CPU/GPU usage, throughput and memory consumption.  Data is loaded from the backend via `fetchCostMetrics()` and `fetchResourceMetrics()`.

## API Integration

All network requests are encapsulated in `src/api.js`.  Each function uses the Fetch API to call an endpoint and returns a Promise.  For example:

```js
export async function fetchDriftMetrics() {
  const response = await fetch(`${API_BASE_URL}/drift/metrics`);
  if (!response.ok) throw new Error('Network error');
  return response.json();
}
```

You should implement corresponding endpoints on your server.  The API should return JSON structures matching the expectations in the React components.  Adjust the code as necessary to match your API schema.

## Next Steps and Considerations

This dashboard is a starting point.  As you refine it for production use, consider:

* **Authentication and authorization** – integrate with your identity provider (e.g. OAuth/OIDC) and implement role‑based access control.
* **Real time updates** – use WebSockets or Server‑Sent Events (SSE) to stream new metrics instead of polling.
* **Persistent storage** – connect forms to a database to store model metadata and user preferences.
* **Customization** – style components with a UI library (e.g. Material‑UI, Ant Design) or your own CSS framework.

By instrumenting your MLOps platform to collect cost, performance and drift metrics and visualizing them in one place, you can align technical observability with business impact.
