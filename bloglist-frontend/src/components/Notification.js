import React from 'react'
import PropTypes from 'prop-types'
import { notificationTypes } from '../constants'

const generateStyle = color => ({
  border: `1px solid ${color}`,
  padding: '1rem',
  color
})

const Notification = ({ message, notificationType }) => {
  if(message === null) {
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
  notificationType: PropTypes.number
}



export default Notification
