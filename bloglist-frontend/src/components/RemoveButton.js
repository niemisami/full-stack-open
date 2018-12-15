import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Trash } from '../icons/trash.svg'


const Remove = ({ onClick }) => {
  return (
    <div className='blog-button remove' onClick={onClick} >
      <Trash width='22' height='22' className='svg-icon' /> Remove
    </div>
  )
}

Remove.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Remove
