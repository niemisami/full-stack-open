import React from 'react'
import ReactDOM from 'react-dom'

const randomBetween = (start, end) => Math.floor(Math.random() * end) + start

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: this.props.anecdotes.map(_ => 0)
    }
  }

  showNext = () => this.setState({ selected: randomBetween(0, this.props.anecdotes.length) })
  vote = voteIndex => () => this.setState(prevState =>
    ({ votes: prevState.votes.map((vote, index) => index !== voteIndex ? vote : vote + 1) }))

  render() {
    const { selected, votes } = this.state
    // Replace temporary index if array contais bigger a value
    const indexOfMostVotes = votes.reduce((mostVotes, vote, index) => vote > votes[mostVotes] ? index : mostVotes, 0)
    return (
      <div>
        {this.props.anecdotes[selected]}
        <div>
          {`Has ${votes[selected]} votes`}
        </div>
        <div>
          <button onClick={this.vote(selected)} >Vote</button>
          <button onClick={this.showNext} >Next anecdote</button>
        </div>
        {indexOfMostVotes >= 0 &&
          <div>
            <h1>Anecdote with most votes:</h1>
            <p>
              {this.props.anecdotes[indexOfMostVotes]}
            </p>
            <p>
              {`Has ${votes[indexOfMostVotes]} votes`}
            </p>
          </div>
        }
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)