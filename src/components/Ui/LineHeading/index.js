import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export const LineHeading = props => <h4 className={`c-line-heading__title' ${props.className}`}>
  <span className='c-line-heading__text'>{props.text}</span>
  {props.children}
</h4>

LineHeading.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.element
}

export default LineHeading

