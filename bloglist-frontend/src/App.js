import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog';
import UserList from './components/UserList';
import User from './components/User';

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
        {user.token == null
          ? <LoginForm />
          : <Router>
            <>
              <Header />
              <>
                <Route path='/' exact component={BlogList} />
                <Route path='/blogs/new' component={BlogForm} />
                <Route path='/blogs/:blogId' render={({ match }) => (
                  <Blog blogId={match.params.blogId} />
                  )} />
                  <Route path='/blogs' component={BlogList} />
                <Route path='/users/:userId' render={({ match }) => (
                  <User userId={match.params.userId} />
                  )} />
                  <Route path='/users' component={UserList} />
              </>
            </>
          </Router>
        }
      </div>
    )
  }
  static propTypes = {
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
