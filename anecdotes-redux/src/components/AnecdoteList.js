import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AnecdoteFilter from './AnecdoteFilter'
import { vote, showNotification, clearNotification } from '../actionCreators'
import anedcoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  vote = anecdote => async () => {
    const { vote, showNotification, clearNotification } = this.props
    const withVote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anedcoteService.update(withVote)
    vote(updatedAnecdote.id)
    showNotification('Liked: ' + anecdote.content)
    setTimeout(() => clearNotification(), 5000)
  }

  render() {
    const { anecdotes } = this.props
    return (
      <div>
        <h2>Anecdotes</h2>
        <AnecdoteFilter />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <p>
              {anecdote.content} <br />
              Has {anecdote.votes}
              <button onClick={this.vote(anecdote)}>vote</button>
            </p>
          </div>
        )}
      </div>
    )
  }
  static propTypes = {
    anecdotes: PropTypes.array,
    vote: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    clearNotification: PropTypes.func.isRequired
  }
}

const anecdotesToShow = (anecdotes, filter) =>
  anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)


const mapStateToProps = state => ({
  anecdotes: anecdotesToShow(state.anecdotes, state.filter)
})

const mapDispacthToProps = {
  vote,
  showNotification,
  clearNotification
}

export default connect(mapStateToProps, mapDispacthToProps)(AnecdoteList)