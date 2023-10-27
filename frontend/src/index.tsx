import React from 'react';
import { BrowserRouter, Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Modal, ModalProvider } from './context/Modal';
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
  <ModalProvider>
    {/* <Provider> */}
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
    {/* </Provider> */}
  </ModalProvider>
);
