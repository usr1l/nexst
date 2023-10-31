import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World</h1>
      </header>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  );
}

export default App;
