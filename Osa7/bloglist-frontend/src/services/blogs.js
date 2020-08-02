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

const update = (id, blog) => {
  console.log(blog, 'blog in blogs.js')
  const request = axios.put(`${baseUrl}/${id}`, blog, getConfig())
  return request.then(response => response.data)
}

const remove = (id) => {
  console.log(id, 'id in blogs.js')
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }