import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap';
import { ReactComponent as UserIcon } from '../icons/user.svg'

function User({ user }) {
  return (
    <Row className='reveal-1'>
      <Col className='block' sm='12' md={{ size: 6, offset: 3 }}>
        {!user
          ? <p>User not found</p>
          : <>
            <h2>
            <UserIcon width='22' height='22' className='svg-icon' /> {user.name}
            </h2>
            <h3>Added blogs</h3>
            <ul>
              {user.blogs.map(blog => (
                <li key={blog._id}>{blog.title}</li>
              ))}
            </ul>
          </>
        }
      </Col>
    </Row>
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
