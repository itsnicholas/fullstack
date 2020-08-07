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
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  AppBar,
  Toolbar
} from '@material-ui/core'
 
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
 
const UserInfo = ({ user, wantedUser }) => {
  console.log(wantedUser, 'wantedUser in userinfo')

  if (!wantedUser || !user) {
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
 
const Users = ({ user, users }) => {
  console.log(users, 'users in Users App.js')

  const byBlogs = (u1, u2) => u2.blogs.length - u1.blogs.length

  if (!user) {
    return null
  }

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

  if ( user ) {
    return (
      <div>
        <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog user={user}/>
        </Togglable>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {sortedblogs.map(blog =>
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>
                    <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.author}</Link>
                  </TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>
        </TableContainer>
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

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>
 
        <Notification />
 
        <form onSubmit={handleLogin}>
          <div>
            <TextField id="username" label="username" />
          </div>
          <div>
            <TextField id="password" label="password" type='password' />
          </div>
          <br />
          <div>
            <Button variant="contained" color="primary" type="submit">
              login
            </Button>
          </div>
        </form>
      </div>
    )
  }
 
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          <em>{user.username} logged in</em>
          <Button color="inherit" to="" component={Link} onClick={handleLogout}>
           logout
          </Button>
        </Toolbar>
      </AppBar>
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
      <Container>
        <Home 
          user={user} 
          handleLogin={handleLogin}
          handleLogout={handleLogout} 
          blogFormRef={blogFormRef} 
          blogs={blogs} 
        />
        <Switch>
          <Route path="/blogs/:id">
            <Blog user={user} blogs={blogs} />
          </Route>
          <Route path="/users/:id">
            <UserInfo user={user} wantedUser={wantedUser} />
          </Route>
          <Route path="/users">
            <Users user={user} users={users} />
          </Route>
          <Route path="/">
            <Blogs blogs={blogs} 
              blogFormRef={blogFormRef} 
              user={user} />
          </Route>
        </Switch>
      </Container>
    </div>
  )
}
 
export default App