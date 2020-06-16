import React from 'react'

const Part  = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.number}
      </p>
    </div>
  )
}

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

  export default Course