import axios from "axios";
import sessionReducer from '../store/session'

export const setAuthToken = (token: string | false) => {
  if (token) {
    axios.defaults.headers.common[ 'Authorization' ] = token;
  } else {
    // if falsey value, remove token from memory once user is logged out
    delete axios.defaults.headers.common[ 'Authorization' ];
  }
}
