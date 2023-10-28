import React from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Modal, ModalProvider } from './context/Modal';
import App from './App';
import './index.css';
import { setAuthToken } from './util/session_api_util';
import jwtDecode from 'jwt-decode';
import configureStore from './actions';

interface SessionStateType {
  session: {
    isAuthenticated: boolean,
    user: any
  }
}

const Root: React.FC = ({ store }) => {
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

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // check for if user has session token in localStorage
  if (localStorage.jwtToken) {

    // set token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // decode the token to obtain the user's information
    const decodedUser = jwtDecode(localStorage.jwtToken);

    // create a preconfigured state we can immediately add to our store
    const preloadedState: SessionStateType = { session: { isAuthenticated: true, user: decodedUser } }

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    // if the user's token is expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirct to the login page
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    // if this user is new, start with empty store
    store = configureStore({});
  }

  // render our root component and pass in the store as prop
  const root = document.getElementById('root') as HTMLElement;

  ReactDOM.render(
    <React.StrictMode>
      <Root store={store} />
    </React.StrictMode>,
    root
  );
});



// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <ModalProvider>
//     <Provider>
//       <React.StrictMode>
//         <Root />
//       </React.StrictMode>
//     </Provider>
//   </ModalProvider>
// );
