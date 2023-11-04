import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginFormModal from './components/LoginFormModal';
import { testThunk } from './store/session';
import { useAppDispatch } from './store';
// const is a react functional component, functions are jsx elements
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  console.log('this', dispatch(testThunk(null)));

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
