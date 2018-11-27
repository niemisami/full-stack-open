import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAnecdote } from '../actionCreators'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const { createAnecdote } = this.props

    const content = e.target.anecdote.value
    createAnecdote(content)
    e.target.anecdote.value = ''
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
    createAnecdote: PropTypes.func.isRequired
  }
}

const mapDispatchToProps = {
  createAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)