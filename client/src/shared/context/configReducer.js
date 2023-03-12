import { DISPLAY } from "../constants/display";
import { THEME } from "../constants/theme";
import { types } from "../types/types";

export const configReducer = (state = {}, action) => {
  switch (action.type) {
    case types.changeTheme:
      return {
        ...state,
        theme: action.payload,
      }
    case types.changeDisplay:
      return {
        ...state,
        display: action.payload,
      }
    default:
      return state
  }

}

export const doChangeTheme = (theme = THEME.LIGHT) => {
  return {
    type: types.changeTheme,
    payload: theme,
  }
}

export const doChangeDisplay = (display = DISPLAY.TABLE) => {
  return {
    type: types.changeDisplay,
    payload: display,
  }
}
