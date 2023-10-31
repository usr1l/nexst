import { Action } from "redux";
import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";

export interface SessionStateType {
  session: {
    isAuthenticated: boolean,
    user: any
  }
}

const initialState = {
  isAuthenticated: false,
  user: {}
};


export default function (state = initialState, action: Action) {
  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}
