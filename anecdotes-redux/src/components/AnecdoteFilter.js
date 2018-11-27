import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterList } from '../actionCreators'

class AnecdoteForm extends React.Component {
  handleChange = e => {
    const filter = e.target.value
    this.props.filterList(filter)
  }
  render() {
    return (
      <div>
        Filter <input
          name='filter'
          value={this.props.filter}
          onChange={this.handleChange}
        />
      </div >
    )
  }
  static propTypes = {
    filter: PropTypes.string.isRequired,
    filterList: PropTypes.func.isRequired
  }
}

const mapStateToProps = state => ({
  filter: state.filter
})
const mapDispatchToProps = {
  filterList
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)