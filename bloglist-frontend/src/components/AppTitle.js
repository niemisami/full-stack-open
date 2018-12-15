import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Book } from '../icons/book.svg'

const AppTitle = ({ title = 'BlogHold', isSmall }) => {
  const TitleComponent = isSmall ? Small : Large
  return (
    <TitleComponent>
      {title}
    </TitleComponent>
  )
}

const Large = ({ children }) => <h1 className='app-title reveal-down-1'>
  {children}
  <Book width='22' height='22' className='svg-icon' /></h1>
Large.propTypes = { children: PropTypes.string.isRequired }

const Small = ({ children }) => <h4 className='app-title reveal-down-1 smaller'>
  {children}
  <Book width='22' height='22' className='svg-icon' /></h4>
Small.propTypes = { children: PropTypes.string.isRequired }



AppTitle.propTypes = {
  title: PropTypes.string,
  isSmall: PropTypes.bool
}

export default AppTitle

