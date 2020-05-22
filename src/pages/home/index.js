import React, { useState, useEffect } from 'react'
import Lottie from 'react-lottie';


import Card from '../../components/card'
import Topbar from '../../components/Topbar'
import Filters from '../../components/Filters'
import Pagination from '../../components/Pagination';

import api from '../../services/api'
import groupByAttribute from '../../utils/groupByAttribute'
import searchData from '../../utils/searchData'

import hiringData from '../../assets/15563-hiring-isometric-animation (1).json'
import loadingData from '../../assets/loading.json'

import './style.css'

export default function Home() {
    const baseUrl = 'https://spreadsheets.google.com/feeds/cells';

    const [profiles, setProfiles] = useState([])
    const [showProfiles, setShowProfiles] = useState([])
    const [urlForm, setUrlForm] = useState("https://forms.gle/fxWpig6SHWVhBPj26")
    const [addButtonText, setAddButtonText] = useState("Adicionar Perfil")
    const [textContextButton, setTextContextButton] = useState("Ir para Vagas")
    const [isRecruiter, setIsRecruiter] = useState(false)
    const [urlFetchData, seturlFetchData] = useState(`${baseUrl}/1DIOjyvCrP8wim2oedHu3SgXoD3RAZFytSnCR0xjK7e4/1/public/full`)
    const [isloading, setIsloading] = useState(true)
    const [error, setError] = useState(null)
    const [lastFetchIndex, setLastFetchIndex] = useState(21);

    // Configuration of LottieFiles
    const hiringOptions = {
        loop: true,
        autoplay: true,
        animationData: hiringData,

    }

    // Configuration of LottieFiles
    const loadingOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,

    }

    /** 
     * The code below will find the Job position
    */
    const handlerSearchOnChange = async (event) => {
        const result = searchData(profiles, event.target.value)
        setShowProfiles(result)
    }

    /** 
     * The code below will set State of App 
     * Recruiter can be added Jobs and Users can be added Profiles
    */
    const handlerUserchange = async (event) => {
        event.preventDefault()

        setIsRecruiter(!isRecruiter)

        // fetch data of Jobs or Professional
        if (!isRecruiter) {
            seturlFetchData(`${baseUrl}/17LTWWLr0rB54bQOA1Ap3zzFUPfrnCsZK2EgjgruJIwc/1/public/full`)
            setTextContextButton('Ir para Profissionais')
            setAddButtonText('Adicionar Vaga')

            //url form for Recruiter add Jobs
            setUrlForm('https://forms.gle/zBQ3xAzZVruyTdpN9')
        } else {
            seturlFetchData(`${baseUrl}/17LTWWLr0rB54bQOA1Ap3zzFUPfrnCsZK2EgjgruJIwc/1/public/full`)
            setTextContextButton('Ir para Vagas')
            setAddButtonText('Adicionar Perfil')


            //url form for Professional add Profile
            setUrlForm('https://forms.gle/zBQ3xAzZVruyTdpN9')
        }

    }

    /**
     * The code below fetching prev twenty data, if exists
    */
    async function handlePrevPage() {
        try {
            await fetchData(`${urlFetchData}?alt=json&min-row=${lastFetchIndex - 39}&max-row=${lastFetchIndex - 20}`); 
            
            setLastFetchIndex(lastFetchIndex - 20);
        } catch (e) {
            setError(e)
        }
    }

    /**
     * The code below fetching next twenty data, if exists
    */
    async function handleNextPage() {
        try {
            await fetchData(`${urlFetchData}?alt=json&min-row=${lastFetchIndex + 1}&max-row=${lastFetchIndex + 20}`);

            setLastFetchIndex(lastFetchIndex + 20);
        } catch (e) {
            setError(e)
        }
    }

    /** 
     * The code below fetching data from URL.
     * The Url will be of Profiles or Jobs
    */
    async function fetchData(dataUrl) {
        // initialize loading Animation
        setIsloading(true)

        // get data from url
        const response = await api(dataUrl)

        if (response.feed.entry.length > 0) {
            // saving in a array the response
            const arrayProfile = response.feed.entry.map(({ gs$cell }) => {
                return {
                    value: gs$cell.inputValue,
                    row: gs$cell.row
                }
            })

            // group the response per row from Google Spreadsheets 
            let rows = Object.values(groupByAttribute(arrayProfile, 'row'))
            let data = rows.map(row => row.map(element => element.value))

            // set state to app ready
            setProfiles(data)
            setShowProfiles(data)
        }

        setIsloading(false)
    }

    // Fetch data if variable isRecruiter was changed
    useEffect(() => {
        try {
            fetchData(`${urlFetchData}?alt=json&max-row=21`);
        } catch (e) {
            setError(e)
        }

    }, [isRecruiter, urlFetchData])

    return (
        <>
            <div>
                <div className="header-page">
                    <Topbar />
                    <div className="hiring">
                        <Lottie className="lottieFile" options={hiringOptions}
                            height={"60%"}
                            width={"60%"}
                        />
                    </div>
                </div>
                <div className="section-profile-user">
                    <button className="btn-profile" onClick={handlerUserchange}>{textContextButton}</button>
                    <p className="text-alert-section">{isRecruiter ?
                        'Você está na área reservada para que os recrutadores postem suas vagas e você que é profissional pode visualizar essas vagas e se candidatar.'
                        : 'Você está na área reservada para os profissionais, aqui você pode cadastrar o seu perfil e os recrutadores podem visualiza-los.'
                    }</p>
                </div>

                <Filters
                    handlerOnchange={handlerSearchOnChange}
                    urlButton={urlForm}
                    handlerUserchange={handlerUserchange}
                    textButton={addButtonText}
                    textContextButton={textContextButton}
                />

                {profiles.length > 0 && (
                    <Pagination
                        id="top-pagination"
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                        prevButtonDisabled={lastFetchIndex === 21}
                        nextButtonDisabled={profiles.length < 20}
                    />
                )}
                {isloading &&
                    <div className="loading">
                        <Lottie className="lottieFile" options={loadingOptions}
                            height={"100%"}
                            width={"100%"}
                        />
                    </div>
                }
                <div className="container" >
                    {showProfiles.length > 0 && showProfiles.map((profile, index) => {
                        // first element form array will the Table header.
                        if (profile[0] === "Timestamp") {
                            return null
                        }
                        return <Card
                            key={index}
                            className="profile"
                            name={profile[2]}
                            cargo={profile[3]}
                            linkedin={profile[4]}
                            email={profile[1]}
                            cidade={profile[5]}
                        />
                    })}
                    {showProfiles.length === 0 && !isloading && <h2>Nenhum candidato corresponde ao cargo</h2>}
                </div>
            </div>

            {profiles.length > 0 && (
                <Pagination
                    id="bottom-pagination"
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                    prevButtonDisabled={lastFetchIndex === 21}
                    nextButtonDisabled={profiles.length < 20}
                />
            )}
        </>
    )
}