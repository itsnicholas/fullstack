import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_USER, ALL_AUTHORS } from './../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBorn, result ] = useMutation(EDIT_USER, { 
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError('person not found')
    }
  }, [result.data]) // eslint-disable-line 

  const submit = async (event) => {
    event.preventDefault()
    changeBorn({ variables: { name, born } })
 
    console.log('add born...')
 
    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  const authors = props.authors

  if (!props.token) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )

}

export default Authors
