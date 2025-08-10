# Vision Dashboard Frontend (React)

This directory contains the React application for the Vision Dashboard.  The UI is built using **Vite**, **React**, **Tailwind CSS** and **Heroicons**, with charts powered by **Chart.js** via **react‑chartjs‑2**.  Framer Motion provides subtle entrance animations and transitions.

The interface follows a dark theme and makes heavy use of reusable components.  The navigation bar on the left allows access to all major features: model registration, business metrics, drift detection, monitoring, notifications, connectors and user management.  Each page fetches data from the Python API (see `../backend`) and visualises it using tables and charts.

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