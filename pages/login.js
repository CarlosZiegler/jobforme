/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import Topbar from '@components/Topbar';
import Layout from '@components/Layout';
import { auth } from '@services/FireBase';
import Router from 'next/router';
import * as Styles from '@styles/login';
import { UserContext } from '@services/Providers/UserProvider';

function Login() {
  const user = useContext(UserContext);

  React.useEffect(() => {
    if (user != null) {
      Router.push('/dashboard');
    }
  }, [user]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();

    if (email.length < 1) {
      setError('Campo do email vazio !');
    } else if (password < 1) {
      setError('Campo da senha vazio !');
    } else {
      auth.signInWithEmailAndPassword(email, password).then(() => {
        Router.push('/dashboard');
      }).catch(error => {
        if (error.code === 'auth/invalid-email') {
          setError('Email inválido !');
        } else if (error.code === 'auth/user-not-found') {
          setError('Usuário não encontrado!');
        } else if (error.code === 'auth/wrong-password') {
          setError('Senha inválida!');
        } else {
          setError(error.message);
        }
      });
    }
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  return (
    <Layout>
      <Topbar />
      <Styles.Base>
        <Styles.Container>
          <Styles.Box>
            <h2>Entrar</h2>
            <p>
              Não tem cadastro ? Então
              {' '}
              <a href="/signup">Cadastra-se aqui</a>
            </p>

            <form>
              {error ? <p className="error">{error}</p> : null}
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="userEmail"
                  value={email}
                  onChange={event => onChangeHandler(event)}
                  required
                />
              </div>
              <div>
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  placeholder="Senha"
                  name="userPassword"
                  value={password}
                  onChange={event => onChangeHandler(event)}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={event => {
                    signInWithEmailAndPasswordHandler(event, email, password);
                  }}
                >
                  Entrar
                </button>
              </div>
            </form>
          </Styles.Box>
        </Styles.Container>
      </Styles.Base>
    </Layout>
  );
}

export default Login;
