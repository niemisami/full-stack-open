import deepFreeze from 'deep-freeze'
import authReducer from './authReducer'
import { actions } from '../constants'

describe('auth reducer', () => {
  const initialState = {
    token: null,
    name: null,
    username: null
  }

  it('should return initial state when called with undefined state', () => {
    const action = {
      type: 'TEST_CALL'
    }
    const newState = authReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('should return auth object after logged in', () => {
    const newAuth = {
      username: 'testityyppi',
      token: '111222',
      name: 'Testi Tyyppi'
    }
    const action = {
      type: actions.AUTH_LOGIN,
      data: newAuth
    }
    const state = initialState
    deepFreeze(state)
    const newState = authReducer(state, action)
    expect(newState).toEqual(newAuth)
  })

  it('should return initial state after logged out', () => {
    const action = {
      type: actions.AUTH_LOGOUT
    }
    const state = initialState
    deepFreeze(state)
    const newState = authReducer(state, action)
    expect(newState).toEqual(initialState)
  })
})