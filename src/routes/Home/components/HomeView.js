import React from 'react'
import PropTypes from 'prop-types'
import HomePage from './HomePage'

export const HomeView = ({ children }) => children || <HomePage />

HomeView.propTypes = {
  children: PropTypes.element
}

export default HomeView
