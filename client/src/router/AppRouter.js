import React from 'react'
import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { NotesRoutes } from "../notes/router/NotesRoutes"
import { PrivateRoute } from "../notes/router/PrivateRoute"
import { PublicRoute } from "../notes/router/PublicRoute"

export const AppRouter = () => {
  return (
    <>
      <Routes>

        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />

        <Route path="/*" element={
          <PrivateRoute>
            <NotesRoutes />
          </PrivateRoute>
        } />

      </Routes>
    </>
  )
}
