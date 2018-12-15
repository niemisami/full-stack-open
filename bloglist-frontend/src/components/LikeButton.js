import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as ThumbUp } from '../icons/thumbs-up.svg'


const LikeButton = ({ onClick, likes = 0 }) => {
  return (
    <div className='blog-button like' onClick={onClick} >
      <b>{likes}</b> <ThumbUp width='22' height='22' className='svg-icon' />
    </div>
  )
}

LikeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  likes: PropTypes.number
}

export default LikeButton
