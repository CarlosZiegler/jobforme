import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import api from "@services/api";


export default function Profile() {

  const [isReady, setIsReady] = useState(false)
  const [token, setToken] = useState(null)
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
    getProfessionalProfile()
  }, [professional])

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
        setProfessional(data.professionalProfile[0])

      }

    } catch (error) {
      console.log(error)
    }
  }
  const getProfessionalProfile = async () => {
    try {
      setLinkedIn(professional.contact?.linkedIn || '')
      setLink(professional.contact?.link || '')
      setLocation(professional.location || '')
      setPosition(professional.position || '')

    } catch (error) {
      console.log(error)
    }
  }
  const setUserProfissionalProfile = async () => {
    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const contactObj = {
          link,
          linkedin
        }

        const { data } = professional ? await api.put(`/professional/update/${professional._id}`, {
          position, location, contact: {
            link,
            linkedIn,
          }
        }, config) : await api.post("/professional/create", {
          position, location, contact: {
            link,
            linkedIn,
          }
        }, config)

        const result = await api.put("/user/update", {
          professionalProfile: data._id
        }, config);

        setLinkedIn('')
        setLink('')
        setLocation('')
        setPosition('')
        getUserProfile()
        console.log(professional)
      }

    } catch (error) {
      setError(error)
    }
  }

  if (!isReady || !token || !user) return null

  return (<>
    <Navbar />
    <div >
      <h1>Profile</h1>
      {user && <>
        <div className="signin-page">
          <form className="professional-container">
            <h1>Perfil Profissional</h1>
            <label >Cargo</label>
            <input className="input-text" type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} name="position" required />
            <label >Localizaçao</label>
            <input className="input-text" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} name="location" required />
            <label >Link</label>
            <input className="input-text" type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)} name="link" />
            <label >Linkedin</label>
            <input className="input-text" type="text" id="linkedin" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} name="linkedin" />
            <button type="button" onClick={setUserProfissionalProfile}>Update Perfil Profissional</button>
          </form>
        </div>
      </>}
      <div>
      </div>
      {error && <span>{error}</span>}
    </div>
    <Footer />
  </>


  );
}
