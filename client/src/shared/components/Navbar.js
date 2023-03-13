import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from "../../store/slices/user/userSlice";
import { ConfigContext } from "../context/configContext";
import { THEME } from "../../shared/constants/theme"
import Status from "./Status";
import { DISPLAY } from "../constants/display";
import { setNotes } from "../../store/slices/notes/notesSlice";


export const Navbar = () => {

  const { configState, changeTheme, changeDisplay, reset } = useContext(ConfigContext)
  const dispatch = useDispatch()
  
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState(true)

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch('/api')
    .then((res) => res.json())
    .then((data) => setStatus(data.status === 'ok'))
    .finally(() => setLoading(false))
  }, [])

  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('notes')
    localStorage.removeItem('config')
    dispatch(setNotes([]))
    dispatch(logout())
    reset()
    document.body.classList.value = ""
    navigate('/login', {
        replace: true,
    })
  }

  const handleChangeTheme = () => {
    changeTheme()
  }

  const handleChangeDisplay = () => {
    changeDisplay()
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
      <Link 
        className="navbar-brand" 
        to="/notes"
      >
        Curso de React
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">

          <NavLink 
            className="nav-item nav-link" 
            to="/notes"
          >
            Notes
          </NavLink>
        </div>
        <div className="navbar-nav">

          <NavLink 
            className="nav-item nav-link" 
            to="/notes-add"
          >
            Add note
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse order-3 dual-collapse2 justify-content-end">
        <ul className="navbar-nav ml-auto">
          <div className="me-1">
            <input
              type="checkbox"
              className="btn-check btn-dark btn-rounded"
              id="btn-check-display"
              autoComplete="off"
              onClick={ handleChangeDisplay }
            />
            <label
              className="btn btn-dark btn-rounded"
              title={
                configState.display === DISPLAY.TABLE
                  ? 'Display as table'
                  : 'Display as cards'
              }
              htmlFor="btn-check-display"
            >
              {
                configState.display === DISPLAY.TABLE
                  ? <i className="fas fa-table"></i>
                  : <i className="fas fa-address-card"></i>
              }
            </label>
          </div>
          <div className="me-3">
            <input
              type="checkbox"
              className="btn-check btn-dark btn-rounded"
              id="btn-check-theme"
              autoComplete="off"
              onClick={ handleChangeTheme }
            />
            <label
              className="btn btn-dark btn-rounded"
              title={
                configState.theme === THEME.LIGHT
                  ? 'Light mode'
                  : 'Dark mode'
              }
              htmlFor="btn-check-theme"
            >
              {
                configState.theme === THEME.LIGHT
                  ? <i className="fas fa-sun"></i>
                  : <i className="fas fa-moon"></i>
              }
            </label>
          </div>

          <span className="text-white mt-2">
            Estado del servidor:
            {loading ? ' Cargando...' : <Status status={status} />}
          </span>
          <button 
            className="nav-item nav-link btn" 
            onClick={ onLogout }
          >
            Logout
          </button>
        </ul>
      </div>
    </nav>
  )
}