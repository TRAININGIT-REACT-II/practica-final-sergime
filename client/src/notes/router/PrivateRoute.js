import React, { useContext } from 'react'
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const PrivateRoute = ({ children }) => {

  const user = useSelector( state => state.user )

  return (user.logged)
    ? children
    : <Navigate to="/login" />
}
