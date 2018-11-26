import React, { Component } from 'react'

const actions = {
  good: { type: 'GOOD' },
  ok: { type: 'OK' },
  bad: { type: 'BAD' },
  zero: { type: 'ZERO' }
}

class App extends Component {
  handleClick = type => () => this.props.store.dispatch(actions[type])

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <div>
          <Button label={'hyvä'} onClick={this.handleClick('good')} />
          <Button label={'neutraali'} onClick={this.handleClick('ok')} />
          <Button label={'huono'} onClick={this.handleClick('bad')} />
        </div>
        <Statistics
          statistics={this.props.store.getState()}
        />
        <Button label={'Nollaa tilasto'} onClick={this.handleClick('zero')} />
      </div>
    )
  }
}

const Button = ({ label, onClick }) => <button onClick={onClick}>{label}</button>
const Statistics = ({ statistics }) => {
  const { good, bad, ok } = statistics
  const feedbackCount = good + bad + ok
  const average = ((good * 1 + ok * 0 + bad * -1) / feedbackCount)
  const positiveFeedback = good / feedbackCount * 100
  return (
    <>
      <h1>Statistiikka</h1>
      {(good || bad || ok)
        ?
        <>
          <Statistic label={'hyvä'} value={good} />
          <Statistic label={'neutraali'} value={ok} />
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

export default App
