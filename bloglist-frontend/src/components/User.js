import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function User({ user }) {
  return !user
    ? <p>User not found</p>
    : (
      <div>
        <h1>{user.name}</h1>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog._id}>{blog.title}</li>
          ))}
        </ul>

      </div>
    )
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
}

const mapStateToProps = (state, { userId }) => ({
  user: state.users.find(user => user.id === userId)
})


export default connect(mapStateToProps)(User)
