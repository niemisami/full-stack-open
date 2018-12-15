import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Badge } from 'reactstrap'

class UserListItem extends PureComponent {

  render() {
    const { user } = this.props
    return <div className='list-item' onClick={this.onClick} >
      <Link to={`/users/${user.id}`}>
        {user.name} <Badge pill> {user.blogs.length}</Badge>
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