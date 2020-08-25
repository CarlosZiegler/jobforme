import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Navbar from '@components/Navbar'
import SearchBar from '@components/SearchBar'
import CardJobs from '@components/CardJobs'
import Footer from '@components/Footer'
import api from "@services/api";

import searchImg from '@assets/undraw_web_search.svg'



export default function Vacancies() {

  const [isReady, setIsReady] = useState(false)
  const [token, setToken] = useState(null)
  const [showJobs, setShowJobs] = useState(null)
  const [findField, setFindField] = useState('')
  const [searchData, setSearchData] = useState('')
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    setToken(localStorage?.getItem('token'))
  }, [isReady])

  useEffect(() => {
    getUserProfile()
  }, [token])

  useEffect(() => {
    if (token === null && isReady === true) {
      Router.push('/login')
    }
  }, [isReady, token])

  const getUserProfile = async () => {
    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const { data } = await api.get("/user", config);
        if (data?.hasOwnProperty('error')) {
          return setError(data.error)
        }
        setUser(data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const findJobs = () => {
    setShowJobs([])
    setSearchData(findField)
    setFindField('')
    return setShowJobs([{
      location: "Curitiba-PR",
      title: "Backend NodeJs Developer",
      _id: "uashuaashsua23273622323hh2as3"
    },
    {
      location: "Sao Paulo-SP",
      title: "UI Design",
      _id: "uashuffahsua23273622323hh2ss3"
    }, {
      location: "Maringa-PR",
      title: "Frontend Developer",
      _id: "uashuaeehsua23273622323hh2ss3"
    }
    ])
  }


  if (!isReady || !token || !user) return null

  return (<>
    <Navbar />
    {user &&
      <div className="main-content">
        <img src={searchImg} alt="" className="login-img" />
        <p className="main-text">
          Existem atualmente 65 empregos ativos esperando por você
        </p>

        <div className="container">
          <p className="main-text"><strong>Busca por vaga:</strong></p>
          <SearchBar handlerOnChange={(e) => setFindField(e.target.value)} value={findField} />
          <button className="btn-primary" onClick={findJobs}>Pesquisar</button>
        </div>
        <div className="jobs-container">
          {showJobs && <>
            <p className="result-info">Encontramos 4 vagas contendo {`${searchData}`}</p>
            <div className="result-container">
              {showJobs.map(job => <CardJobs key={job._id} job={job} />)}
            </div>

          </>}

        </div>
      </div>
    }
    <Footer />
  </>
  );
}
