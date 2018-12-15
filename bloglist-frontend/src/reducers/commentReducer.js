import { actions } from '../constants'

const reducer = (state = {}, action) => {
  switch(action.type) {
    case actions.COMMENTS_FETCH:
      return action.data

    case actions.COMMENT_CREATE:
      // Comments returned as object where key is id of blog
      /* eslint-disable-next-line */
      const [key, newComment] = Object.entries(action.data)[0]
      return {
        ...state,
        [key]: state[key] ? state[key].concat(newComment) : [newComment]
      }
    default:
      return state
  }
}

export default reducer