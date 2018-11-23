
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import storageService from '../services/storage'

class BlogList extends PureComponent {
  state = {
    activeIds: []
  }

  handleItemClick = itemId => () => {
    const { activeIds } = this.state

    const newActiveItems =
      activeIds.includes(itemId)
        ? activeIds.filter(item => item.id === itemId)
        : activeIds.concat(itemId)

    this.setState({ activeIds: newActiveItems })
  }

  onLikeClick = blog => () => this.props.onLikeClick(blog)
  onRemoveClick = blog => () => this.props.onRemoveClick(blog)

  render() {
    const { activeIds } = this.state
    const { blogs } = this.props
    return blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        active={activeIds.includes(blog.id)}
        onLikeClick={this.onLikeClick(blog)}
        onRemoveClick={this.onRemoveClick(blog)}
        onClick={this.handleItemClick(blog.id)}
        showRemove={!!blog.user || !!storageService.getItem('user')}
      />
    )
  }

  static propTypes = {
    blogs: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    })),
    onLikeClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired
  }
}

export default BlogList

