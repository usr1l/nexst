import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginFormModal from './components/LoginFormModal';
import { testThunk } from './store/session';
import { useAppDispatch } from './store';
import { unwrapResult } from '@reduxjs/toolkit';
import { test } from './store/session'

// const is a react functional component, functions are jsx elements
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const response = dispatch(testThunk(null))
    .then(unwrapResult)
    .then((res) => console.log('RESE', res))
    .catch((err) => console.log(err))
  // dispatch(test('this'))
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
