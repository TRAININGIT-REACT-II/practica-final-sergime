import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"

import { Navbar } from "../../shared/components/Navbar"
import { THEME } from "../../shared/constants/theme"
import { ConfigContext } from "../../shared/context/configContext"
import { AddNotePage } from "../pages/AddNotePage"
import { EditNotePage } from "../pages/EditNotePage"
import { NotesPage } from "../pages/NotesPage"
import { ViewNotePage } from "../pages/ViewNotePage"

export const NotesRoutes = () => {

  const { configState } = useContext(ConfigContext)

  const themeClass = configState.theme === THEME.DARK ? 'dark' : 'light'

  // Para aplicar el theme global, vamos a aplicar una clase al elemento
  // body. Luego, cada componente debera realizar sus cambios necesarios
  useEffect(() => {
    // En este caso, document.body no debe de mutar ya que React no
    // modifica dicho nodo. Por ello, es seguro acceder a el sin hacer
    // uso de referencias
    if (document.body.classList.value == "") {
      document.body.classList.add(themeClass);
    } else {
      document.body.classList.replace(
        document.body.classList.value,
        themeClass
      );
    }

  }, [configState.theme]);

  return (
    <>
      <div>
        <Navbar />
        
        <div className="container">
          <Routes>
            <Route path="/notes" element={ <NotesPage /> } />
            <Route path="/notes-add" element={ <AddNotePage /> } />
            <Route path="/notes-edit/:id" element={ <EditNotePage /> } />
            <Route path="/notes-view/:id" element={ <ViewNotePage /> } />

            <Route path="/*" element={ <Navigate to="/notes" /> } />
          </Routes>
        </div>
      </div>
    </>
  )
}
