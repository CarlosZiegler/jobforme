/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Router from 'next/router';

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
    } catch (err) {
      // console.log(err);
    }
  };

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
      // console.log(user);
      setVacancies(user.vacancies);
    }
  }, [user]);
  const findOrders = () => {
    const result = vacancies.filter(
      // eslint-disable-next-line comma-dangle
      order => order?._id.includes(findField) || order.tableId?.number.includes(findField)
    );
    return setShowVacancies(result);
  };

  useEffect(() => {
    findOrders();
  }, [findField]);

  if (!isReady || !token || !user) return null;

  return (
    <>
      <Navbar />
      <div className="main-content">
        <h1>Dashboard</h1>
        {user && (
          <>
            <h1>
              Ola
              {user.displayName}
            </h1>
            <div className="options-container">
              <a href="/profile" className="options-item">
                Meu Perfil
              </a>

              {user?.role === 'professional' && (
                <>
                  <a href="/profile" className="options-item">
                    Perfil Profissional
                  </a>

                  <a href="/vagas" className="options-item">
                    Ir para Vagas
                  </a>
                </>
              )}
              {user?.role === 'company' && (
                <a href="/adicionar-vagas" className="options-item">
                  Adicionar Vaga
                </a>
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
                    {vacancies.map(vacancy => (
                      <CardJobs key={vacancy?._id} job={vacancy} />
                    ))}
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
