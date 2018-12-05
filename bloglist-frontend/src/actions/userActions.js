import userService from '../services/users'
import { notifyWith } from './notificationActions'
import { actions, notificationTypes } from '../constants'

export const fetchAll = () => async(dispatch, getState) => {
  try {
    const token = getState().auth.token
    const users = await userService.getAll(token)
    dispatch({ type: actions.USERS_FETCH, data: users })
  } catch(error) {
    console.error(error)
    dispatch(notifyWith(`Error fetching users`, notificationTypes.ERROR))
  }
}
