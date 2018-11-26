import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Clean code',
      author: 'Robert C. Martin'
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = simpleBlogComponent.find('.blog-content')
    // console.log(simpleBlogComponent.debug())
    
    expect(contentDiv.text()).toContain(blog.title)
  })

  it('clicking like button twice calls event handler twice', () => {
    const blog = {
      title: 'Clean code',
      author: 'Robert C. Martin'
    }

    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
    const button = simpleBlogComponent.find('.like-button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})