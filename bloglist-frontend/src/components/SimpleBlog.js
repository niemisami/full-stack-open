import React from 'react'
import PropTypes from 'prop-types'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='list-item'>
    <div className='blog-content'>
      {blog.title} {blog.author}
    </div>
    <div className='blog-content-actions'>
      blog has {blog.likes} likes
      <button className='like-button' onClick={onClick}>like</button>
    </div>
  </div>
)

SimpleBlog.propTypes = {
  blog: PropTypes.object,
  onClick: PropTypes.func
}

export default SimpleBlog