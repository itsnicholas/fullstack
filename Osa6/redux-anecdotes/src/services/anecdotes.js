import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  console.log(content, 'anecdotes.js content')
  const object = { content: content, id: getId(), votes: 0 }
  console.log(object, 'anecdotes.js object')
  const response = await axios.post(baseUrl, object)
  return response.data
}
  

export default { 
  getAll, 
  createNew 
}