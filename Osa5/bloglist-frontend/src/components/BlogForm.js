import React, {useState} from 'react'

const BlogForm = ({ createBlog, setBlogsVisible }) => {
  const [newTitle, setTitle] = useState('') 
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogsVisible(false)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            id='title'
            value={newTitle}
            name="Title"
            onChange={handleTitle}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            id='author'
            value={newAuthor}
            name="Author"
            onChange={handleAuthor}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id='url'
            value={newUrl}
            name="Url"
            onChange={handleUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm