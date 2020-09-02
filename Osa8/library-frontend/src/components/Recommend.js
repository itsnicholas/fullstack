import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_USER, ALL_BOOKS } from './../queries'

const Recommend = (props) => {
  const user = useQuery(GET_USER)
  const [genre, setGenre] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "cache-and-network"
  })
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (user.data) {
      setGenre(user.data.me.favoriteGenre)
      getBooks({ variables: { genre: genre } })
    }
  }, [user.data, getBooks, genre])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])
    
  if (!props.show || !props.token) {
    return null
  }
  
  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre: <b>{genre}</b></div>
      <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {books.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  )
}

export default Recommend