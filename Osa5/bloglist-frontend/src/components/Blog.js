import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, update, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)

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
    console.log(blog.user.username)
    console.log(user.username)
    await blogService.update(blog.id, updateBlog)
    update(await blogService.getAll())
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
      <div className='blog'>
        {blog.title} {blog.author} <button onClick={() => setInfoVisible(true)}>view </button>
      </div>
      )}
      { infoVisible && (
      <div>
        {blog.title} {blog.author} <button onClick={() => setInfoVisible(false)}>hide</button>
        <br /> {blog.url}
        <br /> likes {blog.likes} <button onClick={newLike}>like</button>
        <br /> {blog.user.username}
        <br />{blog.user.username === user.username && <button onClick={deletePost}> remove</button> }
      </div>
      )}
    </div>
  )
}

export default Blog
