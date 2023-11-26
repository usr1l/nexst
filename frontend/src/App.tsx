import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import LoginFormModal from './components/LoginFormModal';
import { useAppDispatch } from './store';
import './App.css';
import { thunkLogin, thunkRestoreUser } from './store/session';
import Navigation from './components/Navigation';

// const is a react functional component, functions are jsx elements
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
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(thunkRestoreUser(null)).then(() => setIsLoaded(true))
  }, [ dispatch ]);
  const [ isLoaded, setIsLoaded ] = useState<boolean>(false);

  return (
    <>
      <Navigation isLoaded={isLoaded}></Navigation>
      {isLoaded && (
        <Routes>
          {/* <Route path='/' element={<LoginFormModal />} /> */}
          <Route path='/' element={<HomePage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
