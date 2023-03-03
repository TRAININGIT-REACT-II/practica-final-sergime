import React from 'react'
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const PublicRoute = ({ children }) => {

  const user = useSelector( state => state.user )

  return (!user.logged)
    ? children
    : <Navigate to="/notes" />
}
