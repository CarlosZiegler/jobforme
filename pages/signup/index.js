import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link'
import api from "@services/Api";

import Navbar from '@components/Navbar'

export default function Signup() {
  const [displayName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)


  const handleSignup = async () => {
    try {
      const { data } = await api.post("/signup", {
        displayName, email, password
      });
      if (data?.hasOwnProperty('error')) {
        return setError(data.error)
      }
      Router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (<>
    <Navbar />
    <div className="content">
      <h1 className="no-margin text-navy">Signup</h1>
      <p className="no-margin text-gray">Enter your details and get connected!</p>
      <br />
      <form className="signup-form">
        <input type="text" className="" placeholder="Display Name" required onChange={(e) => setName(e.target.value)} />
        <input type="text" className="" placeholder="Email" required onChange={(e) => setEmail(e.target.value.toLowerCase())} />
        <input type="password" className="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-coral" type="button" onClick={() => handleSignup()}>Sign Up</button>
      </form>
      {error && <span>{error?.message}</span>}
      <br />
      <p className="text-gray">Already have an account? <Link href="/login"><a>Login</a></Link></p>
    </div>
  </>);
}
