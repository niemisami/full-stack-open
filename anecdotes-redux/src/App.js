
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { anecdoteInitialization } from './actionCreators'

class App extends PureComponent {
  componentDidMount = async () => {
    this.props.anecdoteInitialization()
  }
  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    )
  }

  static propTypes = {
    anecdoteInitialization: PropTypes.func.isRequired
  }
}

const mapDispatchToProps = {
  anecdoteInitialization
}
export default connect(null, mapDispatchToProps)(App)
