import React, { useState } from 'react'
import Comment from './Comment'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import {
  useParams
} from "react-router-dom"

const Blog = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(n => n.id === String(id))
  const dispatch = useDispatch()
  const [newComment, setComment] = useState('')

  const handleLike = () => {
    const updateBlog = { 
      ...blog, likes: blog.likes + 1
    }
    console.log('blog update in Blog.js', updateBlog)
    dispatch(likeBlog(updateBlog))

  }

  const handleComment = (event) => {
    setComment(event.target.value)
  }

  const addComment = () => {
    console.log(blog.id, 'blog.id in blog.js')
    console.log(newComment, 'newComment in blog.js')
    blogService
      .comment(blog.id,
        { content: newComment })
      .catch(error => {
        console.log(error)
      })
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={'https://' + blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes}
        <button onClick={() => handleLike()}>like</button>
      </div>
      added by {blog.user.username}
      <h4>comments</h4>
      <form onSubmit={addComment}>
        <div>
          <input
            type="text"
            id='comment'
            value={newComment}
            name="Comment"
            onChange={handleComment}
          />
          <button id='submit' type="submit">add comment</button>
        </div>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <Comment key={comment} comment={comment} />
        )}
      </ul>
    </div>
  )
}

export default Blog