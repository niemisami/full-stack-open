import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AnecdoteFilter from './AnecdoteFilter'
import { vote } from '../actionCreators'

class AnecdoteList extends React.Component {
  vote = anecdote => async () => {
    this.props.vote(anecdote)
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
    vote: PropTypes.func.isRequired
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
  vote
}

export default connect(mapStateToProps, mapDispacthToProps)(AnecdoteList)