import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from "redux"
import sessionReducer from "./session";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  session: sessionReducer
});

let middleware = [ thunk ];

if (process.env.NODE_ENV === 'production') {
  const logger = require('redux-logger').default;
  middleware.push(logger);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

store.

// these will infer the root state and the dispatch type
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// use these instead of the standard dispatch and useSelector for type support
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
