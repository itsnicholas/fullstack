import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter  = (props) => {
    return (
        <div>
        filter shown with <input 
          value={props.search}
          onChange={props.change} 
        />
      </div>
    )
}

const OneCountry  = ( {country} ) => {
  const [weather, setWeather] = useState({location:{}, current:{}})
  const apiKey = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`
  
  useEffect(() => {
    console.log('effect 2')
    axios
      .get(url)
      .then(response => {
        console.log('promise fulfilled 2')
        setWeather(response.data)
      })
  }, [])
  
  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}
      <br />population {country.population}
      <h2>languages</h2>
      <ul>
      {country.languages.map(language => ( 
          <li>
            {language.name}
          </li>
      ))}
      </ul>
      <img src={country.flag} alt="flag" height="20%" width="20%" />
      <h2>Weather in {country.capital}</h2>
      <b>temperature:</b> {weather.current.temperature} Celsius
      <br /><img alt="weather icon" src={weather.current.weather_icons} />
      <br /><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
    </div>
  )
}

const App = () => {
    const [ countries, setCountries] = useState([])
    const [ newSearch, setNewSearch] = useState('')

    useEffect(() => {
      console.log('effect')
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('promise fulfilled')
          setCountries(response.data)
        })
    }, [])

    const handleSearchChange = (event) => {
      console.log(event.target.value)
      setNewSearch(event.target.value)
    }

    const results = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))

    if (results.length <= 10 & results.length > 1) {
    return (
      <div>
        Find countries<Filter change={handleSearchChange} search={newSearch} />
        {results.map(filteredCountry => ( 
        <ul>
          {filteredCountry.name} <button onClick={() => setNewSearch(filteredCountry.name)}>Show</button>
        </ul>
      ))}
      </div>
    )
    } else if (results.length === 1) {
      return (
        <div>
          Find countries<Filter change={handleSearchChange} search={newSearch} />
          <OneCountry country={results[0]} />
        </div>
      )
    } else {
      return (
        <div>
          Find countries<Filter change={handleSearchChange} search={newSearch} />
          Too many matches, specify another filter
        </div>
      )
    }
  }
  
  export default App