import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from './../queries'
 
const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
 
  const [ createBook ] = useMutation(CREATE_BOOK, {
      onError: (error) => {
        console.log(error.graphQLErrors, 'error.graphQLErrors in NewBook') 
        if (error.graphQLErrors.length !== 0) {
          props.setError(error.graphQLErrors[0].message)
        }
      },
      update: (store, response) => {
        props.updateCacheWith(response.data.addedBook)
      }
  })
 
  if (!props.show || !props.token) {
    return null
  }
 
  const submit = async (event) => {
    event.preventDefault()
    createBook({  variables: { title, published, author, genres } })
 
    console.log('add book...')
 
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }
 
  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }
 
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}
 
export default NewBook