import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import App from './App';
import './index.css';

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
