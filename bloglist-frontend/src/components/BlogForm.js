import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { create } from '../actions/blogActions'

class BlogForm extends PureComponent {
  onSubmit = event => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    this.props.create(blog)
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  render() {
    return <>
      <h2>Add new blog</h2>
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor='title' >Title: </label>
          <input
            name='title' />
        </div>
        <div>
          <label htmlFor='author' >Author: </label>
          <input
            name='author'/>
        </div>
        <div>
          <label htmlFor='url' >URL: </label>
          <input
            name='url' />
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  }

  static propTypes = {
    create: PropTypes.func.isRequired
  }
}

const mapDispatchToProps = ({
  create
})

export default connect(null, mapDispatchToProps)(BlogForm)
