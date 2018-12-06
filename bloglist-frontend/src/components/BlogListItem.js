import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const style = {
  padding: '1rem',
  borderBottom: '1px solid black'
}

class BlogListItem extends PureComponent {
  render() {
    const { blog } = this.props
    return <div className='blog-wrapper' onClick={this.onClick} style={style} >
       <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div >
  }
}

BlogListItem.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  })
}

export default BlogListItem