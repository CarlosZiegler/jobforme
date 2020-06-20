import React, { useState } from 'react';
import Topbar from '@components/Topbar';
import Layout from '@components/Layout';
import { auth } from '@services/FireBase';
import Router from 'next/router';
import * as Styles from '@styles/login';


function PasswordForgetPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const onChangeHandler = event => {
    const { value } = event.currentTarget;
    setEmail(value);
  };

  async function handlePasswordRecovery(e) {
    e.preventDefault();

    try {
      await auth.sendPasswordResetEmail(email);
      try {
        alert(`We are forwarding an email for ${email} to reset your password. Check your inbox. Thanks`);
      } catch (er) {
        setError(er);
      }
    } catch (err) {
      setError(err);
    }
  }

  return (
    <Layout>
      <Topbar />
      <Styles.Base>
        <Styles.Container>
          <Styles.Box>
            <h2>Entrar</h2>
            <form>
              {error ? <p className="error">{error}</p> : null}
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={event => onChangeHandler(event)}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={event => {
                    handlePasswordRecovery(event, email);
                  }}
                >
                  Enviar
                </button>
                <a href="/login">Voltar para Login</a>
              </div>
            </form>
          </Styles.Box>
        </Styles.Container>
      </Styles.Base>
    </Layout>
  );
}

export default PasswordForgetPage;
