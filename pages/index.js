/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent-props */
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import hiringData from '@assets/15563-hiring-isometric-animation (1).json';
import loadingData from '@assets/loading.json';
import Topbar from '@components/Topbar';
import Card from '@components/card';
import Filters from '@components/Filters';
import { PrimaryButton } from '@components/Buttons';
import Layout from '@components/Layout';
import api from '@services/Api';
import groupByAttribute from '@utils/groupByAttribute';
import searchData from '@utils/searchData';


export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [showProfiles, setShowProfiles] = useState([]);
  const [qtdProfiles, setQtdProfiles] = useState(null);
  const [urlForm, setUrlForm] = useState('https://forms.gle/fxWpig6SHWVhBPj26');
  const [addButtonText, setAddButtonText] = useState('Adicionar Perfil');
  const [textContextButton, setTextContextButton] = useState('Ir para Vagas');
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [urlFetchData, seturlFetchData] = useState(
    'https://spreadsheets.google.com/feeds/cells/1DIOjyvCrP8wim2oedHu3SgXoD3RAZFytSnCR0xjK7e4/1/public/full?alt=json',
  );
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration of LottieFiles
  const hiringOptions = {
    loop: true,
    autoplay: true,
    animationData: hiringData,
  };

  // Configuration of LottieFiles
  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
  };

  /**
   * The code below will find the Job position
   */
  const handlerSearchOnChange = async event => {
    const result = searchData(profiles, event.target.value);
    setShowProfiles(result);
  };

  /**
   * The code below will set State of App
   * Recruiter can be added Jobs and Users can be added Profiles
   */
  const handlerUserchange = async () => {
    setIsRecruiter(!isRecruiter);

    // fetch data of Jobs or Professional
    if (!isRecruiter) {
      seturlFetchData(
        'https://spreadsheets.google.com/feeds/cells/17LTWWLr0rB54bQOA1Ap3zzFUPfrnCsZK2EgjgruJIwc/1/public/full?alt=json',
      );
      setTextContextButton('Ir para Profissionais');
      setAddButtonText('Adicionar Vaga');

      // url form for Recruiter add Jobs
      setUrlForm('https://forms.gle/zBQ3xAzZVruyTdpN9');
    } else {
      seturlFetchData(
        'https://spreadsheets.google.com/feeds/cells/1DIOjyvCrP8wim2oedHu3SgXoD3RAZFytSnCR0xjK7e4/1/public/full?alt=json',
      );
      setTextContextButton('Ir para Vagas');
      setAddButtonText('Adicionar Perfil');
      // url form for Professional add Profile
      setUrlForm('https://forms.gle/fxWpig6SHWVhBPj26');
    }
  };

  /**
   * The code below fetching data from URL.
   * The Url will be of Profiles or Jobs
   */
  async function fetchData(dataUrl) {
    // initialize loading Animation
    setIsloading(true);

    // get data from url
    const response = await api(dataUrl);

    // saving in a array the response
    const arrayProfile = response.feed.entry.map(({ gs$cell }) => ({
      value: gs$cell.inputValue,
      row: gs$cell.row,
    }));

    // group the response per row from Google Spreadsheets
    const rows = Object.values(groupByAttribute(arrayProfile, 'row'));
    const data = rows.map(row => row.map(element => element.value));

    // set state to app ready
    setProfiles(data);
    setShowProfiles(data);
    setQtdProfiles(data.length - 1);
    setIsloading(false);
  }

  // Fetch data if variable isRecruiter was changed
  useEffect(() => {
    try {
      fetchData(urlFetchData);
    } catch (e) {
      setError(e);
    }
  }, [isRecruiter]);

  return (
    <Layout>
      <div className="header-page">
        <Topbar />
        <div className="hiring">
          <Lottie className="lottieFile" options={hiringOptions} height="100%" width="100%" />
        </div>
      </div>

      <div className="section-profile-user">
        <PrimaryButton value={textContextButton} onClick={handlerUserchange} />
        <p className="text-alert-section">
          {isRecruiter
            ? 'Você está na área reservada para que os recrutadores postem suas vagas e você que é profissional pode visualizar essas vagas e se candidatar.'
            : 'Você está na área reservada para os profissionais, aqui você pode cadastrar o seu perfil e os recrutadores podem visualiza-los.'}
        </p>
      </div>

      <Filters
        handlerOnchange={handlerSearchOnChange}
        urlButton={urlForm}
        handlerUserchange={handlerUserchange}
        textButton={addButtonText}
        textContextButton={textContextButton}
      />
      {qtdProfiles > 0 && (
        <div className="container">
          <span className="profile-count">
            Cadastrados:
            {qtdProfiles}
          </span>
        </div>
      )}
      {isloading && (
        <div className="loading">
          <Lottie className="lottieFile" options={loadingOptions} height="100%" width="100%" />
        </div>
      )}
      <div className="container">
        {showProfiles.length > 0
          && showProfiles.map((profile, index) => {
            // first element form array will the Table header.
            if (profile[0] === 'Timestamp') {
              return null;
            }
            return (
              <Card
                key={index}
                className="profile"
                name={profile[2]}
                cargo={profile[3]}
                linkedin={profile[4]}
                email={profile[1]}
                cidade={profile[5]}
              />
            );
          })}
        {showProfiles.length === 0 && !isloading && <h2>Nenhum candidato corresponde ao cargo</h2>}
      </div>
    </Layout>
  );
}
