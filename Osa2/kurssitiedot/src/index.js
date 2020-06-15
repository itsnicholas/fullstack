import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content  = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} name={part.name} number={part.exercises} />
      )}
    </div>
  )
}


const Part  = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.number}
      </p>
    </div>
  )
}

const Total = ({ parts }) => {
  const total = 
  parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <div>
        <b><p>total of {total} exercises</p></b>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))