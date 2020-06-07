/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Topbar from '@components/Topbar';
import Layout from '@components/Layout';
import { auth, generateUserDocument } from '@services/FireBase';
import Router from 'next/router';
import * as Styles from '@styles/login';
import { UserContext } from '../src/services/Providers/UserProvider';


function Signup() {
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
  const [jobPosition, setJobPosition] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [linkedin, setLinkedin] = useState('');


  const selectCountry = (val) => {
    setCountry(val);
  };
  const selectRegion = (val) => {
    setRegion(val);
  };

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
        await generateUserDocument(user, {
          displayName: name,
          jobPosition,
          country,
          region,
          city,
          linkedin,

        });
        Router.push('/login');
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

  return (
    <Layout>
      <Topbar />
      <Styles.Base>
        <Styles.Container>
          <Styles.Box>
            <h2>Cadastrar</h2>
            <p>
              Preencha o formulário abaixo para se inscrever.
            </p>
            <form>
              {error ? <p className="error">{error}</p> : null}
              <div>
                <label htmlFor="displayName">
                  Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Ex: José Silveira dos Santos"
                  name="displayName"
                  value={name}
                  id="displayName"
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="cargo">
                  Cargo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Analista de Sistemas "
                  name="Cargo"
                  value={jobPosition}
                  id="cargo"
                  onChange={(event) => setJobPosition(event.target.value)}
                  required
                />
              </div>
              <div className="region-info">
                <div className="region-item">
                  <label htmlFor="select-country">
                    País
                  </label>
                  <CountryDropdown
                    className="selector-dropdown"
                    value={country}
                    onChange={(val) => selectCountry(val)}
                    id="select-country"
                    defaultOptionLabel="Selecione o Pais"
                    required
                  />
                </div>
                <div className="region-item">
                  <label htmlFor="select-state">
                    Estado
                  </label>
                  <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(val) => selectRegion(val)}
                    className="selector-dropdown"
                    id="select-state"
                    defaultOptionLabel="Selecione o Estado"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="cidade">
                  Cidade
                </label>
                <input
                  type="text"
                  placeholder="Ex: Curitiba"
                  name="cidade"
                  value={city}
                  id="cidade"
                  onChange={(event) => setCity(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="userEmail">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Ex: joaodasilva@gmail.com"
                  name="userEmail"
                  value={email}
                  id="userEmail"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="linkedin">
                  Linkedin
                </label>
                <input
                  type="text"
                  placeholder="Ex: https://www.linkedin.com/in/joao-silva "
                  name="linkedin"
                  value={linkedin}
                  id="linkedin"
                  onChange={(event) => setLinkedin(event.target.value)}
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
                  onChange={(event) => setPassword(event.target.value)}
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
                      city,
                      country,
                      region,
                      jobPosition,
                    );
                  }}
                >
                  Cadastrar
                </button>
                <p className="text-login">
                  Já tem uma conta?
                  <a href="/login">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </Styles.Box>
        </Styles.Container>
      </Styles.Base>
    </Layout>
  );
}

export default Signup;
