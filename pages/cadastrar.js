/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import Topbar from '@components/Topbar';
import Layout from '@components/Layout';
import { auth, generateUserDocument } from '@services/FireBase';
import Router from 'next/router';
import { UserContext } from '../src/services/Providers/UserProvider';

function Cadastrar() {
  const userl = useContext(UserContext);

  React.useEffect(() => {
    if (userl != null) {
      Router.push('/Dashboard');
    }
  }, [userl]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [name, setName] = useState('');

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password,
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      generateUserDocument(user, { displayName: name });
    } catch (error) {
      // setError('Error Signing up with email and password', error.code);
      if (error.code === 'auth/invalid-email') {
        setError('Email inválido !');
      } else if (error.code === 'auth/weak-password') {
        setError('Senha deve ter no mínimo 6 caracteres !');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('Email já cadastrado !');
      } else {
        setError(error.message);
      }
    }

    setEmail('');
    setPassword('');
    setName('');
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    } else if (name === 'displayName') {
      setName(value);
    }
  };

  return (
    <Layout>
      <Topbar />
      <div>
        <h2>Cadastrar</h2>
        <p>
        Preencha o formulário abaixo para se inscrever. Já se inscreveu? Então apenas
          <a href="/login">Entre</a>
        </p>

        <form>
          {error ? <p>{error}</p> : null}
          <div>
            <input
              type="text"

              name="displayName"
              value={name}
              id="displayName"
              onChange={(event) => onChangeHandler(event)}
              required
            />
            <label htmlFor="displayName">
                    Nome
            </label>
          </div>
          <div>
            <input
              type="email"

              name="userEmail"
              value={email}
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
              required
            />
            <label htmlFor="userEmail">
                    Email
            </label>
          </div>
          <div>
            <input
              type="password"

              name="userPassword"
              value={password}
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
              required
            />
            <label htmlFor="userPassword">
                    Senha
            </label>
          </div>
          <div>
            <button
              onClick={(event) => {
                createUserWithEmailAndPasswordHandler(
                  event,
                  email,
                  password,
                );
              }}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Cadastrar;
