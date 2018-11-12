import React from 'react'

const Notification = ({ message, notificationType }) => {
  if (message === null) {
    return null
  }
  const className = notificationType === notificationTypes.NORMAL ? 'normal' : 'error'
  return (
    <div className={className}>
      {message}
    </div>
  )
}

export const notificationTypes = {
  NORMAL: 0,
  ERROR: 1
}

export default Notification
