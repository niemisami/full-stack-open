import deepFreeze from 'deep-freeze'
import userReducer from './userReducer'
import { actions } from '../constants'

describe('user reducer', () => {
  const initialState = []

  it('should return empty array when called with undefined state', () => {
    const action = {
      type: 'TEST_CALL'
    }
    const newState = userReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('adds list of users to the state', () => {
    const newUser = {
      name: 'Testi Tyyppi',
      username: 'testityyppi',
      token: '12354321'
    }
    const action = {
      type: actions.USERS_FETCH,
      data: [newUser]
    }
    const state = initialState
    deepFreeze(state)
    const newState = userReducer(state, action)
    expect(newState.length).toBe(state.length + 1)
    expect(newState[0]).toEqual(newUser)
  })
})
