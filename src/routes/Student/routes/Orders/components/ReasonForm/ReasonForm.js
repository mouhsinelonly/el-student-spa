import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import './style.scss'

export const fields = [
  'reason'
]

class ReasonForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    reasons: PropTypes.array,
    fields: PropTypes.object
  }
  static defaultProps = {
    reasons: []
  }
  constructor (props) {
    super(props)

    this._handleSubmit = this._handleSubmit.bind(this)
  }
  render () {
    const { reasons } = this.props
    return (<form>
      {reasons.map((t, i) => {
        return <div className='col-xs-12 col-md-4' key={i} ><ReasonBlock onSubmit={this._handleSubmit} {...t} /></div>
      })}
    </form>)
  }
  _handleSubmit (value = '') {
    const { fields: { reason }, handleSubmit } = this.props
    reason.onChange(value)
    handleSubmit()
  }
}

class ReasonBlock extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }
  constructor (props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
  }
  render () {
    const { desc, title } = this.props

    return <div className='c-order-reason-form shadow-1 text-xs-center m-b-2'>
      <h3 className='c-order-reason-form__title p-a-2 text-nowrap'>{title}</h3>
      <p className='c-order-reason-form__desc'>{desc}</p>
      <button type='button' onClick={this._handleClick} className='btn btn-success m-y-2 p-x-3'>
        اختر
      </button>
    </div>
  }

  _handleClick () {
    const { title, onSubmit } = this.props
    onSubmit(title)
  }
}

ReasonBlock.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string
}

export default reduxForm({
  form: 'delayform',
  fields,
  destroyOnUnmount: false
})(ReasonForm)
