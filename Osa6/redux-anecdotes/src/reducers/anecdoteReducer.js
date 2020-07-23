import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_VOTE':
      return state.map(a =>
        a.id !== action.data.updateAnecdote.id ? a : action.data.updateAnecdote 
      )
  default:
    return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    console.log('anecdote update in anecdoteReducer.js', anecdote)
    const updateAnecdote = await anecdoteService.update(anecdote.id, anecdote)
    dispatch({
      type: 'NEW_VOTE',
      data: { updateAnecdote }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anedotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anedotes,
    })
  }
}

export default reducer