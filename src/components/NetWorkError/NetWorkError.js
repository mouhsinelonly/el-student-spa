import React from 'react'
import PropTypes from 'prop-types'
// import css
import './NetWorkError.scss'

export const NetWorkError = (props) => (<div onClick={props.hideNetWorkError}
  className={'network-error-container' + ' ' + (props.seen && ' hidden-xs-up')}>
  <div className='container'>{props.message}</div>
</div>)

NetWorkError.defaultProps = {
  seen: true,
  message: ''
}

NetWorkError.propTypes = {
  seen: PropTypes.bool,
  hideNetWorkError: PropTypes.func,
  message: PropTypes.string
}

export default NetWorkError
