import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import {
  useParams
} from "react-router-dom"

const Blog = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(n => n.id === String(id))

  const dispatch = useDispatch()

  const handleLike = (blog) => {
    const updateBlog = { 
      ...blog, likes: blog.likes + 1
    }
    console.log('blog update in Blog.js', updateBlog)
    dispatch(likeBlog(updateBlog))

  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={'https://' + blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      added by {blog.user.username}
    </div>
  )
}

export default Blog