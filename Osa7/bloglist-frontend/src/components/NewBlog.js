import React from 'react'
import { useDispatch } from 'react-redux'
import { newcreateBlog } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'

const NewBlog = () => {
  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
    event.preventDefault()

    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''
    dispatch(newcreateBlog(content))
    dispatch(notificationChange(`a new blog '${content.title}' by ${content.author} added!`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input id='author' name="author" />
        </div>
        <div>
          title
          <input id='title' name="title" />
        </div>
        <div>
          url
          <input id='url' name="url" />
        </div>
        <button id="create" type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlog