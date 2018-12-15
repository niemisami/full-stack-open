import blogService from '../services/blogs'
import { notifyWith } from './notificationActions'
import { actions, notificationTypes } from '../constants'

export const fetchAll = () => async(dispatch, getState) => {
  try {
    const token = getState().auth.token
    const blogs = await blogService.getAll(token)
    dispatch({ type: actions.BLOGS_FETCH, data: blogs })
  } catch(error) {
    console.error(error)
    dispatch(notifyWith(`Error fetching blogs`, notificationTypes.ERROR))
  }
}

export const create = blog => async(dispatch, getState) => {
  try {
    const token = getState().auth.token
    const newBlog = await blogService.createNew(blog, token)
    dispatch(notifyWith(`New blog ${newBlog.title} created`, notificationTypes.NORMAL))
    dispatch({ type: actions.BLOG_CREATE, data: newBlog })
  } catch(error) {
    console.error(error)
    dispatch(notifyWith(`Error creating blog "${blog.title}"`, notificationTypes.ERROR))
  }
}

export const update = (blog, message) => async(dispatch, getState) => {
  try {
    const token = getState().auth.token
    const newBlog = await blogService.update(blog, token)
    dispatch(notifyWith(message || `New blog ${newBlog.title} created`, notificationTypes.NORMAL))
    dispatch({ type: actions.BLOG_UPDATE, data: newBlog })
  } catch(error) {
    console.error(error)
    dispatch(notifyWith(`Error updating blog ${blog.title}`, notificationTypes.ERROR))
  }
}

export const remove = blog => async(dispatch, getState) => {
  try {
    const token = getState().auth.token
    await blogService.remove(blog, token)
    dispatch(notifyWith(`Blog ${blog.title} removed`, notificationTypes.NORMAL))
    dispatch({ type: actions.BLOG_DELETE, data: blog })
  } catch(error) {
    console.error(error)
    dispatch(notifyWith(`Error removing blog ${blog.title}`, notificationTypes.ERROR))
  }
}

export const addLike = blog => async(dispatch) => {
  try {
    const blogWithNewLike = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(update(blogWithNewLike, `Like added to "${blog.title}"`))
  } catch(error) {
    console.error(error)
    dispatch(notifyWith(`Error adding like to a blog "${blog.title}"`, notificationTypes.ERROR))
  }
}

export const addComment = (blog, comment) => async(dispatch) => {
  try {
    if(!comment.length) {
      return dispatch(notifyWith(`Please write some comment first`, notificationTypes.ERROR))
    }
    const blogWithComment = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    dispatch(update(blogWithComment, `Comment "${comment}" added to ${blog.title}`))
  } catch(error) {
    console.error(error)
    dispatch(notifyWith(`Error adding comment to a blog "${blog.title}"`, notificationTypes.ERROR))
  }
}