import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link'
import api from "@services/Api";

import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

import signupImg from '@assets/signupImg.svg'

export default function Signup() {
  const [displayName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState(null)



  const handleSignup = async () => {

    try {
      if (password === passwordConfirmation) {
        const { data } = await api.post("/signup", {
          displayName, email, password
        });
        if (data?.hasOwnProperty('error')) {
          return setError(data.error)
        }
        return Router.push('/login')
      }
      console.log(error)
      setError({ message: "Senhas não sao identicas, por favor verifique sua senha!" })

    } catch (error) {
      console.log(error)
    }
  }

  return (<>
    <Navbar />
    <div className="main-content">
      <img src={signupImg} alt="" className="login-img" />
      <form className="signup-form">
        <h1 className="no-margin text-navy">Inscrever-se</h1>
        <label htmlFor="displayname" className="label">Nome de usuario:</label>
        <input type="text" className="form-input" id="displayname" placeholder="Display Name" required onChange={(e) => setName(e.target.value)} />
        <label htmlFor="email" className="label">Email:</label>
        <input type="text" className="form-input" id="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value.toLowerCase())} />
        <label htmlFor="password" className="label">Senha:</label>
        <input type="password" className="form-input" placeholder="Senha" required onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="password" className="label">Confirmar Senha:</label>
        <input type="password" className="form-input" placeholder="Confirmar senha" required onChange={(e) => setPasswordConfirmation(e.target.value)} />
        <button className="btn-green" type="button" onClick={() => handleSignup()}>Sign Up</button>
        {error && <span className="text-danger">{error?.message}</span>}
        <p className="text-after">Ja tem um conta? <Link href="/login"><a>Entrar</a></Link></p>
      </form>
    </div>
    <Footer />
  </>);
}
