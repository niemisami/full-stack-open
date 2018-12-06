import React from 'react'
import { mount } from 'enzyme'

import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'

describe('<App />', () => {

  let app
  describe('when user is not logged in', () => {
    beforeEach(() => {
      localStorage.clear()
      app = mount(<App />)
    })
    it('does not render blog list if user is not logged in', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'testityyppi',
        token: '111222',
        name: 'Testi Tyyppi'
      }
      window.localStorage.setItem('user', JSON.stringify(user))
      // Requires mount because localStorage is checked out only during componentDidMount
      app = mount(<App />)
    })
    it('renders blog list if user is not logged in', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
