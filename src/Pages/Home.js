import React, { useState } from 'react'
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphql/Queries";


function Home() {
    const [state, setState] = useState('');
    const [getWeather, { loading, data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
        variables: { name: state }
    })

    if (error) { return <h1>Error found</h1> }
    if (data) {
        console.log(data)
    }

    return (
        <>
            <div className="home">
                <h1>Search for weather</h1>
                <input type="text" placeholder="Enter the city" onChange={(event) => setState(event.target.value)} />
                <button onClick={() => getWeather()}>Search</button>
            </div>

            <div className="weather">
                {data ?
                    <>
                        <h1>City name: {data.getCityByName.name}</h1>
                        <h1>Temperature: {data.getCityByName.weather.temperature.actual}</h1>
                        <h1>Description:{data.getCityByName.weather.summary.description}</h1>
                        <h1>Wind:{data.getCityByName.weather.wind.deg}</h1>
                    </>
                    : <></>}
            </div>
        </>
    )
}

export default Home
