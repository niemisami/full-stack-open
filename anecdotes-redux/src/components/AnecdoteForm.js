import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAnecdote, showNotification, clearNotification } from '../actionCreators'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const { createAnecdote, clearNotification } = this.props

    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew({ content, votes: 0 })
    createAnecdote(newAnecdote)

    showNotification('New anecdote' + content + ' created')
    setTimeout(() => {
      clearNotification()
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>Submit</button>
        </form>
      </div>
    )
  }
  static propTypes = {
    createAnecdote: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    clearNotification: PropTypes.func.isRequired
  }
}

const mapDispatchToProps = {
  createAnecdote,
  showNotification,
  clearNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)