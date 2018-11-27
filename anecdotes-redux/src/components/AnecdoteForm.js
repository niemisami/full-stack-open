import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAnecdote, showNotification, clearNotification } from '../actionCreators'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const { createAnecdote, clearNotification } = this.props
    createAnecdote(content)
    e.target.anecdote.value = ''
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