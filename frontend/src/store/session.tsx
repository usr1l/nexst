import { Action } from "redux";
import { createAction, createReducer, AnyAction, PayloadAction } from '@reduxjs/toolkit';

const USER_LOGOUT = "USER_LOGOUT";
const USER_LOGIN = "USER_LOGIN";

const logout = createAction<null>(USER_LOGOUT);
const login = createAction<UserState>(USER_LOGIN);

export interface SessionStateType {
  isAuthenticated: boolean,
  user: any
};

export interface UserState {
  id: number,
  username: string,
  firstname: string,
  lastname: string,
  email: string
};

const initialState: SessionStateType = {
  isAuthenticated: false,
  user: {}
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true
    })
    .addCase(logout, (state, action) => {
      state = initialState;
    })
    // // use this for stricter type checking
    // .addMatcher(isActionWithNumberPayload, (state, action) => {})
    .addDefaultCase((state, action) => state)
});

// function isActionWithNumberPayload(action: AnyAction): action is PayloadAction<number> {
//   return typeof action.payload === 'number'
// }
