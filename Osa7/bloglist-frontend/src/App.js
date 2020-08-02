import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { notificationChange, loginNotificationChange } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logInUser, initializeUser, logOutUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  },[dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logInUser(event.target.username.value, event.target.password.value, notificationChange, loginNotificationChange))
    //event.target.username.value = ''
    //event.target.password.value = ''
  }

  const handleLogout = () => {
    dispatch(logOutUser())
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input id='username' name="username" />
          </div>
          <div>
            password
            <input id='password' name="password" />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default App