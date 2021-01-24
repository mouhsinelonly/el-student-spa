import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

class RulesList extends Component {
  static propTypes = {
    title: PropTypes.string,
    rules: PropTypes.array.isRequired,
    onSubmit: PropTypes.func,
    actionText: PropTypes.string,
    className: PropTypes.string
  }
  static defaultProps = {
    rules: [],
    title: 'القوانين و الشروط'
  }
  constructor (props) {
    super(props)

    this._handleSubmit = this._handleSubmit.bind(this)
  }
  render () {
    const { rules, title, actionText, className } = this.props
    return (
      <div className={`c-rules-list__container shadow-1 ${className}`}>
        <div className={`p-y-2 ${title === '' ? 'hidden-xs-up' : ''}`}>
          <h2 className='c-rules-list__title p-y-2 text-xs-center'>{title}</h2>
        </div>
        <ul className='c-rules-list__rules p-a-3'>
          {rules.map((t, i) => (
            <li className='c-rules-list__rules__item' key={i}>
              <span className='c-rules-list__rules__item-number'>{i + 1}</span>
              {t}
            </li>
          ))}
        </ul>
        <div className={`${!actionText && 'hidden-xs-up'} c-rules-list__footer p-y-2 text-xs-center`}>
          <button className='btn btn-success' onClick={this._handleSubmit}>
            {actionText}
          </button>
        </div>
      </div>
    )
  }

  _handleSubmit () {
    const { onSubmit } = this.props
    onSubmit()
  }
}

export default RulesList
