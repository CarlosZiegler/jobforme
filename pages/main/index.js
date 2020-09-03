import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link'

import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import api from "@services/api";


export default function Main() {

  const [isReady, setIsReady] = useState(false)
  const [token, setToken] = useState(null)
  const [vacancies, setVacancies] = useState([])
  const [showVacancies, setShowVacancies] = useState([])
  const [findField, setFindField] = useState('')
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

  useEffect(() => {
    if (user != null && user?.role === "company") {
      setVacancies(user.vacancies)
    }
  }, [user])

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

  const findOrders = () => {
    const result = vacancies.filter(order => order._id.includes(findField) || order.tableId?.number.includes(findField))
    return setShowVacancies(result)
  }

  useEffect(() => {
    findOrders()
  }, [findField])

  if (!isReady || !token || !user) return null

  return (<>
    <Navbar />
    <div className="main-content">
      <h1>Main</h1>
      {user && <>
        <h1>Ola {user.displayName}</h1>
        <div className="options-container">
          <a href="/profile" className="options-item">Meu Perfil</a>
          {user?.role === 'professional' && <Link href="/profile"><a className="options-item">Perfil Profissional</a></Link>}
          <Link href="/vagas"><a className="options-item">Ir para Vagas</a></Link>
          <Link href="/signup"><a>Signup</a></Link>
        </div>
      </>}

      <div>
        {/* <SearchBar handlerOnChange={(e) => setFindField(e.target.value)} />
        <FilterBy title={'Status'} options={['paid', 'pending', 'all']} handlerOnchange={(e) => setOrderStatus(e.target.value)} /> */}
      </div>
      {/* {orders && <Orders orders={showOrders} />} */}


    </div>
    <Footer />
  </>


  );
}
