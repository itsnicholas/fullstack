import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, update }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const newLike = async (event) => {
    event.preventDefault()
    const updateBlog = {
      author: blog.author,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id
    }
    console.log(updateBlog)
    await blogService.update(blog.id, updateBlog)
    update(await blogService.getAll())
  }

  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
    {blog.title} <button onClick={() => setInfoVisible(true)}>view</button>
    </div>
    <div style={showWhenVisible}>
    {blog.title}  <button onClick={() => setInfoVisible(false)}>hide</button>
    <br />{blog.url}
    <br />likes {blog.likes} <button onClick={newLike}>like</button>
    <br />{blog.author}
    </div>
    
  </div>
  )
}

export default Blog
