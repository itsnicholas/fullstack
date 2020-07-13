import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [newLike, setLike] = useState(0) 
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

  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
    {blog.title} <button onClick={() => setInfoVisible(true)}>view</button>
    </div>
    <div style={showWhenVisible}>
    {blog.title}  <button onClick={() => setInfoVisible(false)}>hide</button>
    <br />{blog.url}
    <br />likes {blog.likes} <button onClick={() => setLike(newLike + 1)}>like</button>
    <br />{blog.author}
    </div>
    
  </div>
  )
}

export default Blog
