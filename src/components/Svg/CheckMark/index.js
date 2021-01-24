import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export const CheckMark = (props) => <svg className={`c-svg-checkmark ${props.className}`}
  xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'>
  <circle className='c-svg-checkmark__circle'
    cx='26' cy='26' r='25' fill='none' />
  <path className='c-svg-checkmark__check' fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8' />
</svg>

CheckMark.propTypes = {
  className: PropTypes.string
}

export default CheckMark
