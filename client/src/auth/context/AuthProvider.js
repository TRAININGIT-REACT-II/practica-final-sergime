import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer, doLogin, doLogout } from './authReducer'

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  return {
    logged: !!user,
    user: user,
  }
}

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, {}, init)

  const login = (name = '') => {

    const user = {
      id: 'aaa',
      name,
    }

    localStorage.setItem('user', JSON.stringify(user))

    dispatch(doLogin(name))
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('notes')
    localStorage.removeItem('config')
    dispatch(doLogout())
  }

  return (
    <AuthContext.Provider value={{
      authState,

      login,
      logout,
    }}>
      { children }
    </AuthContext.Provider>
  )
}
