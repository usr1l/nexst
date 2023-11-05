import axios from 'axios';
import {
  createAction,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { setAuthToken } from "../util/session_api_util";

export interface LoginInfo {
  email: string,
  password: string
};

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

export const logout = createAction<null>('logout');
// export const login = createAction<LoginInfo>('login');

// create a thunk, thunkAPI holds api functions like getState and dispatch
const thunkLogout = createAsyncThunk(
  'session/thunkLogin',
  async (data: null, { dispatch }) => {
    // remove the token from local storage
    localStorage.removeItem('jwtToken');

    // remove the token from the common axios header
    setAuthToken(false);
    return;
    // dispatch(logout())
  }
);

export const thunkSignup = createAsyncThunk(
  'session/thunkSignup',
  async (data: UserState, thunkAPI) => {
    const response = await axios.post('/api/users/register', data);
    // const res = unwrapResult(response);
  }
);

// need to return data here to try the thunkLogin.fulfilled route
export const thunkLogin = createAsyncThunk(
  'session/thunkLogin',
  async (data: LoginInfo, thunkAPI) => {
    try {
      const response = await axios.post('/api/users/login', data);
      const { token } = response.data;
      console.log('RES', response, token)
    } catch (error) {

    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    logout: (state) => state = initialState,
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true
    },
    test: (state, action) => {
      console.log('this')
      console.log("payload", action)
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(thunkLogin.fulfilled, (state, action) => {
      //   state.user = action.payload;
      //   state.isAuthenticated = true;
      // })
      // // use this for stricter type checking
      // .addMatcher(isActionWithNumberPayload, (state, action) => {})
      .addDefaultCase((state) => state)
  }
});

export const { login } = sessionSlice.actions;

export default sessionSlice.reducer;






// export const test = createAction<any>('test')

// export const testThunk = createAsyncThunk(
//   'session/test',
//   async (data: any, thunkAPI) => {
//     try {
//       const response = await axios.get('http://localhost:5000/hello/world');
//       console.log('data', test(response.data))
//       thunkAPI.dispatch(test(response.data))
//       return response.data;
//     } catch (error: any) {
//       console.log({ "err": error })
//     }
//   }
// )

// Add into reducer, and use store.getState().counterReducer
// const increment = createAction<number>('counter/increment')
// const decrement = createAction<number>('counter/decrement')
// const counterReducer = createReducer(0, (builder) => {
//   builder.addCase(increment, (state, action) => state + action.payload)
//   builder.addCase(decrement, (state, action) => state - action.payload)
// })
// console.log("counterReducer", counterReducer)

// // For testThunk testing
// const response = dispatch(testThunk(null))
// // use unwrapResult to deal with error and fulfilled statuses
// .then(unwrapResult)
// .then((res) => console.log('RESE', res))
// .catch((err) => console.log(err))
