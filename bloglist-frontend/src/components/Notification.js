import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { notificationTypes } from '../constants'

const generateStyle = color => ({
  border: `1px solid ${color}`,
  padding: '1rem',
  color
})

const Notification = ({ message, show, notificationType }) => {
  if(!show) {
    return null
  }
  const styles = generateStyle(notificationType === notificationTypes.NORMAL ? '#388e3c' : '#d32f2f')
  const className = notificationType === notificationTypes.NORMAL ? 'normal' : 'error'
  return (
    <div style={styles} className={className}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
  notificationType: PropTypes.number
}

const mapStateToProps = ({ notification }) => ({
  message: notification.message,
  notificationType: notification.notificationType,
  show: notification.show
})

export default connect(mapStateToProps)(Notification)
