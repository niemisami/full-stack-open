import { actions } from '../constants'

const initialState = {
  show: false,
  message: null,
  notificationType: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.NOTIFICATION_SHOW:
      return {
        ...action.data,
        show: true
      }

    case actions.NOTIFICATION_CLEAR:
      return initialState

    default:
      return state
  }
}

export default reducer