import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'
 
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
  const allAuthors = useQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState([])
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
 
  console.log(allAuthors.data, 'allAuthors.data in App.js')
 
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  
 
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }
 
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(subscriptionData.data, 'subscriptionData.data in NewBook.js')
      window.alert(addedBook.title + ' added')
      updateCacheWith(addedBook)
    }
  })
 
  useEffect(() => {
    const token = localStorage.getItem('phonenumbers-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])
 
  useEffect(() => {
    if (allAuthors.data) {
      console.log(allAuthors.data.allAuthors, 'allAuthors.data.allAuthors in App.js')
      setAuthors(allAuthors.data.allAuthors)
    }
  }, [allAuthors])
 
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
          authors={authors}
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
        authors={authors}
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