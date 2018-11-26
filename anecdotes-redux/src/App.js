
import React from 'react';
import actionsFor from './actionCreators'

class App extends React.Component {
  handleSubmit = event => {
    event.preventDefault()
    this.props.store.dispatch(
      actionsFor.anecdoteCreation(event.target.anecdote.value)
    )
  }
  vote = id => () => {
    this.props.store.dispatch(
      actionsFor.vote(id)
    )
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              Has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>Create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default App
