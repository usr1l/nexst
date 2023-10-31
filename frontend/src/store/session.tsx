import { Action } from "redux";
import { createAction, createReducer, AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

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

export default createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    logout: (state) => state = initialState,
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    // .addCase(someAction, (state, action) => {})
    // // use this for stricter type checking
    // .addMatcher(isActionWithNumberPayload, (state, action) => {})
  }
})


// // create action types
// const USER_LOGOUT = "USER_LOGOUT";
// const USER_LOGIN = "USER_LOGIN";
// const logout = createAction<undefined>(USER_LOGOUT);
// const login = createAction<UserState>(USER_LOGIN);

// function isActionWithNumberPayload(action: AnyAction): action is PayloadAction<number> {
//   return typeof action.payload === 'number'
// }
// export default createReducer(initialState, (builder) => {
//   builder
//     .addCase(login, (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true
//     })
//     .addCase(logout, (state, action) => {
//       state = initialState;
//     })
//     .addDefaultCase((state, action) => state)
// });
