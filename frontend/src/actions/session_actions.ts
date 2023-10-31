import * as APIUtil from '../util/session_api_util';
import { Dispatch } from 'react';
import { Action } from 'redux';

interface SessionActions {
  RECEIVE_USER_LOGOUT: string
};

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

export const logoutUser = () => {
  return {
    type: RECEIVE_USER_LOGOUT
  };
};

export const logout = () => async (dispatch: Dispatch<Action>) => {
  // remove the token from local storage
  localStorage.removeItem('jwtToken');

  // remoev the otoken from the common axios header
  APIUtil.setAuthToken(false)

  // dispatch a logout action
  dispatch(logoutUser());
};
