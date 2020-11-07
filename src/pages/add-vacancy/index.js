import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import api from '@services/Api';

import profileImg from '@assets/profileImg.svg';

export default function Profile() {
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

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
        console.log(user.vacancies);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createVacancy = async () => {
    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const data = await api.post(
          '/vacancy/create',
          {
            title,
            description,
            tags,
            location,
            contact: {
              email: 'carlos@gmail.com',
              link,
              linkedIn,
            },
          },
          config
        );
        if (data.status === 200) {
          return Router.push('/main');
        }
        console.log(data);
      }
    } catch (e) {
      setError(e);
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

  if (!isReady || !token || !user) return null;

  return (
    <>
      <Navbar />
      <div className="main-content">
        <img src={profileImg} alt="" className="login-img" />
        {user && (
          <>
            <h1>Adicionar nova Vaga</h1>
            <form className="professional-container">
              <label className="label">Title</label>
              <input
                className="vacancy-input"
                type="text"
                id="position"
                value={title}
                onChange={e => setTitle(e.target.value)}
                name="position"
                required
              />
              <label className="label">Description</label>
              <textarea
                rows="4"
                cols="50"
                className="vacancy-input"
                type="text-area"
                id="position"
                value={description}
                onChange={e => setDescription(e.target.value)}
                name="position"
                required
              />
              <label className="label">Localizaçao</label>
              <input
                className="vacancy-input"
                type="text"
                id="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                name="location"
                required
              />
              <label className="label">Tags</label>
              <input
                className="vacancy-input"
                type="text"
                id="link"
                value={tags}
                onChange={e => setTags(e.target.value)}
                name="link"
              />
              <label className="label">Link</label>
              <input
                className="vacancy-input"
                type="text"
                id="location"
                value={link}
                onChange={e => setLink(e.target.value)}
                name="linkedin"
              />
              <label className="label">Linkedin</label>
              <input
                className="vacancy-input"
                type="text"
                id="location"
                value={linkedIn}
                onChange={e => setLinkedIn(e.target.value)}
                name="linkedin"
              />
              {error && <span className="text-danger">{error?.message}</span>}
            </form>
            <div className="btn-group">
              <>
                <Link href="/main">
                  <a className="btn-primary">Voltar</a>
                </Link>
                <button type="button" className="btn-green" onClick={() => createVacancy()}>
                  Adicionar
                </button>
              </>
            </div>
          </>
        )}
        <div />
        {error && <span>{error}</span>}
      </div>
      <Footer />
    </>
  );
}
