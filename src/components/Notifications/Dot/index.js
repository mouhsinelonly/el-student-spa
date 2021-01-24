import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'
export const Dot = (props) => <span className={`c-notifications__dot
  ${props.className} img-circle bg-${props.color} ${props.blink && 'is-blinking'}`} />

Dot.defaultProps = {
  color: 'success',
  className: ''
}

Dot.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
}

export default Dot
