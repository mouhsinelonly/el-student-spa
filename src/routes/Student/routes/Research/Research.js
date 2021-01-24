import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Home from './components/Home'

class Research extends Component {
  static propTypes = {
    children: PropTypes.element
  }
  render () {
    const {children} = this.props

    return (children || <Home />)
  }
}

export default Research
