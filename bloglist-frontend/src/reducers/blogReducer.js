import { actions } from '../constants'

const reducer = (state = [], action) => {
  switch(action.type) {
    case actions.BLOGS_FETCH:
      return action.data

    case actions.BLOG_CREATE:
      return state.concat(action.data)

    case actions.BLOG_UPDATE:
      return state.filter(blog => blog.id !== action.data.id)
        .concat(action.data)

    case actions.BLOG_DELETE:
      return state.filter(blog => blog.id !== action.data.id)

    default:
      return state
  }
}

export default reducer