import axios from "axios";

export const setAuthToken = (token: string | false) => {
  if (token) {
    axios.defaults.headers.common[ 'Authorization' ] = token;
  } else {
    // if falsey value, remove token from memory once user is logged out
    delete axios.defaults.headers.common[ 'Authorization' ];
  }
}
