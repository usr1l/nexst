import * as APIUtil from '../util/session_api_util';
import axios from "axios";
import { User } from '../../../backend/models/User';
import { ReduxThunk } from '../types';
import { Action } from 'redux';

export interface LoginInfo {
  email: string,
  password: string
};

const logoutUser = (): Action => {
  return {
    type: 'USER_LOGOUT'
  }
};

// change this any later
const loginUser = (user: any): Action => {
  return {
    type: 'USER_LOGIN',
    payload: user
  }
};

export const signup: ReduxThunk<User> = (userData) => async (dispatch) => {
  return axios.post('/api/users/register', userData);
};


export const login: ReduxThunk<LoginInfo> = (userData) => async (dispatch) => {
  const res = axios.post('/api/users/login', userData);
};

export const logout: ReduxThunk = () => async (dispatch) => {
  // remove the token from local storage
  localStorage.removeItem('jwtToken');

  // remoev the otoken from the common axios header
  APIUtil.setAuthToken(false)

  // dispatch a logout action
  dispatch(logoutUser());
};


// export const
