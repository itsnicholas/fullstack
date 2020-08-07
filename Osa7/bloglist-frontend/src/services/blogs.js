import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = 'http://localhost:3001/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}

const comment = (id, content) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, content)
  return request.then(response => response.data)
}

const update = (blog) => {
  console.log(blog, 'blog in blogs.js')
  console.log(blog.id, 'blog.id in blogs.js')
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  console.log(request, 'request in blogs.js')
  return request.then(response => response.data)
}

const remove = (id) => {
  console.log(id, 'id in blogs.js')
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

export default { getAll, create, comment, update, remove }