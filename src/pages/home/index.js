import React, { useState, useEffect } from 'react'
import Lottie from 'react-lottie';

import Card from '../../components/card'
import loadingData from '../../assets/loading.json'
import hiringData from '../../assets/15563-hiring-isometric-animation (1).json'

import Topbar from '../../components/Topbar'
import Filters from '../../components/Filters'
import Footer from '../../components/Footer';


import api from '../../services/api'
import groupByAttribute from '../../utils/groupByAttribute'
import searchData from '../../utils/searchData'


import './style.css'


export default function Home() {

    const [profiles, setProfiles] = useState([])
    const [showProfiles, setShowProfiles] = useState([])
    const [qtdProfiles, setQtdProfiles] = useState(null)

    const [isloading, setIsloading] = useState(true)
    const [error, setError] = useState(null)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,

    }
    const hiringOptions = {
        loop: true,
        autoplay: true,
        animationData: hiringData,

    }

    const handlerSearchOnChange = async (event) => {
        const result = searchData(profiles, event.target.value)
        setShowProfiles(result)
    }


    useEffect(() => {

        async function fetchData() {
            const response = await api('https://spreadsheets.google.com/feeds/cells/1DIOjyvCrP8wim2oedHu3SgXoD3RAZFytSnCR0xjK7e4/1/public/full?alt=json')
            setTimeout(() => {
                const arrayProfile = response.feed.entry.map(({ gs$cell }) => {
                    return {
                        value: gs$cell.inputValue,
                        row: gs$cell.row
                    }
                })

                let rows = Object.values(groupByAttribute(arrayProfile, 'row'))
                let data = rows.map(row => row.map(element => element.value))

                setProfiles(data)
                setShowProfiles(data)
                setQtdProfiles(data.length)
                setIsloading(false)
            }, 1000)

        }

        try {
            fetchData()
        } catch (e) {
            setError(e)
        }

    }, [])

    return (
        <>
            <div>
                <div className="header-page">
                    <Topbar />
                    <div className="hiring">
                        <Lottie className="lottieFile" options={hiringOptions}
                            height={"20%"}
                            width={"20%"}
                        />
                    </div>
                </div>
                <Filters
                    handlerOnchange={handlerSearchOnChange}
                />
                {qtdProfiles &&
                    <div className="container">
                        <span className="profile-count" >{qtdProfiles} Perfis cadastrados</span>
                    </div>}
                {isloading &&
                    <div className="loading">
                        <Lottie className="lottieFile" options={defaultOptions}
                            height={"30%"}
                            width={"30%"}
                        />
                    </div>
                }
                <div className="container" >
                    {showProfiles.length > 0 && showProfiles.map((profile, index) => {
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
                    {showProfiles.length > 0 ? <Footer /> : ''}
                </div>

            </div>
        </>
    )
}