// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

type Props = {
  text: string,
  className: string,
  onClick: Function
};

export default class GoBack extends React.Component<Props> {
  static defaultProps = {
    text: 'الرجوع للسابق'
  }
  render () {
    const { onClick, text, className } = this.props

    return (
      <button className={`c-go-back ${className}`} onClick={onClick}>
        {text}
      </button>
    )
  }
}
