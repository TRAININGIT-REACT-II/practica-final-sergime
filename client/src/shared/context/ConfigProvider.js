import React, { useReducer } from 'react'
import { DISPLAY } from "../constants/display"
import { THEME } from "../constants/theme"
import { ConfigContext } from "./configContext"
import { configReducer, doChangeDisplay, doChangeTheme } from "./configReducer"

const init = () => {
  return JSON.parse(localStorage.getItem('config')) || {
    theme: THEME.LIGHT,
    display: DISPLAY.TABLE,
  }
}

export const ConfigProvider = ({ children }) => {

  const [configState, dispatch] = useReducer(configReducer, {}, init)

  const changeTheme = () => {

    const theme = configState.theme === THEME.LIGHT 
                    ? THEME.DARK
                    : THEME.LIGHT

    const config = {
      ...configState,
      theme,
    }

    localStorage.setItem('config', JSON.stringify(config))
    dispatch(doChangeTheme(theme))
  }

  const changeDisplay = () => {

    const display = configState.display === DISPLAY.TABLE 
                    ? DISPLAY.CARDS
                    : DISPLAY.TABLE

    const config = {
      ...configState,
      display,
    }

    localStorage.setItem('config', JSON.stringify(config))
    dispatch(doChangeDisplay(display))
  }

  return (
    <ConfigContext.Provider value={{
      configState,
      changeTheme,
      changeDisplay,
    }}>
      { children }
    </ConfigContext.Provider>
  )
}
