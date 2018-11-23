import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class BlogForm extends PureComponent {

  state = {
    title: '',
    author: '',
    url: ''
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault() 
    this.props.onSubmit(this.state)
  }

  render() {
    const {  title, author, url } = this.state
    return <>
      <h2>Add new blog</h2>
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor='title' >Title: </label>
          <input
            name='title'
            value={title}
            onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor='author' >Author: </label>
          <input
            name='author'
            value={author}
            onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor='url' >URL: </label>
          <input
            name='url'
            value={url}
            onChange={this.handleInputChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
}

export default BlogForm
