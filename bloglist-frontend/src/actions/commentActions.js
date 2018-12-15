import commentService from '../services/comments'
import { notifyWith } from './notificationActions'
import { actions, notificationTypes } from '../constants'

export const fetchAll = blog => async(dispatch, getState) => {
  try {
    const token = getState().auth.token
    const comments = await commentService.getAll(blog, token)
    dispatch({ type: actions.COMMENTS_FETCH, data: comments })
  } catch(error) {
    console.error(error)
    dispatch(notifyWith(`Error fetching comments`, notificationTypes.ERROR))
  }
}

export const create = (blog, comment) => async(dispatch, getState) => {
  try {
    const token = getState().auth.token
    const newComment = await commentService.createNew(blog, comment, token)
    dispatch(notifyWith(`New comment "${newComment[blog.id].content}" for blog "${blog.title}" created`, notificationTypes.NORMAL))
    dispatch({ type: actions.COMMENT_CREATE, data: newComment })
  } catch(error) {
    console.error(error)
    dispatch(notifyWith(`Error creating comment "${comment.content}"`, notificationTypes.ERROR))
  }
}
