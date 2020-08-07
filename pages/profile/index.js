import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Navbar from '@components/Navbar'
import api from "@services/api";


export default function Profile() {

  const [isReady, setIsReady] = useState(false)
  const [token, setToken] = useState(null)
  const [orders, setOrders] = useState([])
  const [showOrders, setShowOrders] = useState([])
  const [findField, setFindField] = useState('')
  const [orderStatus, setOrderStatus] = useState('all')
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [professional, setProfessional] = useState({})
  const [position, setPosition] = useState('')
  const [location, setLocation] = useState('')
  const [link, setLink] = useState('')
  const [linkedIn, setLinkedIn] = useState('')

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
        setProfessional(data.professionalProfile)
      }

    } catch (error) {
      console.log(error)
    }
  }
  const getProfessionalProfile = async () => {
    try {
      if (token) {
        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };
        // const { data } = await api.get(`/professional/${user.professionalProfile._id}`, config);
        // if (data?.hasOwnProperty('error')) {
        //   return setError(data.error)
        // }
        console.log(user.professionalProfile)
        // setProfessional(user.professionalProfile)
      }

    } catch (error) {
      console.log(error)
    }
  }
  const setUserProfissionalProfile = async () => {
    try {
      if (token && professional.length === 0) {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const contactObj = {
          link,
          linkedin
        }

        const { data } = await api.post("/professional/create", {
          position, location, contact: {
            link,
            linkedIn,
          }
        }, config);

        const result = await api.put("/user/update", {
          professionalProfile: data._id
        }, config);
        setLinkedIn('')
        setLink('')
        setLocation('')
        setPosition('')
        getUserProfile()
      }
      setError('Voce ja tem um perfil')
    } catch (error) {
      setError(error)
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
    <div >
      <h1>Profile</h1>
      {user && <>
        <div className="signin-page">
          <form >
            <h1>Perfil Profissional</h1>
            <label >Cargo</label>
            <input className="input-text" type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} name="position" required />
            <label >Localizaçao</label>
            <input className="input-text" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} name="location" required />
            <label >Link</label>
            <input className="input-text" type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)} name="link" />
            <label >Linkedin</label>
            <input className="input-text" type="text" id="linkedin" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} name="linkedin" />
            <button type="button" onClick={setUserProfissionalProfile}>Criar perfil Profissional</button>

          </form>
        </div>
      </>}
      <h2>{"teste"}</h2>
      <h2 onClick={getProfessionalProfile}>view professional</h2>
      <div>
        {/* <SearchBar handlerOnChange={(e) => setFindField(e.target.value)} />
        <FilterBy title={'Status'} options={['paid', 'pending', 'all']} handlerOnchange={(e) => setOrderStatus(e.target.value)} /> */}
      </div>
      {/* {orders && <Orders orders={showOrders} />} */}

      {error && <span>{error}</span>}
    </div>
  </>


  );
}
