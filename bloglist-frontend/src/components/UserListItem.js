import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const style = {
  padding: '1rem',
  borderBottom: '1px solid black'
}

class UserListItem extends PureComponent {
  
  render() {
    const { user } = this.props
    return <div className='user-wrapper' onClick={this.onClick} style={style} >
      <Link to={`/users/${user.id}`}>
        {user.name} {user.blogs.length}
      </Link>
    </div >
  }
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    blogs: PropTypes.array.isRequired
  })
}

export default UserListItem