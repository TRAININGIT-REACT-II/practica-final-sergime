import { types } from "../types/types";

export const authReducer = (state = {}, action) => {

  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload,
      }
    case types.logout:
      return {
        logged: false,
      }      
    default:
      return state
  }

}

export const doLogin = (user = '') => {
  return {
    type: types.login,
    payload: user,
  }
}

export const doLogout = () => {
  return {
    type: types.logout,
  }
}