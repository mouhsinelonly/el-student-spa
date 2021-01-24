// @flow
import * as React from 'react'
import './Alert.scss'

type PropsType = {
  text: string,
  info: boolean
};

const Alert = (props: PropsType): React.Element<'div'> => {
  return (
    <div className={`c-Alert ${props.info ? 'is-info' : ''}`}>{props.text}</div>
  )
}

export default Alert
