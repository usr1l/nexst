import { createStore, applyMiddleware } from 'redux';

import createLogger from 'redux-logger';
import rootReducer from '../store';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => {
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, createLogger)
  )
};

export default configureStore;
