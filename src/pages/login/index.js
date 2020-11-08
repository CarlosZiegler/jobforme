import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { userLogin } from '@services/auth';

import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

import loginImg from '@assets/imgLogin.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const result = await userLogin(email, password);
    if (result) {
      return Router.push('/main');
    }
    setError(result);
  };
  return (
    <>
      <Navbar />
      <div className="main-content">
        <img src={loginImg} alt="" className="login-img" />
        <form className="login-form">
          <h1 className="no-margin text-navy">Bem vindo de volta!</h1>
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="text"
            id="email"
            className="form-input"
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value.toLowerCase())}
          />
          <label htmlFor="senha" className="label">
            Senha:
          </label>
          <input
            type="password"
            id="senha"
            className="form-input"
            placeholder="Password"
            required
            onChange={e => setPassword(e.target.value)}
          />
          {error && <span className="text-danger">{error?.message}</span>}
          <button className="btn-green" type="button" onClick={() => handleLogin()}>
            LOGIN
          </button>
          <p className="text-after">
            Don't have an account?
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          </p>
        </form>
      </div>
      <Footer />
      {error && error.message && alert(error.message)}
    </>
  );
}
