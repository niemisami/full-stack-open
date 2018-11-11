import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  handleClick = (type) => () => this.setState(prevState => ({ [type]: prevState[type] + 1 }))

  render() {
    return (
      <div>
        {console.log(this.state)}
        <h1>Anna palautetta</h1>
        <div>
          <Button label={'hyvä'} onClick={this.handleClick('good')} />
          <Button label={'neutraali'} onClick={this.handleClick('neutral')} />
          <Button label={'huono'} onClick={this.handleClick('bad')} />
        </div>
        <Statistics statistics={this.state} />
      </div>
    )
  }
}

const Button = ({ label, onClick }) => <button onClick={onClick}>{label}</button>
const Statistics = ({ statistics }) => {
  const { good, bad, neutral } = statistics
  const feedbackCount = good + bad + neutral
  const average = ((good * 1 + neutral * 0 + bad * -1) / feedbackCount)
  const positiveFeedback = good /  feedbackCount * 100
  return (
    <>
      <h1>Statistiikka</h1>
      {(good || bad || neutral)
        ?
        <>
          <Statistic label={'hyvä'} value={good} />
          <Statistic label={'neutraali'} value={neutral} />
          <Statistic label={'huono'} value={bad} />
          <Statistic label={'keskiarvo'} value={average} />
          <Statistic label={'positiivisia'} value={`${positiveFeedback}%`} />
        </>
        : <p>Ei palautetta</p>}
    </>
  )
}
const Statistic = ({ label, value }) => {
  return <p> {label} {value}</p>
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)