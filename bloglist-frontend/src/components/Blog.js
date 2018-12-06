import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addLike, remove } from '../actions/blogActions'

function Blog({ blog, addLike, remove, showRemove }) {
  return !blog
    ? <p>Blog not found</p>
    : (
      <div>
        <h1>{blog.title}</h1>
        <a target='_blank'
          rel='noopener noreferrer'
          href={blog.url}>Read the blog</a>

        <div className='blog-details'>
          {blog.likes} likes <button onClick={() => addLike(blog)}>Like</button>
          {blog.user && `Added by ${blog.user.name}`}<br />
        </div>
        {showRemove &&
          <button
            className='remove-button'
            onClick={() => remove(blog)}>Remove</button>
        }
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
  remove
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
