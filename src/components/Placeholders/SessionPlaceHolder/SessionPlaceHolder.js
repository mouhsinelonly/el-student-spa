import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// import TranslateInOut from 'components/transitions/TranslateInOut'
// import TransitionGroup from 'react-transition-group/TransitionGroup'

const SessionPlaceHolder = ({ className, count }) =>
Array(count).fill().map((n, i) => <div key={i} className={`card m-b-2 c-session-placeholder ${className}`}>
  <div className='c-session-placeholder__container m-a-1 m-x-3'>
    <div className='c-session-placeholder__icon' />
    <div className='c-session-placeholder__white is-icon-up' />
    <div className='c-session-placeholder__white is-icon-bottom' />
    <div className='c-session-placeholder__white is-icon-left' />
    <div className='c-session-placeholder__white is-title-bottom' />
    <div className='c-session-placeholder__white is-title-left' />
    <div className='c-session-placeholder__white is-subtitle-bottom' />
    <div className='c-session-placeholder__white is-subtitle-left' />
  </div>
</div>)

SessionPlaceHolder.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number
}

SessionPlaceHolder.defaultProps = {
  count: 1,
  className: ''
}

export default SessionPlaceHolder
