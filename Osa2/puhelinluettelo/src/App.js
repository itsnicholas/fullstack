import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Persons  = (props) => {
    return (
      <div>
        {props.persons.filter(person => person.name.toLowerCase().includes(props.newSearch.toLowerCase())).map(filteredPerson => ( 
        <ul>
          <Info key={filteredPerson.name} person={filteredPerson} />
        </ul>
      ))}
      </div>
    )
}

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

const Info  = ( {person} ) => {
      return (
        <div>
          <p>
          {person.name} {person.number}
          </p>
        </div>
      )
  }

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
        window.alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter change={handleSearchChange} search={newSearch} />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange} 
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} />
    </div>
  )

}

export default App