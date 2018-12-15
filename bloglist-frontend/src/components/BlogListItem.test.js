import React from 'react'
import { shallow } from 'enzyme'
import BlogListItem from './BlogListItem'

describe('<BlogListItem />', () => {
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
      <BlogListItem
        blog={blog}
      />
    )
    const contentDiv = blogComponent.find('.list-item')

    expect(contentDiv.text()).toContain(blog.title)
  })

  it('clicking the blog displays details', () => {
    const blogComponent = shallow(
      <BlogListItem
        blog={blog}
        onRemoveClick={() => { }}
        onLikeClick={() => { }}
      />)
    const blogWrapperDiv = blogComponent.find('.list-item')
    blogWrapperDiv.simulate('click')

    const blogDetailsDiv = blogComponent.find('.blog-details')

    expect(blogDetailsDiv.text()).toContain(blog.user.name)
  })
})
