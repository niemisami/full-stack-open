import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../actions/authActions'

const Header = ({ user }) => {
  return (
    <div>
      <Link to='/'>
        <h1 className='header'>
          BLOG APP
      </h1>
      </Link>
      <Nav />
      <p>{`${user.name} logged in`} <button onClick={logout}>Log out</button></p>
      <p>
        <Link to='/blogs/new' tag='button' >Create new blog</Link>
      </p>
    </div>
  )
}

const Nav = () => (
  <div >
    <NavLink exact to='/'>Blogs</NavLink>&nbsp;
    <NavLink to='/users'>Users</NavLink>&nbsp;
  </div>
)

Header.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.auth
})


const mapDispatchToProps = ({
  logout
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
