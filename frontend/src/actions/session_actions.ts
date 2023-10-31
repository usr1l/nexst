import * as APIUtil from '../util/session_api_util';
import axios from "axios";
import { User } from '../../../backend/models/User';
import { ReduxAction, ReduxThunk } from '../types';
import { UserState } from '../store/session';

export interface LoginInfo {
  email: string,
  password: string
};

const logoutUser: ReduxAction = () => ({
  type: 'USER_LOGOUT'
});

const loginUser: ReduxAction<UserState> = (user) => ({
  type: 'USER_LOGIN',
  payload: user
});

export const thunkSignup: ReduxThunk<User> = (userData) => async (dispatch) => {
  axios.post('/api/users/register', userData);
};


export const thunkLogin: ReduxThunk<LoginInfo> = (userData) => async (dispatch) => {
  const res = axios.post('/api/users/login', userData);
};

export const thunkLogout: ReduxThunk = (data = null) => async (dispatch) => {
  // remove the token from local storage
  localStorage.removeItem('jwtToken');

  // remoev the otoken from the common axios header
  APIUtil.setAuthToken(false)

  // dispatch a logout action
  dispatch(logoutUser(null));
};


// export const
