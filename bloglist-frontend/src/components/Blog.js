import React from 'react'
import PropTypes from 'prop-types'

const style = {
  padding: '1rem',
  borderBottom: '1px solid black'
}
const Blog = ({ blog, active, onClick, onLikeClick, onRemoveClick, showRemove }) => (
  <div onClick={onClick} style={style}>
    <p>{blog.title} {blog.author}</p>
    {active && (
      <>
        <p>
          {blog.likes} likes <button onClick={onLikeClick}>Like</button><br />
          {blog.user && `Added by ${blog.user.name}`}<br />
          <a target='_blank'
            rel='noopener noreferrer'
            href={blog.url}>Read the blog</a>
        </p>
        {showRemove &&
          <button onClick={onRemoveClick}>Remove</button>
        }
      </>
    )}
  </div>
)

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }),
  active: PropTypes.bool,
  onLikeClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  showRemove: PropTypes.bool
}

export default Blog