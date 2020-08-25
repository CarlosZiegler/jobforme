import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link'
import api from "@services/Api";

import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

import hireImg from '@assets/hire.svg'
import tntLogo from '@assets/tnt.svg'
import gamaLogo from '@assets/gama.svg'

export default function Home() {

  return (<div className="content">
    <Navbar />
    <div className="header-content">
      <img className="main-img" src={hireImg} alt="Hire Image" />
      <p className="main-text">
        Somos uma plataforma <span className="text-bold"> GRATUITA </span>
        que busca conectar recrutadores e profissionais.
      </p>
      <span className="text-ask">
        E você, quem é?
        </span>
      <div className="btn-header-group">
        <Link href="/vagas"><a className="btn-primary">Eu estou procurando novo emprego</a></Link>
        <Link href="/signup"><a className="btn-secondary">Eu estou procurando profissionais</a></Link>
      </div>
    </div>
    <div className="partner-container">
      <h3 className="partner-title">
        Empresas Solidarias
      </h3>
      <p className="partner-content">
        Qual está sendo sua ação diante do mundo e legado que irá deixar?
      </p>
      <div className="partner-logo">
        <a href="https://gama.academy/"><img src={gamaLogo} alt="" className="Gama Academy" /></a>
        <a href="http://talkntalk.com.br/"><img src={tntLogo} alt="" className="TNT" /></a>
      </div>
      <Link href="/parcerias"><a className="btn-yellow">Saiba Mais</a></Link>
    </div>
    <Footer />
  </div>);
}
