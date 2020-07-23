import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  console.log(anecdotes, 'anecdoteList')
  console.log(filter, 'anecdoteList')
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const updateAnecdote = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1
    }
    console.log('anecdote update in anecdoteList.js', updateAnecdote)

    dispatch(voteAnecdote(updateAnecdote))
    dispatch(notificationChange('You voted: ' + anecdote.content, 5))
  }
    
    return (
      <div>
        {sortedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
}

export default AnecdoteList