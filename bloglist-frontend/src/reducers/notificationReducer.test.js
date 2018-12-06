import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'
import { actions, notificationTypes } from '../constants'

describe('notification reducer', () => {
  const initialState = {
    show: false,
    message: null,
    notificationType: null
  }

  it('should return initial state when called with undefined state', () => {
    const action = {
      type: 'TEST_CALL'
    }
    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('should return notification object with show as true', () => {
    const newNotification = {
      notificationType: notificationTypes.NORMAL,
      message: 'Tests are cool',
    }
    const expectedValue = {
      notificationType: notificationTypes.NORMAL,
      message: 'Tests are cool',
      show: true
    }
    const action = {
      type: actions.NOTIFICATION_SHOW,
      data: newNotification
    }
    const state = initialState
    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toEqual(expectedValue)
  })

  it('should return initial state when notification cleared', () => {
    const previousState = {
      notificationType: notificationTypes.NORMAL,
      message: 'Tests are cool',
      show: true
    }
    const action = {
      type: actions.NOTIFICATION_CLEAR
    }
    const state = previousState
    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toEqual(initialState)
  })
})
