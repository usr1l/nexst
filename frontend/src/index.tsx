import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Modal, ModalProvider } from './context/Modal';
import App from './App';
import store from './store';
import './index.css';

// const store = configureStore();

const Root: React.FC = () => {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);


// document.addEventListener('DOMContentLoaded', () => {

//   // check for if user has session token in localStorage
//   if (localStorage.jwtToken) {

//     // set token as a common header for all axios requests
//     setAuthToken(localStorage.jwtToken);

//     // decode the token to obtain the user's information
//     const decodedUser: UserJWT = jwtDecode(localStorage.jwtToken);

//     // create a preconfigured state we can immediately add to our store
//     const preloadedState: SessionStateType = { session: { isAuthenticated: true, user: decodedUser } }

//     store = configureStore(preloadedState);

//     const currentTime = Date.now() / 1000;

//     // if the user's token is expired
//     if (decodedUser.exp < currentTime) {
//       // Logout the user and redirct to the login page
//       store.dispatch(logout());
//       window.location.href = '/login';
//     }
//   } else {
//     // if this user is new, start with empty store
//     store = configureStore();
//   }

//   // render our root component and pass in the store as prop
//   const root =
// });
