import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import CardJobs from '@components/CardJobs';
import api from '@services/Api';


export default function Main() {
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  const [showVacancies, setShowVacancies] = useState([]);
  const [findField, setFindField] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    setToken(localStorage?.getItem('token'));
  }, [isReady]);

  useEffect(() => {
    getUserProfile();
  }, [token]);

  useEffect(() => {
    if (token === null && isReady === true) {
      Router.push('/login');
    }
  }, [isReady, token]);

  useEffect(() => {
    if (user != null && user?.role === 'company') {
      console.log(user);
      setVacancies(user.vacancies);
    }
  }, [user]);

  const getUserProfile = async () => {
    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await api.get('/user', config);
        if (data?.hasOwnProperty('error')) {
          return setError(data.error);
        }
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isReady || !token || !user) return null;

  return (
    <>
      <Navbar />
      <div className="main-content">
        <h1>Main</h1>
        {user && (
          <>
            <h1>
Ola
              {user.displayName}
            </h1>
            <div className="options-container">
              <a href="/profile" className="options-item">Meu Perfil</a>
              {user?.role === 'professional' && (
                <>
                  <Link href="/profile">
                    <a className="options-item">Perfil Profissional</a>
                  </Link>
                  <Link href="/vagas">
                    <a className="options-item">Ir para Vagas</a>
                  </Link>
                </>
              )}
              {user?.role === 'company' && (
                <Link href="/adicionar-vagas">
                  <a className="options-item">Adicionar Vaga</a>
                </Link>
              )}
            </div>
          </>
        )}
        {/* {vacancys && <vacancys vacancys={showvacancys} />} */}
        <div className="searchbar">
          {user?.role === 'company' && (
            <>
              <div className="jobs-container">
                {vacancies && (
                  <>
                    {vacancies.map(vacancy => <CardJobs key={vacancy._id} job={vacancy} />)}
                  </>
                )}

              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>


  );
}
