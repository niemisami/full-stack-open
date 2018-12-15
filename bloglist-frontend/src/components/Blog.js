import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { addLike, remove, addComment } from '../actions/blogActions'
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { ReactComponent as LinkIcon } from '../icons/link.svg'
import LikeButton from './LikeButton';
import RemoveButton from './RemoveButton';
import { ReactComponent as Book } from '../icons/book.svg'

function Blog({ blog, addLike, addComment, remove, showRemove }) {
  return (
    <Row className='reveal-1'>
      <Col className='block' sm='12' md={{ size: 6, offset: 3 }}>
        {!blog
          ? <p className='reveal-1'>Blog not found</p>
          : <>
            <h2>
              <Book width='22' height='22' className='svg-icon' /> {blog.title}
            </h2>
            <div className='blog-details'>
              <a target='_blank'
                rel='noopener noreferrer'
                href={blog.url}>
                Read the blog <LinkIcon width='22' height='22' className='svg-icon' />
              </a>
              <p>
                {blog.user && `Added by ${blog.user.name}`}
              </p>
              <div>
                <LikeButton likes={blog.likes} onClick={() => addLike(blog)} />
                {showRemove &&
                  <RemoveButton
                    onClick={() => remove(blog)}>
                    Remove
                  </RemoveButton>
                }
              </div>
            </div>
            <CommentList blog={blog} />
            <CommentForm blog={blog} />
          </>
        }
      </Col>
    </Row>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object
  }),
  addLike: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  showRemove: PropTypes.bool
}

const mapStateToProps = (state, { blogId }) => {
  const blog = state.blogs.find(blog => blog.id === blogId)
  const username = state.auth.username
  const showRemove = blog && blog.user && blog.user.username === username
  return {
    blog,
    showRemove
  }
}


const mapDispatchToProps = {
  addLike,
  addComment,
  remove
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
