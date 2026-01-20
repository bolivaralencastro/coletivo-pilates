import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import clarity from '@microsoft/clarity';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

if (import.meta.env.PROD) {
  clarity.init('v4f2q6wmzm');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
