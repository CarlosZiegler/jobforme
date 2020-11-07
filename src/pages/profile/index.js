import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Toggle from '@components/Toggle';
import api from '@services/Api';

import profileImg from '@assets/profileImg.svg';

export default function Profile() {
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [professional, setProfessional] = useState({});
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

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
        setProfessional(data.professionalProfile);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getProfessionalProfile = async () => {
    try {
      setLinkedIn(professional?.contact?.linkedIn || '');
      setLink(professional?.contact?.link || '');
      setLocation(professional?.location || '');
      setPosition(professional?.position || '');
      setIsChecked(professional?.isActive || false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancelUpdates = () => {
    getUserProfile();
    setIsDisabled(!isDisabled);
  };

  const createOrUpdateUserProfessionalProfile = async () => {
    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        let data;

        if (user.professionalProfile !== null) {
          data = await api.put(
            `/professional/update/${professional._id}`,
            {
              position,
              location,
              isActive: isChecked,
              contact: {
                link,
                linkedIn,
              },
            },
            config
          );
        } else {
          data = await api.post(
            '/professional/create',
            {
              position,
              location,
              isActive: isChecked,
              contact: {
                link,
                linkedIn,
              },
            },
            config
          );
          await api.put(
            '/user/update',
            {
              professionalProfile: data.data._id,
            },
            config
          );
        }

        getUserProfile();
        setIsDisabled(!isDisabled);
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
    getProfessionalProfile();
  }, [professional]);

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
            <h1>Perfil Profissional</h1>
            <form className="professional-container">
              <label className="label">Cargo</label>
              <input
                className="professional-input"
                type="text"
                id="position"
                value={position}
                onChange={e => setPosition(e.target.value)}
                name="position"
                required
                disabled={isDisabled ? 'disabled' : ''}
              />
              <label className="label">Localizaçao</label>
              <input
                className="professional-input"
                type="text"
                id="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                name="location"
                required
                disabled={isDisabled ? 'disabled' : ''}
              />
              <label className="label">Link</label>
              <input
                className="professional-input"
                type="text"
                id="link"
                value={link}
                onChange={e => setLink(e.target.value)}
                name="link"
                disabled={isDisabled ? 'disabled' : ''}
              />
              <label className="label">Linkedin</label>
              <input
                className="professional-input"
                type="text"
                id="linkedin"
                value={linkedIn}
                onChange={e => setLinkedIn(e.target.value)}
                name="linkedin"
                disabled={isDisabled ? 'disabled' : ''}
              />
              {error && <span className="text-danger">{error?.message}</span>}
            </form>
            <div className="toggle-container" />
            <Toggle
              checked={isChecked}
              size="default"
              disabled={isDisabled}
              onChange={() => setIsChecked(!isChecked)}
              offstyle="btn-danger"
              onstyle="btn-success"
              text={isChecked ? 'Estou procurando emprego' : 'Não estou procurando emprego'}
            />
            <div className="btn-group">
              {isDisabled && (
                <button
                  type="button"
                  className="btn-green"
                  onClick={() => setIsDisabled(!isDisabled)}
                >
                  Editar Perfil Profissional
                </button>
              )}
              {isDisabled === false && (
                <>
                  <button type="button" className="btn-red" onClick={() => handleCancelUpdates()}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-green"
                    onClick={() => createOrUpdateUserProfessionalProfile()}
                  >
                    Update
                  </button>
                </>
              )}
            </div>
            <Link href="/main">
              <a className="btn-primary">Voltar</a>
            </Link>
          </>
        )}
        <div />
        {error && <span>{error}</span>}
      </div>
      <Footer />
    </>
  );
}
