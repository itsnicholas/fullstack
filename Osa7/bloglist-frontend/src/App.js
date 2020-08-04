import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { notificationChange, loginNotificationChange } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logInUser, initializeUser, logOutUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import usersService from './services/users'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

const User = ({ user }) => {
  console.log(user.username, 'user.username in App.js')
  console.log(user.blogs.length, 'user.blogs.length in App.js') 
  return (
    <tr key={user.id}>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = ({ users }) => {
  console.log(users, 'users in App.js')

  const byBlogs = (u1, u2) => u2.blogs.length - u1.blogs.length

  return (
    <div>
      <h2>Users</h2>
      <table id='users'>
        <tbody>
          {users.sort(byBlogs).map(user =>
            <User key={user.id} user={user} />
          )}
        </tbody>
      </table>
    </div>
  )
}

const Blogs = ({ blogs, blogFormRef, user }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog user={user}/>
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

const Home = ({
  user,
  handleLogin,
  handleLogout,
  blogFormRef,
  blogs
}) => {
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

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

const App = () => {
  const blogFormRef = React.createRef()
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll().then(users =>
      setUsers(users)
    )
  },[])

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
    dispatch(logInUser(
      event.target.username.value,
      event.target.password.value,
      notificationChange, 
      loginNotificationChange
    ))
  }

  const handleLogout = () => {
    dispatch(logOutUser())
  }

  return (
    <div>
      <Router>
        <Home 
          user={user} 
          handleLogin={handleLogin}
          handleLogout={handleLogout} 
          blogFormRef={blogFormRef} 
          blogs={blogs} 
        />
        <Switch>
          <Route path="/users">
            <Users users={users} />
          </Route>
          <Route path="/">
            <Blogs blogs={blogs} 
              blogFormRef={blogFormRef} 
              user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App