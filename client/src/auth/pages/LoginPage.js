import React, { useState } from 'react'
import { LoginForm } from "../components/LoginForm"
import { RegisterForm } from "../components/RegisterForm"

export const LoginPage = () => {

  const [loginOrRegister, setLoginOrRegister] = useState(0)

  return (
    <div className="container">
      <h1>TrainingNotes</h1>
      <hr />
      <div className="d-flex flex-col justify-content-center align-items-center">
        {
          (
            loginOrRegister === 0 
            ? <LoginForm change={ () => setLoginOrRegister(1) } />
            : <RegisterForm change={ () => setLoginOrRegister(0) } />
          )
        }
      </div>
    </div>
  )
}
