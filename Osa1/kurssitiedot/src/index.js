import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content  = (props) => {
  return (
    <div>
      <Part name={props.name1} number={props.number1} />
      <Part name={props.name2} number={props.number2} />
      <Part name={props.name3} number={props.number3} />
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

const Total = (props) => {
  return (
    <div>
        <p>Number of exercises {props.sum}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
      <Content name1={part1.name} number1={part1.exercises}  name2={part2.name} number2={part2.exercises}  name3={part3.name} number3={part3.exercises}/>
      <Total sum={part1.exercises + part2.exercises + part2.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))