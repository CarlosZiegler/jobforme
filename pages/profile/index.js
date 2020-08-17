import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import Toggle from '@components/Toggle'
import api from "@services/api";

import profileImg from '@assets/profileImg.svg'


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
  const [isChecked, setIsChecked] = useState(false)


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
    <div className="main-content" >
      <img src={profileImg} alt="" className="login-img" />
      {user && <>

        <h1>Perfil Profissional</h1>
        <form className="professional-container">
          <label className="label" >Cargo</label>
          <input className="professional-input" type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} name="position" required />
          <label className="label" >Localizaçao</label>
          <input className="professional-input" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} name="location" required />
          <label className="label">Link</label>
          <input className="professional-input" type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)} name="link" />
          <label className="label">Linkedin</label>
          <input className="professional-input" type="text" id="linkedin" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} name="linkedin" />
          {error && <span className="text-danger">{error?.message}</span>}
        </form>
        <div className="toggle-container">

        </div>
        <Toggle
          checked={isChecked}
          size="default"
          disabled={false}
          onChange={() => setIsChecked(!isChecked)}
          offstyle="btn-danger"
          onstyle="btn-success"
          text="Estou procurando emprego"
        />
        <button type="button" onClick={setUserProfissionalProfile}>Update Perfil Profissional</button>
      </>}
      <div>
      </div>
      {error && <span>{error}</span>}
    </div>
    <Footer />
  </>


  );
}
