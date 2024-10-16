import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18+ uses createRoot from react-dom/client
import './index.css'; // Include your global styles if necessary
import App from './App'; // Import the App component

// Find the root DOM element
const rootElement = document.getElementById('root');

// Create the root using the createRoot API
const root = createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
