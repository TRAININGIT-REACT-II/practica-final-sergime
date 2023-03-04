import React, { useContext } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"

import { Navbar } from "../../shared/components/Navbar"
import { THEME } from "../../shared/constants/theme"
import { ConfigContext } from "../../shared/context/configContext"
import { AddNotePage } from "../pages/AddNotePage"
import { EditNotePage } from "../pages/EditNotePage"
import { NotesPage } from "../pages/NotesPage"

export const NotesRoutes = () => {

  const { configState } = useContext(ConfigContext)

  const themeClass = configState.theme === THEME.DARK ? ' dark' : ''

  return (
    <>
      <div className={ themeClass }>
        <Navbar />
        
        <div className="container">
          <Routes>
            <Route path="/notes" element={ <NotesPage /> } />
            <Route path="/notes-add" element={ <AddNotePage /> } />
            <Route path="/notes-edit/:id" element={ <EditNotePage /> } />

            <Route path="/*" element={ <Navigate to="/notes" /> } />
          </Routes>
        </div>
      </div>
    </>
  )
}
