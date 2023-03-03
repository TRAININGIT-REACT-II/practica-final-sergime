import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from "../../store/slices/user/userSlice";
import { ConfigContext } from "../context/configContext";
import Status from "./Status";


export const Navbar = () => {

  const { configState, changeTheme } = useContext(ConfigContext)
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
      dispatch(logout())
      localStorage.removeItem('user')
      navigate('/login', {
          replace: true,
      })
  }

  const handleChangeTheme = () => {
    changeTheme()
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
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 justify-content-end">
        <ul className="navbar-nav ml-auto">
          <div className="me-3">
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check"
              autoComplete="off"
              onClick={ handleChangeTheme }
            />
            <label
              className="btn btn-primary"
              htmlFor="btn-check"
            >
              Modo: { configState.theme }
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