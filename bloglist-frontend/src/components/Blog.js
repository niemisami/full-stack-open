import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addLike, remove } from '../actions/blogActions'

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
    const { blog, addLike, remove, showRemove } = this.props
    const { active } = this.state
    return <div className='blog-wrapper' onClick={this.onClick} style={style} >
      <p>{blog.title} {blog.author}</p>
      {
        active && (
          <div className='blog-details'>
            {blog.likes} likes <button onClick={() => addLike(blog)}>Like</button>
            {blog.user && `Added by ${blog.user.name}`}<br />
            <a target='_blank'
              rel='noopener noreferrer'
              href={blog.url}>Read the blog</a>
            {showRemove &&
              <button
                className='remove-button'
                onClick={() => remove(blog)}>Remove</button>
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
  addLike: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  showRemove: PropTypes.bool
}

const mapStateToProps = (state, { blogId }) => {
  return {
    blog: state.blogs.find(blog => blog.id === blogId),
    showRemove: !!state.auth.token
  }
}

const mapDispatchToProps = {
  addLike,
  remove
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)