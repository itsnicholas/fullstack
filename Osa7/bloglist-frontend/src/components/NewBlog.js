import React from 'react'
import { useDispatch } from 'react-redux'
import { newcreateBlog } from '../reducers/blogReducer'

const NewBlog = () => {
  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
    event.preventDefault()

    const generateId = () =>
      Number((Math.random() * 1000000).toFixed(0))

    const content = {
      author: event.target.author.value,
      title: event.target.title.value,
      url: event.target.url.value,
      likes: 0,
      id: generateId()
    }

    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''
    dispatch(newcreateBlog(content))
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