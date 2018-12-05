import deepFreeze from 'deep-freeze'
import blogReducer from './blogReducer'
import { actions } from '../constants'

describe('blog reducer', () => {
  const initialState = []
  const initialStateWithBlogs = [{
    id: 1,
    title: 'Clean code',
    author: 'Robert C. Martin',
    url: 'wwww.robert.c.ma',
    likes: 10,
    user: {
      name: 'Sami'
    }
  }]

  it('should return empty array when called with undefined state', () => {
    const action = {
      type: 'TEST_CALL'
    }
    const newState = blogReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('adds list of blogs to the state', () => {
    const newBlog = {
      id: 2,
      title: 'Clean code',
      author: 'Robert C. Martin',
      url: 'wwww.robert.c.ma',
      likes: 10,
      user: {
        name: 'Sami'
      }
    }
    const action = {
      type: actions.BLOGS_FETCH,
      data: [newBlog]
    }
    const state = initialState
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState.length).toBe(state.length + 1)
    expect(newState[0]).toEqual(newBlog)
  })

  it('adds new blog to the state', () => {
    const newBlog = {
      id: 2,
      title: 'Code complete',
      author: 'Steve McConnell',
      url: 'google.com',
      likes: 5,
      user: {
        name: 'Sami'
      }
    }
    const action = {
      type: actions.BLOG_CREATE,
      data: newBlog
    }
    const state = initialStateWithBlogs
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState.length).toBe(state.length + 1)
    expect(newState[1]).toEqual(newBlog)
  })

  it('updates blog to the state', () => {
    const blogToUpdate = {
      id: 1,
      title: 'Clean coder',
      author: 'Robert C. Martin',
      url: 'wwww.robert.c.ma',
      likes: 20,
      user: {
        name: 'Sami'
      }
    }
    const action = {
      type: actions.BLOG_UPDATE,
      data: blogToUpdate
    }
    const state = initialStateWithBlogs
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState.length).toBe(state.length)
    expect(newState[0]).toEqual(blogToUpdate)
  })

  it('deletes blog to the state', () => {
    const blogToDelete = initialStateWithBlogs[0]
    const action = {
      type: actions.BLOG_DELETE,
      data: blogToDelete
    }
    const state = initialStateWithBlogs
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState.length).toBe(state.length - 1)
    expect(newState).not.toContain(blogToDelete)
  })
})
