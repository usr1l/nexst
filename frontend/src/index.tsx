import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  )
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
