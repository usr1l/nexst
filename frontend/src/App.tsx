import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import LoginFormModal from './components/LoginFormModal';
import { useAppDispatch } from './store';
import './App.css';
import { thunkLogin } from './store/session';

// const is a react functional component, functions are jsx elements
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const response = dispatch(thunkLogin({ "email": 'aa@a.io', "password": "password1" }));

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
      <Route path='/' element={<LoginFormModal />} />
      <Route path='/home' element={<HomePage />} />
    </Routes>
  );
}

export default App;
