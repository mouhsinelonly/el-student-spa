import React from 'react'
import PropTypes from 'prop-types'

function Youtube (props) {
  return (
    <div className='embed-responsive embed-responsive-16by9'>
      <iframe
        className='embed-responsive-item'
        src={`//www.youtube.com/embed/${props.youtubeId}?rel=0&modestbranding=1&showinfo=0&color=white&autoplay=0`}
      />
    </div>
  )
}

Youtube.propTypes = {
  youtubeId: PropTypes.string
}
export default Youtube
