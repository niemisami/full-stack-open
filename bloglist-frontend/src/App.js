import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { logout, checkAuth } from './actions/authActions'

class App extends React.Component {

  componentDidMount = () => {
    this.props.checkAuth()
  }
  
  handleLogOut = () => {
    this.props.logout()
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <Notification />
        {user.token !== null
          ? <>
            <h1 className='header'>Blogs</h1>
            <h2>blogs</h2>
            {`${user.name} logged in`} <button onClick={this.handleLogOut}>Log out</button>
            <BlogForm />
            <BlogList  />
          </>
          : <LoginForm />

        }
      </div>
    )
  }
  static propTypes ={
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired
  }
}

const mapStateToProps = (state) => ({
  user: state.auth
})

const mapDispatchToProps = {
  logout,
  checkAuth
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
