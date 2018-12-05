import loginService from '../services/login'
import storageService from '../services/storage'
import { notifyWith } from './notificationActions'
import { actions, notificationTypes } from '../constants'

export const login = credentials => async dispatch => {
  try {
    const user = await loginService.login(credentials)
    dispatch({ type: actions.AUTH_LOGIN, data: user })
    storageService.setItem('user', user)
    dispatch(notifyWith(`${user.name} successfully logged in`, notificationTypes.NORMAL))
  } catch(error) {
    console.error(error)
    dispatch(notifyWith(`Could not log in`, notificationTypes.ERROR))
    storageService.removeItem('user')
  }
}

export const logout = () => async dispatch => {
  dispatch({ type: actions.AUTH_LOGOUT })
  storageService.removeItem('user')
  dispatch(notifyWith(`Successfully logged out`, notificationTypes.NORMAL))
}

export const checkAuth = () => dispatch => {
  const userJson = storageService.getItem('user')
  if(userJson) {
    const user = JSON.parse(userJson)
    dispatch({ type: actions.AUTH_LOGIN, data: user })
  }
}