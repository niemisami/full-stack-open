import { actions } from '../constants'

export const notifyWith = (message, notificationType, seconds = 5) => async dispatch => {
  dispatch(showNotification(message, notificationType))
  setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000)
}

export const showNotification = (message, notificationType) => ({
  type: actions.NOTIFICATION_SHOW,
  data: {
    message,
    notificationType
  }
})

export const clearNotification = () => ({
  type: actions.NOTIFICATION_CLEAR
})