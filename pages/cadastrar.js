/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import Topbar from '@components/Topbar';
import Layout from '@components/Layout';
import { auth, generateUserDocument } from '@services/FireBase';
import Router from 'next/router';
import * as Styles from '@styles/login';
import { UserContext } from '../src/services/Providers/UserProvider';

function Cadastrar() {
  const userl = useContext(UserContext);

  React.useEffect(() => {
    if (userl != null) {
      Router.push('/dashboard');
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

    if (email.length < 1) {
      setError('Campo do email vazio !');
    } else if (password.length < 1) {
      setError('Campo da senha vazio !');
    } else if (name.length < 1) {
      setError('Campo da nome vazio !');
    } else {
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
    }
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
      <Styles.Base>


        <Styles.Container>
          <Styles.Box>

            <h2>Cadastrar</h2>
            <p>
        Preencha o formulário abaixo para se inscrever. Já se inscreveu? Então apenas
              <a href="/login">Entre</a>
            </p>

            <form>
              {error ? <p className="error">{error}</p> : null}
              <div>
                <label htmlFor="displayName">
                    Nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  name="displayName"
                  value={name}
                  id="displayName"
                  onChange={(event) => onChangeHandler(event)}
                  required
                />

              </div>
              <div>
                <label htmlFor="userEmail">
                    Email
                </label>
                <input
                  type="email"
                  placeholder="Seu email"
                  name="userEmail"
                  value={email}
                  id="userEmail"
                  onChange={(event) => onChangeHandler(event)}
                  required
                />

              </div>
              <div>
                <label htmlFor="userPassword">
                    Senha
                </label>
                <input
                  type="password"
                  placeholder="******"
                  name="userPassword"
                  value={password}
                  id="userPassword"
                  onChange={(event) => onChangeHandler(event)}
                  required
                />

              </div>
              <div>
                <button
                  type="submit"
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
          </Styles.Box>
        </Styles.Container>
      </Styles.Base>
    </Layout>
  );
}

export default Cadastrar;
