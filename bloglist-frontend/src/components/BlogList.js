
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Blog from './Blog'
import { fetchAll } from '../actions/blogActions'

class BlogList extends PureComponent {
  componentDidMount = () => {
    this.props.fetchAll()
  }

  render() {
    const { blogs } = this.props
    return blogs.map(blog =>
      <Blog key={blog.id} blogId={blog.id} />
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
    }))
  }
  static propTypes = {
    blogs: PropTypes.array.isRequired,
    fetchAll: PropTypes.func.isRequired
  }
}

const mapStateToProps = (state) => ({
  blogs: sortByLikes(state.blogs)
})

const mapDispatchToProps = {
  fetchAll
}

const sortByLikes = blogs => blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)

