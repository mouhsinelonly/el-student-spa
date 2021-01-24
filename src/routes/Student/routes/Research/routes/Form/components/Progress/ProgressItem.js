import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ProgressItem extends Component {
  static propTypes = {
    isDone: PropTypes.bool
  }
  render () {
    const {isDone} = this.props
    return (
      <li className={`c-research-progress__item ${isDone && 'is-active'}`} />
    )
  }
}

export default ProgressItem
