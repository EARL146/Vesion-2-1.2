import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './lib/theme';
import { RouterProvider } from './lib/router';
import App from './App.jsx';
import './styles/theme.css';
import './styles/components.css';
import './styles/mobile.css';
import './styles/resume.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
