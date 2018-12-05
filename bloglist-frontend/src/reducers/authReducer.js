import { actions } from '../constants'

const initialState = {
  token: null,
  name: null,
  username: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.AUTH_LOGIN:
      return {
        ...state,
        ...action.data
      }
    case actions.AUTH_LOGOUT:
      return initialState
    default:
      return state
  }
}

export default reducer
