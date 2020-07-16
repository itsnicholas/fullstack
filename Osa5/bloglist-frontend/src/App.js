import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Blog from './components/Blog'
import LogIn from './components/LogIn'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog '${returnedBlog.title}' by '${returnedBlog.author}'`)
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

  const newLike = async (blog) => {
    const updateBlog = {
      author: blog.author,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id
    }
    console.log(blog.user.username)
    console.log(user.username)
    await blogService.update(blog.id, updateBlog)
    update(await blogService.getAll())
  }

  const update = (updatedBlogs) => {
    updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <LogIn error={error}
        handleLogin={handleLogin}
        username={username}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        password={password}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    )
  }

  return (
    <div className='blog'>
      <NewBlog message={message}
        error={error}
        user={user}
        handleLogout={handleLogout}
        addBlog={addBlog} />
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} update={update} user={user} newLike={newLike}/>
      )}
    </div>
  )
}

export default App