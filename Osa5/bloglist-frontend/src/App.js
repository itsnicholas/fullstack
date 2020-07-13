import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const ErrorNotification = ({ error }) => {
  if (error === null) {
    return null
  }

  return (
    <div className="error">
      {error}
    </div>
  )
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setTitle] = useState('') 
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  } 
  
  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    await blogService
    .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog '${newTitle}' by '${newAuthor}'`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)  
      })
      .catch(error => {
        setError(JSON.stringify(error.response.data.error))
        setTimeout(() => {
          setError(null)
        }, 5000)
        console.log(error)
      })
  } 

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification error={error} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <ErrorNotification error={error} />
      {user.username} logged in <button onClick={handleLogout}>logout</button>
      <br />
      <br />
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
          <div>
            title:
              <input
              type="text"
              value={newTitle}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              />
          </div>
          <div>
            author:
              <input
              type="text"
              value={newAuthor}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              />
          </div>
          <div>
            url:
              <input
              type="text"
              value={newUrl}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              />
          </div>
          <button type="submit">create</button>
        </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App