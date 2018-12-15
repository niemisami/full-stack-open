import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Book } from '../icons/book.svg'

const AppTitle = ({ title = 'BlogHold' }) => {
  return (
    <Title>
      {title}
    </Title>
  )
}
const Title = ({ children }) =>
  <h4 className='app-title reveal-down-1 smaller'>
    {children}
    <Book width='22' height='22' className='svg-icon' />
  </h4>
Title.propTypes = { children: PropTypes.string.isRequired }



AppTitle.propTypes = {
  title: PropTypes.string,
  isSmall: PropTypes.bool
}

export default AppTitle

