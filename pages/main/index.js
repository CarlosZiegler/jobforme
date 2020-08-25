import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import api from "@services/api";


export default function Main() {

  const [isReady, setIsReady] = useState(false)
  const [token, setToken] = useState(null)
  const [orders, setOrders] = useState([])
  const [showOrders, setShowOrders] = useState([])
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
        console.log(data)
        setUser(data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const findOrders = () => {
    const result = orders.filter(order => order._id.includes(findField) || order.tableId?.number.includes(findField))
    return setShowOrders(result)
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
          {user?.role === 'professional' && <a href="/profile" className="options-item">Perfil Profissional</a>}
          <a href="/vacancies" className="options-item">Ir para Vagas</a>
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
