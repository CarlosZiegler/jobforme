/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Link from 'next/link';
import { userSignup } from '@services/auth';

import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Toggle from '@components/Toggle';

import signupImg from '@assets/signupImg.svg';

export default function Signup() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('professional');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (password.toLocaleLowerCase() !== passwordConfirmation.toLocaleLowerCase()) {
      setError({
        message: 'Senhas não sao identicas, por favor verifique sua senha!',
      });
    }
    if (password.toLocaleLowerCase() === passwordConfirmation.toLocaleLowerCase()) setError(null);
  }, [passwordConfirmation, password]);

  const handleSignup = async () => {
    try {
      if (password === passwordConfirmation) {
        const result = await userSignup({
          displayName,
          email,
          password,
          role,
        });
        if (result) {
          return Router.push('/login');
        }
        return setError(result);
      }
      return setError({
        message: 'Senhas não sao identicas, por favor verifique sua senha!',
      });
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-content">
        <img src={signupImg} alt="" className="login-img" />
        <form className="signup-form">
          <h1 className="no-margin text-navy">Inscrever-se</h1>
          <label htmlFor="displayname" className="label">
            Nome de usuario:
          </label>
          <input
            type="text"
            className="form-input"
            id="displayname"
            placeholder="Display Name"
            required
            onChange={e => setDisplayName(e.target.value)}
          />
          <label htmlFor="role" className="label">
            Perfil:
          </label>
          <select
            name="role"
            className="form-input"
            id="role"
            required
            onChange={e => setRole(e.target.value.toLowerCase())}
          >
            <option value="professional">Estou procurando emprego</option>
            <option value="company">Quero contratar profissionais</option>
          </select>
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="text"
            className="form-input"
            id="email"
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value.toLowerCase())}
          />
          <label htmlFor="password" className="label">
            Senha:
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="Senha"
            required
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="label">
            Confirmar Senha:
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="Confirmar senha"
            required
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          {error && <span className="text-danger">{error?.message}</span>}

          <Toggle
            checked={isChecked}
            size="default"
            disabled={false}
            onChange={() => setIsChecked(!isChecked)}
            offstyle="btn-danger"
            onstyle="btn-success"
            text="Aceito os termos e condicoes"
          />
          <button className="btn-green" type="button" onClick={() => handleSignup()}>
            Sign Up
          </button>
          <p className="text-after">
            Ja tem um conta?
            <Link href="/login">Entrar</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}
