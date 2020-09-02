import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, ALL_AUTHORS, ALL_GENRES } from './queries'
 
const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
 
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}
 
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
 
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  
    try {
      const dataInStore = client.readQuery({ query: ALL_BOOKS })
      const dataInStore2 = client.readQuery({ query: ALL_AUTHORS })
      const dataInStore3 = client.readQuery({ query: ALL_AUTHORS })
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks : dataInStore.allBooks.concat(addedBook) }
        })
        client.writeQuery({
          query: ALL_AUTHORS,
          data: { allAuthors : dataInStore2.allAuthors.concat(addedBook.author) }
        })
        client.writeQuery({
          query: ALL_GENRES,
          data: { allGenres : dataInStore3.allGenres.concat(addedBook.genres) }
        })
        if (addedBook.genres) {
          addedBook.genres.forEach(genre => {
            const dataInStore4 = client.readQuery({ query: ALL_BOOKS, variables: { genre: genre } })
            client.writeQuery({
              query: ALL_BOOKS,
              data: { allBooks : dataInStore4.allBooks.concat(addedBook) }
            })
          })
        }
      }
    } catch (e) {
      console.log("error: ", e, ". No projects to load presumably.");
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : addedBook }
      })
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors : addedBook.author }
      })
      client.writeQuery({
        query: ALL_GENRES,
        data: { allGenres : addedBook.genres }
      })
      addedBook.genres.forEach(genre => {
        client.writeQuery({
          query: ALL_BOOKS, variables: { genre: genre },
          data: { allBooks : addedBook }
        })
      })
    }
  }
 
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(subscriptionData.data, 'subscriptionData.data in NewBook.js useSubscription(BOOK_ADDED)')
      window.alert(addedBook.title + ' added')
      console.log(addedBook, 'addedBook in NewBook.js useSubscription(BOOK_ADDED)')
      updateCacheWith(addedBook)
    }
  })
 
  useEffect(() => {
    const token = localStorage.getItem('phonenumbers-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])
 
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }
 
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
 
  if (!token) {
    return (
      <div>
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        </div>
 
        <Notify errorMessage={errorMessage} />
 
        <LoginForm
          setToken={setToken}
          setPage={setPage}
          setError={notify}
          show={page === 'login'}
        />
 
        <Authors token={token} 
          setError={notify}
          show={page === 'authors'}
        />
 
        <Books show={page === 'books'} />
 
      </div>
    )
  }
 
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>
 
      <Notify errorMessage={errorMessage} />
 
      <Authors token={token} 
        setError={notify}
        show={page === 'authors'}
      />
 
      <Books show={page === 'books'} />
 
      <NewBook
        token={token}
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
        setError={Notify}
      />
 
      <Recommend
        token={token}
        show={page === 'recommend'}
      />
 
    </div>
  )
}
 
export default App