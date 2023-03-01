import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import useApi from "../../shared/hooks/useApi"
import { useForm } from "../../shared/hooks/useForm"
import { AuthContext } from "../context/AuthContext"

export const LoginForm = ({ change }) => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const initialForm = { username: '', password: '' }
  const [ formValues, handleInputChange ] = useForm( initialForm )

  // Definimos la llamada para login
  const loginRequest = useApi("/api/login", "", {}, false);

  let token;
  if (loginRequest.data) {
    console.log(loginRequest.data)
    // token = loginRequest.data.token;
    // login('Sergi')
    // navigate('/', {
    //   replace: true,
    // })
  }

  // Función para iniciar sesión en la aplicación
  const onLogin = () => {
    loginRequest.updateParams({
      method: "POST",
      body: JSON.stringify({
        // En un caso real, estos datos vienen de
        // un formulario.
        username: formValues.username,
        password: formValues.password,
      }),
    });
    loginRequest.perform();
  };

  return (
    <form className="login-register-form">
      <h4>Login</h4>
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
        onClick={ onLogin }
      >
        Sign in
      </button>

      {/* <!-- Register buttons --> */}
      <div className="text-center">
        <p>
          Not a member?&nbsp;
          <a
            href="#!"
            onClick={ change }
          >
            Register</a>
        </p>
      </div>
    </form>
  )
}
