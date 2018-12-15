
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserListItem from './UserListItem'
import { fetchAll } from '../actions/userActions'

class UserList extends PureComponent {
  componentDidMount = () => {
    this.props.fetchAll()
  }

  render() {
    const { users } = this.props
    return <>
      <h2 className='reveal-down-1'>Users</h2>
      <div className='reveal-1 reveal-delay'>
        {users.map(user =>
          <UserListItem key={user.id} user={user} />
        )}
      </div>
    </>
  }

  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    }))
  }
  static propTypes = {
    users: PropTypes.array.isRequired,
    fetchAll: PropTypes.func.isRequired
  }
}

const mapStateToProps = (state) => ({
  users: sortByMostBlogs(state.users)
})

const mapDispatchToProps = {
  fetchAll
}

const sortByMostBlogs = users => users.sort((userA, userB) => userB.blogs.length - userA.blogs.length)

export default connect(mapStateToProps, mapDispatchToProps)(UserList)

