import React, { useState, useEffect } from 'react'
import Lottie from 'react-lottie';


import Card from '../../components/card'
import Topbar from '../../components/Topbar'
import Filters from '../../components/Filters'

import api from '../../services/api'
import groupByAttribute from '../../utils/groupByAttribute'
import searchData from '../../utils/searchData'

import hiringData from '../../assets/15563-hiring-isometric-animation (1).json'
import loadingData from '../../assets/loading.json'

import './style.css'

export default function Home() {

    const [profiles, setProfiles] = useState([])
    const [showProfiles, setShowProfiles] = useState([])
    const [qtdProfiles, setQtdProfiles] = useState(null)
    const [urlForm, setUrlForm] = useState("https://forms.gle/fxWpig6SHWVhBPj26")
    const [addButtonText, setAddButtonText] = useState("Adicionar Perfil")
    const [textContextButton, setTextContextButton] = useState("Vagas")
    const [isRecruiter, setIsRecruiter] = useState(false)
    const [urlFetchData, seturlFetchData] = useState('https://spreadsheets.google.com/feeds/cells/1DIOjyvCrP8wim2oedHu3SgXoD3RAZFytSnCR0xjK7e4/1/public/full?alt=json')

    const [isloading, setIsloading] = useState(true)
    const [error, setError] = useState(null)

    const hiringOptions = {
        loop: true,
        autoplay: true,
        animationData: hiringData,

    }
    const loadingOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,

    }

    const handlerSearchOnChange = async (event) => {
        const result = searchData(profiles, event.target.value)
        console.log(result)
        setShowProfiles(result)

    }
    const handlerUserchange = async (event) => {
        event.preventDefault()
        setIsRecruiter(!isRecruiter)
        if (!isRecruiter) {
            console.log('isRecruiter', isRecruiter)
            seturlFetchData('https://spreadsheets.google.com/feeds/cells/17LTWWLr0rB54bQOA1Ap3zzFUPfrnCsZK2EgjgruJIwc/1/public/full?alt=json')
            setTextContextButton('Profissionais')
            setAddButtonText('Adicionar Perfil')
            //url form for Recruiter add Jobs
            setUrlForm('https://forms.gle/zBQ3xAzZVruyTdpN9')
        } else {
            seturlFetchData('https://spreadsheets.google.com/feeds/cells/1DIOjyvCrP8wim2oedHu3SgXoD3RAZFytSnCR0xjK7e4/1/public/full?alt=json')
            setTextContextButton('Vagas')
            setAddButtonText('Adicionar Vaga')

            //url form for Professional add Profile
            setUrlForm('https://forms.gle/zBQ3xAzZVruyTdpN9')
        }



    }

    async function fetchData(dataUrl) {
        // initialize loading Animation
        setIsloading(true)

        // get data from url
        const response = await api(dataUrl)

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
        setQtdProfiles(data.length - 1)
        setIsloading(false)

    }

    // Fetch data if variable isRecruiter was changed
    useEffect(() => {
        try {
            fetchData(urlFetchData)
        } catch (e) {
            setError(e)
        }

    }, [isRecruiter])

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
                <Filters
                    handlerOnchange={handlerSearchOnChange}
                    urlButton={urlForm}
                    handlerUserchange={handlerUserchange}
                    textButton={addButtonText}
                    textContextButton={textContextButton}
                />
                {qtdProfiles > 0 &&
                    <div className="container">
                        <span className="profile-count" >Cadastrados: {qtdProfiles} </span>
                    </div>}
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
        </>
    )
}