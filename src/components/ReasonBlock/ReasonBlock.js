import React, { Component } from 'react'
import './style.scss'
import PropTypes from 'prop-types'
class ReasonBlock extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    desc: PropTypes.string,
    active: PropTypes.bool,
    hasdesciption: PropTypes.bool,
    title: PropTypes.string
  }
  constructor (props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
  }
  render () {
    const { desc, title, active, hasdesciption } = this.props

    return <div className={`c-reason-block shadow-1 text-xs-center m-b-2 ${!hasdesciption && 'is-hidden'}`}>
      <h3 className={`c-reason-block__title p-a-2 ${hasdesciption ? 'text-nowrap' : 'no-desc'}`}>{title}</h3>
      <p className={`c-reason-block__desc p-x-1 ${!hasdesciption && 'is-hidden'}`}>{desc}</p>
      <button type='button' onClick={this._handleClick}
        className={`c-reason-block__button btn btn-block btn-${active ? 'success' : 'gray'} m-y-2 p-y-1 p-x-3`}>
        اختر
      </button>
    </div>
  }

  _handleClick () {
    const { title, onSubmit } = this.props
    onSubmit(title)
  }
}

export default ReasonBlock
