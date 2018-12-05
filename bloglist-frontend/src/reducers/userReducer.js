import { actions } from '../constants'

const reducer = (state = [], action) => {
  switch(action.type) {
  case actions.USERS_FETCH:
    return action.data
  default:
    return state
  }
}

export default reducer