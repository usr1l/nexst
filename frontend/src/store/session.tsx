import { Action } from "redux";

const USER_LOGOUT = "USER_LOGOUT";
const USER_LOGIN = "USER_LOGIN";


export interface SessionStateType {
  isAuthenticated: boolean,
  user: any
}

// export interface UserStateSlice

const initialState: SessionStateType = {
  isAuthenticated: false,
  user: {}
};

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}
