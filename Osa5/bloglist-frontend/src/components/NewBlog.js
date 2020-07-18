import React, {useState} from 'react'
import ErrorNotification from './ErrorNotification'
import Notification from './Notification'
import BlogForm from './BlogForm'


const NewBlog = ({ message,
  error,
  user,
  handleLogout,
  addBlog
}) => {
  const [blogsVisible, setBlogsVisible] = useState(false)

  const hideWhenVisible = { display: blogsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogsVisible ? '' : 'none' }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <ErrorNotification error={error} />
      {user.username} logged in <button onClick={handleLogout}>logout</button>
      <br />
      <br />
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogsVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog={addBlog} setBlogsVisible={setBlogsVisible} />
        <button onClick={() => setBlogsVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default NewBlog