import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const style = {
  padding: '1rem',
  borderBottom: '1px solid black'
}
class Blog extends PureComponent {
  state = {
    active: false
  }

  onClick = () => this.setState(prevState => ({ active: !prevState.active }))

  render() {
    const { blog, onLikeClick, onRemoveClick, showRemove } = this.props
    const { active } = this.state
    return <div className='blog-wrapper' onClick={this.onClick} style={style} >
      <p>{blog.title} {blog.author}</p>
      {
        active && (
          <div className='blog-details'>
            {blog.likes} likes <button onClick={onLikeClick}>Like</button>
            {blog.user && `Added by ${blog.user.name}`}<br />
            <a target='_blank'
              rel='noopener noreferrer'
              href={blog.url}>Read the blog</a>
            {showRemove &&
              <button
        className='remove-button'
        onClick={onRemoveClick}>Remove</button>
      }
          </div>
        )
  }
    </div >
  }
}

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
  onLikeClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  showRemove: PropTypes.bool
}

export default Blog