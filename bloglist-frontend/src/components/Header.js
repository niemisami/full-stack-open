import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { logout } from '../actions/authActions'
import AppTitle from './AppTitle';

const Header = ({ user, logout }) => {
  return (
    <div className='nav-menu'>
      <Link to='/'>
        <AppTitle />
      </Link>
      <Nav />
      <p>{`${user.name} logged in`} <Button outline color='secondary' onClick={logout}>Log out</Button></p>
      <Link to='/blogs/new' tag='button' >
        <Button>Create new blog</Button>
      </Link>
    </div>
  )
}

const Nav = () => (
  <div>
    <NavLink className='nav-item' activeClassName='active' exact to='/'>Blogs</NavLink>&nbsp;
    <NavLink className='nav-item' activeClassName='active' to='/users'>Users</NavLink>&nbsp;
  </div>
)

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth
})


const mapDispatchToProps = ({
  logout
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
