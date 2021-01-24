import React from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-transition-group/CSSTransition'
import './style.scss'
const duration = 500

const TranslateInOut = ({ children, in: inProp, appear: appearProp, ...props }) => (
  <CSSTransition
    {...props}
    in
    appear={appearProp}
    classNames='fade'
    timeout={duration}>
    {children}
  </CSSTransition>
)

TranslateInOut.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool,
  appear: PropTypes.bool
}

export default TranslateInOut
