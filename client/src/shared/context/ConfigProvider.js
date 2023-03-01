import React, { useReducer } from 'react'
import { THEME } from "../constants/theme"
import { ConfigContext } from "./configContext"
import { configReducer, doChangeTheme } from "./configReducer"

const init = () => {
  return JSON.parse(localStorage.getItem('config')) || {
    theme: THEME.LIGHT,
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

  return (
    <ConfigContext.Provider value={{
      configState,
      changeTheme,
    }}>
      { children }
    </ConfigContext.Provider>
  )
}
