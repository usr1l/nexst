import axios from "axios";
import {} from '../../../backend/interfaces'
import { LoginInfo } from "../actions/session_actions";
import { User } from "../../../backend/models/User";

export const setAuthToken = (token: string | false) => {
  if (token) {
    axios.defaults.headers.common[ 'Authorization' ] = token;
  } else {
    // if falsey value, remove token from memory once user is logged out
    delete axios.defaults.headers.common[ 'Authorization' ];
  }
}

export const signup = (userData: User) => {
  return axios.post('/api/users/register', userData);
};

export const login = (userData: LoginInfo) => {
  return axios.post('/api/users/login', userData);
};
