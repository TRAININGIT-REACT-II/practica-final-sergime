import React, { useContext } from 'react'
import { Navigate } from "react-router-dom"
import { AuthContext } from '../../auth/context/AuthContext'

export const PrivateRoute = ({ children }) => {

  const { authState } = useContext(AuthContext)

  return (authState.logged)
    ? children
    : <Navigate to="/login" />
}
