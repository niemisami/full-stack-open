import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='blog-wrapper'>
    <div className='blog-content'>
      {blog.title} {blog.author}
    </div>
    <div className='blog-content-actions'>
      blog has {blog.likes} likes
      <button className='like-button' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog