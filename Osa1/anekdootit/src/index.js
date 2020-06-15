import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.name}
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(() => Array(props.anecdotes.length).fill(0))
  const [largest, setLargest] = useState(0)
  const [iValue, setIValue] = useState(0)

  for ( let i = 0; i < points.length; i++ ) {
    if ( largest < points[i] ) {
      setLargest(points[i])
      setIValue(i)
    }
  }

  const increaseByOne = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      {props.anecdotes[selected]}
      <br />has {points[selected]} votes
      <br />
      <Button name="vote" onClick={increaseByOne} />
      <Button name="next anecdote" onClick={() => setSelected(Math.floor(Math.random() * 6))} />
      <h1>
        Anecdote with most votes
      </h1>
      {props.anecdotes[iValue]}
      <br />has {points[iValue]} votes
  </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good pogrammers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)