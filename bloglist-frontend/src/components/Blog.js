import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { addLike, remove, addComment } from '../actions/blogActions'
import CommentList from './CommentList';
import CommentForm from './CommentForm';

function Blog({ blog, addLike, addComment, remove, showRemove }) {
  return !blog
    ? <p>Blog not found</p>
    : (
      <div className='reveal-1'>
        <h1>{blog.title}</h1>
        <a target='_blank'
          rel='noopener noreferrer'
          href={blog.url}>Read the blog</a>

        <div className='blog-details'>
          {blog.likes} likes <Button outline color='success' onClick={() => addLike(blog)}>Like</Button>
          {blog.user && `Added by ${blog.user.name}`}<br />
        </div>
        {showRemove &&
          <Button
            outline
            color='success'
            className='remove-button'
            onClick={() => remove(blog)}>
            Remove
            </Button>
        }
        <CommentList blog={blog} />
        <CommentForm blog={blog} />
      </div>
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
