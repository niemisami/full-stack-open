import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { login } from '../actions/authActions'
import AppTitle from '../components/AppTitle'

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
    <Row>
      <Col sm='12' md={{ size: 6, offset: 3 }}>
        <AppTitle isSmall />
        <div  className='login-container reveal-1'>
          <h3 className='header'>Log in to learn and share
        </h3>
          <Form onSubmit={handleLoginFormSubmit} >
            <FormGroup>
              <Input
                className='form-input'
                placeholder='Username'
                name='username' />
            </FormGroup>
            <FormGroup>
              <Input
                className='form-input'
                placeholder='password'
                type='password'
                name='password' />
            </FormGroup>
            <Button outline color='primary' type='submit'>Log in</Button>
          </Form>
        </div>
      </Col>
    </Row >
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

const mapDispatchToProps = ({
  login
})

export default connect(null, mapDispatchToProps)(LoginForm)
