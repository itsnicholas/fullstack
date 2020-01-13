import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const Statistics = (props) => {
      if (props.kaikki === 0) {
        return (
        <div>
          <br />
          <h1>statistics</h1>
          <br />
          No feedback given
        </div>
        )
      } else {
        return (
          <div>
          <br />
          <h1>statistics</h1>
          <br />
          <Statistic text1="good" value1 ={props.hyva} text2="neutral" value2 ={props.neutraali} text3="bad" value3 ={props.huono} text4="all" value4 ={props.hyva + props.neutraali + props.huono} text5="average" value5 ={(props.hyva - props.huono)/(props.hyva + props.neutraali + props.huono)} text6="positive" value6 ={100*(props.hyva/(props.hyva + props.neutraali + props.huono)) + " %"} />
          </div>
        )
      }
}

const Statistic = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text1}</td>
          <td>{props.value1}</td>
        </tr>
        <tr>
          <td>{props.text2}</td>
          <td>{props.value2}</td>
        </tr>
        <tr>
          <td>{props.text3}</td>
          <td>{props.value3}</td>
        </tr>
        <tr> 
          <td>{props.text4}</td>
          <td>{props.value4}</td>
        </tr>
        <tr>  
          <td>{props.text5}</td>
          <td>{props.value5}</td>
        </tr>
        <tr>
          <td>{props.text6}</td>
          <td>{props.value6}</td>
        </tr>
      </tbody>  
    </table>
  )
}

const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newGood => {
    setGood(newGood)
  }
  const setToNeutral = newNeutral => {
    setNeutral(newNeutral)
  }
  const setToBad = newBad => {
    setBad(newBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Statistics hyva={good} neutraali={neutral} huono={bad} kaikki={good + neutral + bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
  