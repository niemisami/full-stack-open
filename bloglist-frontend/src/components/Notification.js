import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { notificationTypes } from '../constants'
import { ReactComponent as Exclamation } from '../icons/exclamation-outline.svg'
import { ReactComponent as Checkmark } from '../icons/checkmark-outline.svg'

const Notification = ({ message, show, notificationType }) => {
  if(!show) {
    return null
  }
  const isNormal = notificationType === notificationTypes.NORMAL
  const className = isNormal ? '' : ' error'
  const Icon = isNormal ? Checkmark : Exclamation
  return (
    <div className={`notification reveal-down-1 ${className}`}>
      <Icon width='22' height='22' className='svg-icon' /> {message}
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
