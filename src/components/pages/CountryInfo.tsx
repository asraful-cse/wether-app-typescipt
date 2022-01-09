import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface InitiProps {
  name: string
}

interface InitCountry {
  capital: string[]
  population: number
  latlng: number[]
  flags: {
    svg: string
  }
}

interface InitCountryInfo {
  temperatre: number
  weather_icons: string
  wind_speed: number
  precip: number
}

const CountryInfo: React.FC = () => {
  const { name } = useParams<InitiProps>()
  const [loading, setLoading] = useState<boolean>(false)
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false)
  const [country, setCountry] = useState<InitCountry>()
  const [weatherInfo, setWeatherInfo] = useState<InitCountryInfo>()

  useEffect(() => {
    getCountry()
  }, [])

  const getCountry = async () => {
    try {
      setLoading(true)
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
      const data = await res.json()
      setCountry(data.length > 1 ? data[2] : data[0])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const getWeatherInfo = async () => {
    try {
      const res = await fetch(
        `http://api.weatherstack.com/current?access_key=ba9de385df8c5f0930b38727951f2a62&query=${country?.capital[0]}`,
      )
      const data = await res.json()
      setWeatherInfo(data.current)
      setWeatherLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  return (
    <div  data-testid="countryInfo">
      <div style={{ textAlign: 'center' }}>
        <h2>Country info details:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : country ? (
          <div>
            <div>
              <p>capital: {country.capital[0]}</p>
              <p>Population: {country.population}</p>
              <p>Latitute: {country.latlng[0]}</p>
              <p>Longitude: {country.latlng[1]}</p>
            </div>

            <div>
              <img
                style={{ height: '300px', width: '400px' }}
                src={country.flags.svg}
                alt=""
              />
            </div>
          </div>
        ) : (
          <h3>Country not found by name: {name}</h3>
        )}
        {country && (
          <Button size="medium" variant="contained" onClick={getWeatherInfo}>
            Details
          </Button>
        )}
        {weatherLoading ? (
          <p>Loading...</p>
        ) : (
          weatherInfo && (
            <div>
                <h2>Country Details Information</h2>
              <h3>{country?.capital[0]}</h3>
              <div weather-container>
                <img src={weatherInfo.weather_icons[0]} alt="" />
                <p>Temperature: {weatherInfo.temperatre}</p>
                <p>Wind speed : {weatherInfo.wind_speed}</p>
                <p>Precid: {weatherInfo.precip}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default CountryInfo
