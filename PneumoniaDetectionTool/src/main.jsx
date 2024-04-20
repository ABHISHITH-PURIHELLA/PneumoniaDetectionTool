import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Getting the root container to mount the app
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create a root.

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
