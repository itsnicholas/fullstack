import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input 
            value={props.value1}
            onChange={props.onChange1} 
          />
        </div>
        <div>
          number: <input 
            value={props.value2}
            onChange={props.onChange2} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const personId = persons.find(person => person.name === newName).id
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService
      .update(personId, nameObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      .catch(error => {
        console.log(error)
      })
    }
    setNewName('')
    setNewNumber('')  
  }

  const deleteName = (id, name) => {
    if (window.confirm("Delete " + name + "?")) {
      personService
        .deleteId(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter change={handleSearchChange} search={newSearch} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addName} value1={newName}
            onChange1={handleNameChange} value2={newNumber}
            onChange2={handleNumberChange} />
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(filteredPerson => ( 
        <ul>
          <Info key={filteredPerson.name} person={filteredPerson} /> <button onClick={() => deleteName(filteredPerson.id, filteredPerson.name)}>delete</button>
        </ul>
      ))}
    </div>
  )

}

export default App