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
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom"
 
const UserInfoBlog = ({ blog }) => {
  return (
    <li>{blog.title}</li>
  )
}
 
const UserInfo = ({ wantedUser }) => {
  console.log(wantedUser, 'wantedUser in userinfo')
  if (!wantedUser) {
    return null
  }
  return (
    <div>
      <h2>{wantedUser.username}</h2>
      <h4>added blogs</h4>
      <ul>
        {wantedUser.blogs.map(blog =>
          <UserInfoBlog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>
    </div>
  )
}
 
const User = ({ user }) => {
  console.log(user.id, 'user id in App.js')
  return (
    <tr key={user.id}>
      <td key={user.id} >
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}
 
const Users = ({ users }) => {
  console.log(users, 'users in Users App.js')

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
  const sortedblogs = blogs.sort(byLikes)
  console.log(sortedblogs, 'sortedblogs in App.js')
 
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  if ( user ) {
    return (
      <div>
        <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog user={user}/>
        </Togglable>

        {sortedblogs.map(blog =>
          <ul key={blog.id} style={blogStyle} className='blog'>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </ul>
        )}
      </div>
    )
  } else {
    return null
  } 
}
 
const Home = ({
  user,
  handleLogin,
  handleLogout
}) => {

  const padding = {
    paddingRight: 5
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
 
  return (
    <div>
      <div class="links">
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blog app</h2>

      <Notification />

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
 
  const match = useRouteMatch('/users/:id')
  const wantedUser = match 
    ? users.find(user => user.id === String(match.params.id))
    : null

  console.log(users, 'users in App App.js')
 
  return (
    <div>
      <Home 
        user={user} 
        handleLogin={handleLogin}
        handleLogout={handleLogout} 
        blogFormRef={blogFormRef} 
        blogs={blogs} 
      />
      <Switch>
        <Route path="/blogs/:id">
          <Blog blogs={blogs} />
        </Route>
        <Route path="/users/:id">
          <UserInfo wantedUser={wantedUser} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/">
          <Blogs blogs={blogs} 
            blogFormRef={blogFormRef} 
            user={user} />
        </Route>
      </Switch>
    </div>
  )
}
 
export default App