import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchAll } from '../actions/commentActions'

class CommentList extends PureComponent {
  componentDidMount = () => {
    this.props.fetchAll()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.blog.id !== this.props.blog.id) {
      this.props.fetchAll()
    }
  }

  render() {
    return (<div>
      <h3>Comments</h3>
      {this.props.comments.map((comment) =>
        <li key={comment.id}>{comment.content}</li>)}
    </div>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  fetchAll: PropTypes.func.isRequired
}

const mapStateToProps = (state, { blog }) => ({
  comments: state.comments[blog.id] || []
})

const mapDispatchToProps = (dispatch, { blog }) => ({
  fetchAll: () => dispatch(fetchAll(blog))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
