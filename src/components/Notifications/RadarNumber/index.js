import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'
export const RadarNumber = (props) => <span className={`${props.className}
c-notifications__radar`} >{props.number}</span>

RadarNumber.defaultProps = {
  number: 0,
  className: ''
}

RadarNumber.propTypes = {
  number: PropTypes.number,
  className: PropTypes.string
}

export default RadarNumber
