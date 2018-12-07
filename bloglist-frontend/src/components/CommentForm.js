import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { create } from '../actions/commentActions'

class CommentForm extends PureComponent {
  onSubmit = event => {
    event.preventDefault()
    const comment = event.target.comment.value
    this.props.create({ content: comment })
    event.target.comment.value = ''
  }

  render() {
    return <>
      <form onSubmit={this.onSubmit}>
        <div>
          <input name='comment' placeholder='Comment' />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  }

  static propTypes = {
    create: PropTypes.func.isRequired
  }
}

const mapDispatchToProps = (dispatch, { blog }) => ({
  create: comment => dispatch(create(blog, comment))
})

export default connect(null, mapDispatchToProps)(CommentForm)