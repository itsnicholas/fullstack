import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from './../queries'
 
const Books = (props) => {
  const allGenres = useQuery(ALL_GENRES)
  const [genres, setGenres] = useState([])
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "cache-and-network"
  })
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('all genres')
 
  

  useEffect(() => {
    if (allGenres.data) {
      setGenres(allGenres.data.allGenres)
      getBooks()
    }
  }, [allGenres, getBooks])
 
  const clickGenre = (genre) => {
    getBooks({ variables: { genre: genre } })
    if (genre) {
      setGenre(genre)
    } else {
      setGenre('all genres')
    }
  }
 
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])
 
  if (result.loading) {
    return <div>loading...</div>
  }
 
  if (!props.show || !genres) {
    return null
  }

  console.log(books, 'books in Books.js')
  console.log(genres, 'genres in Books.js')
 
  return (
    <div>
      <h2>books</h2>
      <div>in genre: <b>{genre}</b></div>
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
      <div>
        {genres.map(a =>
          <button key={a} onClick={() => clickGenre(a)}>{a}</button>
        )}
        <button onClick={() => clickGenre('')}>all genres</button>
      </div>
    </div>
  )
}
 
export default Books