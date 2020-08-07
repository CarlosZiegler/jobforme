import React, { useState } from 'react';
import Router from 'next/router'
import Link from 'next/link'

import api from "@services/Api";
import Navbar from '@components/Navbar'

export default function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/login", {
        email, password
      });
      if (data?.hasOwnProperty('error')) {
        return setError(data.error)
      }
      localStorage.clear()
      localStorage.setItem('token', data?.token)
      localStorage.setItem('user', data?.user)
      Router.push('/main')
    } catch (error) {
      console.log(error)
    }
  }

  return (<>
    <Navbar />
    <div className="content">
      <h1 className="no-margin text-navy">Login</h1>
      <p className="no-margin text-gray">Welcome back!</p>
      <br />
      <form className="login-form">
        <input type="text" className="" placeholder="Email" required onChange={(e) => setEmail(e.target.value.toLowerCase())} />
        <input type="password" className="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-green" type="button" onClick={() => handleLogin()}>LOGIN</button>
        {error && <span>{error?.message}</span>}
      </form>
      <br />
      <p className="text-gray">Don't have an account? <Link href="/signup"><a>signup</a></Link></p>
    </div>
  </>);
}
