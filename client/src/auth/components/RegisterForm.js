import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useApi from "../../shared/hooks/useApi"
import { useForm } from "../../shared/hooks/useForm"
import { login } from "../../store/slices/user/userSlice"

export const RegisterForm = ({ change }) => {
  const navigate = useNavigate()
  // const { user } = useSelector( state => state.user )
  const dispatch = useDispatch()

  const initialForm = { username: '', password: '' }
  const [formValues, handleInputChange] = useForm(initialForm)

  // Definimos la llamada para login
  const loginRequest = useApi("/api/register", "", {}, false);

  useEffect(() => {
    if (loginRequest.data) {
      const user = loginRequest.data
      localStorage.setItem('user', JSON.stringify({
        logged: !!user,
        user
      }))
      dispatch(login(user))
    }
  }, [loginRequest])


  // Función para iniciar sesión en la aplicación
  const onRegister = () => {
    loginRequest.updateParams({
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    loginRequest.perform();
  };

  return (
    <form className="login-register-form">
      <h4>Register</h4>
      {/* <!-- Email input --> */}
      <div className="form-outline mb-4">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          className="form-control"
          value={ formValues.username }
          onChange={ handleInputChange }
        />
      </div>

      {/* <!-- Password input --> */}
      <div className="form-outline mb-4">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="form-control"
          value={ formValues.password }
          onChange={ handleInputChange }
        />
      </div>

      {/* <!-- Submit button --> */}
      <button
        type="button"
        className="btn btn-primary btn-block mb-4"
        onClick={ onRegister }
      >
        Register
      </button>

      {/* <!-- Register buttons --> */}
      <div className="text-center">
        <p>
          Already a member?&nbsp;
          <a
            href="#"
            onClick={ change }
          >
            Sign in
          </a>
        </p>
      </div>
    </form>
  )
}
