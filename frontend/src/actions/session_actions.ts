import * as APIUtil from '../util/session_api_util';
import { Dispatch } from 'react';
import { Action } from 'redux';

export interface LoginInfo {
  email: string,
  password: string
};

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const USER_SIGN_IN = "USER_SIGN_IN";

export const logoutUser = () => {
  return {
    type: RECEIVE_USER_LOGOUT
  };
};

export const login = (userData: LoginInfo) => async (dispatch: Dispatch<Action>) => {
  APIUtil.login(userData).then((res) => {
    console.log("DATA", res.data, res.data.token);
  })
};

export const logout = () => async (dispatch: Dispatch<Action>) => {
  // remove the token from local storage
  localStorage.removeItem('jwtToken');

  // remoev the otoken from the common axios header
  APIUtil.setAuthToken(false)

  // dispatch a logout action
  dispatch(logoutUser());
};


// export const
