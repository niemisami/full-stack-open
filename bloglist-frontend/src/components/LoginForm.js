import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'

const LoginForm = ({ login }) => {
  const handleLoginFormSubmit = event => {
    event.preventDefault()
    const user = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    login(user)
    event.target.username.value = ''
    event.target.password.value = ''
  }
  return (
    <div>
      <h1 className='header'>Log in to application</h1>
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          <label htmlFor='username' >Name: </label>
          <input
            name='username' />
        </div>
        <div>
          <label htmlFor='password' >Password: </label>
          <input
            name='password' />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes ={
  login: PropTypes.func.isRequired
}

const mapDispatchToProps = ({
  login
})

export default connect(null, mapDispatchToProps)(LoginForm)
