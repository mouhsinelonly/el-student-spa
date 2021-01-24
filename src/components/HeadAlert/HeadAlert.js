import React from 'react'
import PropTypes from 'prop-types'
import './HeadAlert.scss'

export const HeadAlert = (props) => (<div className={`alert alert-${props.level} text-xs-center m-a-0`} role='alert'>
  {props.children}
</div>)

HeadAlert.propTypes = {
  level: PropTypes.string.isRequired,
  // text: PropTypes.string.isRequired,
  children: PropTypes.array
}

HeadAlert.defaultProps = {
  level: 'info',
  text: ''
}

export default HeadAlert
