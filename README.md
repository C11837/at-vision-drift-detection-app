# Vision Dashboard Frontend (React)

This directory contains the React application for the Vision Dashboard.  The UI is built using **Vite**, **React**, **Tailwind CSS** and **Heroicons**, with charts powered by **Chart.js** via **react‑chartjs‑2**.  Framer Motion provides subtle entrance animations and transitions.

The interface follows a dark theme and makes heavy use of reusable components.  The navigation bar on the left allows access to all major features: model registration, business metrics, drift detection, monitoring, notifications, connectors and user management.  Each page fetches data from the Python API (see `../backend`) and visualises it using tables and charts.

Across the top of the application a **breadcrumb bar** shows your current location and provides quick navigation back to previous sections.  To the right of the breadcrumbs you’ll find a notification bell (with unread count), a user management icon, and a **logout** button.  These controls are available from any page once you are signed in.

## Prerequisites

* **Node.js (version 18+)** – the frontend relies on Vite for development and build.  Download Node.js from [nodejs.org](https://nodejs.org/) if it is not already installed.

## Setup

Install dependencies from within the `frontend` directory:

```sh
npm install
```

To run the development server:

```sh
npm run dev
```

By default the app assumes the backend API is running at `http://localhost:8000`.  You can override this by creating a `.env` file in the `frontend` directory and defining `VITE_API_URL`:

```sh
VITE_API_URL=http://localhost:8000
```

Then restart the dev server.  When both the frontend and backend are running you should be able to sign in at <http://localhost:5173/login> using the default credentials (`user` / `password`).  After authentication you will be redirected to the dashboard.

### Model Metadata Registration Workflow

On the **Model Metadata** page you will be prompted to choose whether the data for a new model is **restricted** or not:

* **Restricted** – If you select “Yes”, the UI displays instructions and a link to download the Python client module from the backend.  Run this module on the machine where the data resides.  The script calculates model statistics locally using the helper functions from `data_generator.py` and then posts only the aggregate metrics back to the server.  Once uploaded the model will appear in the Registered Models page.

* **Unrestricted** – If you select “No”, a form is displayed where you can enter the model name, choose a connector and provide paths to the training and production data.  Submitting the form triggers the server to compute the metrics immediately (dummy calculations in the prototype).  The computed metrics are displayed and the new model is added to the registry.

## Building for Production

To build an optimised production bundle run:

```sh
npm run build
```

The built files will be output to the `dist` directory.  You can serve them with any static file server or integrate them with the Python backend using a reverse proxy.

## Extending the Frontend

* **Adding New Features** – create new pages in the `src/pages` directory and add routes in `App.jsx`.  Use the `useApi` hook from `src/api.js` to call new backend endpoints.  Follow the existing pattern of state management with hooks.
* **Styling** – Tailwind CSS is used throughout the project.  Adjust colours and spacing via `tailwind.config.js`.  Additional components (buttons, modals) can be sourced from headless UI libraries or built manually.
* **Integrations** – if you enable more connectors or metrics on the backend, you can surface them here by creating new cards on the home page and corresponding pages for detail views.

For any questions or suggestions about the UI, feel free to explore the components and pages to understand how the layout and styling work together.