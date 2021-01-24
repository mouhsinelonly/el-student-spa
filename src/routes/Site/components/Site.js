// @flow
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Navbar from '../../Home/components/Navbar/'
import { getRegistrationPeriod } from 'modules/registration_period'
import Footer from 'components/Footer/'
// import css
import './Site.scss'

export const Site = ({ children, height }: Object): Array<React.Element> => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRegistrationPeriod())
  })
  return [
    <Navbar key='navbar' />,
    <div key='content' style={{ minHeight: (height - 96 - 88) }} className='site-container'>
      {children}
    </div>,
    <Footer key='footer' />]
}

Site.propTypes = {
  children: PropTypes.element,
  height: PropTypes.number
}

export default Site
