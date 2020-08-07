import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Navbar from '@components/Navbar'
import api from "@services/api";


export default function Main() {

  const [isReady, setIsReady] = useState(false)
  const [token, setToken] = useState(null)
  const [orders, setOrders] = useState([])
  const [showOrders, setShowOrders] = useState([])
  const [findField, setFindField] = useState('')
  const [orderStatus, setOrderStatus] = useState('all')
  const [error, setError] = useState(null)

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    setToken(localStorage?.getItem('token'))
  }, [isReady])

  useEffect(() => {
    if (token === null && isReady === true) {
      Router.push('/login')
    }
  }, [isReady, token])

  const getAllOrders = async () => {
    try {
      const { data } = await api.get("/orders", config);
      if (data?.hasOwnProperty('error')) {
        return setError(data.error)
      }
      setOrders(data)
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

  const filterBy = (event) => {
    if (orderStatus === 'all') {
      return setShowOrders(orders)
    }
    const result = orders.filter((order) => order.status === orderStatus)
    return setShowOrders(result)
  }

  useEffect(() => {
    filterBy()
  }, [orderStatus])

  const handleLogout = async () => {
    try {
      localStorage.clear()
      Router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  if (!isReady || !token) return null

  return (<>
    <Navbar />
    <div className="orders-container">
      <h1 className="header-table">Main</h1>
      <div className="search-container">
        {/* <SearchBar handlerOnChange={(e) => setFindField(e.target.value)} />
        <FilterBy title={'Status'} options={['paid', 'pending', 'all']} handlerOnchange={(e) => setOrderStatus(e.target.value)} /> */}
      </div>
      {/* {orders && <Orders orders={showOrders} />} */}
      {token && <>
        <h1 onClick={handleLogout}>Ola</h1>
      </>}

    </div>
  </>


  );
}
