import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_LIKE':
      console.log(action.data.id, 'what is action.data.updateBlog.id in blogReducer.js')
      return state.map(b =>
        b.id !== action.data.id ? b : action.data
        )
    case 'REMOVE_BLOG':
      console.log(action.data.id, 'what is action.data.blogToRemove.id in blogReducer.js')
      return state.filter(b => b.id !== action.data.id)
    default:
      return state
  }
}

export const newcreateBlog = (content) => {
  console.log(content, 'new blog content in blogReducer')
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  const updateBlog = {
    ...blog, user: blog.user.id
  }
  return async dispatch => {
    console.log('blog in blogReducer.js:', blog)
    await blogService.update(updateBlog)
    console.log('updateBlog in blogReducer.js:', updateBlog)
    dispatch({
      type: 'NEW_LIKE',
      data: blog
    })
  }
}

export const removeBlog = (id) => {
  console.log(id, 'id in blogReducer removeBlog')
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log(blogs, 'blogs in blogReducer')
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer