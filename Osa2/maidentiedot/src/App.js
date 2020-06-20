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

const Countries  = (props) => {
    return (
      <div>
        {props.countries.map(filteredCountry => ( 
        <ul>
          <Country key={filteredCountry.name} country={filteredCountry} />
        </ul>
      ))}
      </div>
    )
}

const OneCountry  = ( {country} ) => {
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
      <img src={country.flag} alt="flag" height="30%" width="30%" />
    </div>
  )
}

const Country  = ( {country} ) => {
    return (
      <div>
        <p>
        {country.name}
        </p>
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
        <Countries countries={results} />
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