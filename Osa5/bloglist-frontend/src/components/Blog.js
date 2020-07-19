import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ 
  blog,
  update,
  user,
  newLike
}) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deletePost = async (event) => {
    if (window.confirm("Remove blog " + blog.title + " by" + blog.author)) {
      event.preventDefault()
      console.log(blog.id)
      await blogService.deleteId(blog.id)
      update(await blogService.getAll())
    }
  }

  return (
    <div style={blogStyle}>
      { !infoVisible && (
        <div>
          {blog.title} {blog.author} <button id='view' onClick={() => setInfoVisible(true)}>view </button>
        </div>
      )}
      { infoVisible && (
        <div>
          {blog.title} {blog.author} <button onClick={() => setInfoVisible(false)}>hide</button>
          <br /> {blog.url}
          <br /> <span id='likes'>likes {blog.likes}</span><button id='like' onClick={() => newLike(blog)}>like</button>
          <br /> {blog.user.username}
          <br />{blog.user.username === user.username && <button onClick={deletePost}> remove</button> }
        </div>
      )}
    </div>
  )
}

export default Blog
