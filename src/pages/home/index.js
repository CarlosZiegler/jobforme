import React, { useState, useEffect } from 'react'
import Lottie from 'react-lottie';

import Card from '../../components/card'
import loadingData from '../../assets/loading.json'

import api from '../../services/api'

import './style.css'

export default function Home() {
    const [profiles, setProfiles] = useState([])
    const [isloading, setIsloading] = useState(true)
    const [error, setError] = useState(null)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,

    }

    function agruparPor(objetoArray, propriedade) {
        return objetoArray.reduce(function (acc, obj) {
            let key = obj[propriedade];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    useEffect(() => {

        async function fetchData() {
            const response = await api('https://spreadsheets.google.com/feeds/cells/1DIOjyvCrP8wim2oedHu3SgXoD3RAZFytSnCR0xjK7e4/1/public/full?alt=json')
            setTimeout(() => {
                console.log(response.feed)

                const arrayProfile = response.feed.entry.map(({ gs$cell }) => {
                    return {
                        value: gs$cell.inputValue,
                        row: gs$cell.row
                    }
                })

                let rows = Object.values(agruparPor(arrayProfile, 'row'))
                let data = rows.map(row => row.map(element => element.value))
                console.log('data->', data)



                setProfiles(data)
                setIsloading(false)
            }, 1000)

        }

        try {
            fetchData()
        } catch (error) {
            console.log(error)
            setError(error)
        }


    }, [])

    return (
        <>
            <div>
                <h1>#jobforme</h1>
                {isloading &&
                    <div className="loading">
                        <Lottie className="lottieFile" options={defaultOptions}
                            height={"100%"}
                            width={"100%"}
                        />
                    </div>
                }
                <div className="container" >
                    {profiles.length > 0 && profiles.map((profile, index) => {
                        if (index === 0) {
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
                </div>
            </div>
        </>
    )
}