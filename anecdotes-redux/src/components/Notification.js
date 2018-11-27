import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = ({ show, message }) => {
  if(!show) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}
Notification.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string
}

const mapStateToProps = state => ({
  show: state.notification.show,
  message: state.notification.message
})

export default connect(mapStateToProps)(Notification)
