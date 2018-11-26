import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Clean code',
    author: 'Robert C. Martin',
    url: 'wwww.robert.c.ma',
    likes: 10,
    user: {
      name: 'Sami'
    }
  }
  it('renders content', () => {
    const blogComponent = shallow(
      <Blog
        blog={blog}
        onRemoveClick={() => { }}
        onLikeClick={() => { }}
      />
    )
    const contentDiv = blogComponent.find('.blog-wrapper')

    expect(contentDiv.text()).toContain(blog.title)
  })

  it('clicking the blog displays details', () => {
    const blogComponent = shallow(
      <Blog
        blog={blog}
        onRemoveClick={() => { }}
        onLikeClick={() => { }}
      />)
    const blogWrapperDiv = blogComponent.find('.blog-wrapper')
    blogWrapperDiv.simulate('click')

    const blogDetailsDiv = blogComponent.find('.blog-details')

    expect(blogDetailsDiv.text()).toContain(blog.user.name)
  })
})
