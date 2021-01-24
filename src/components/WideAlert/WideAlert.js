// @flow
import React from 'react'
import './WideAlert.scss'

type PropsType = {
  children: React.Node,
  purple: boolean
};

const WideAlert = (props: PropsType): React.Element<'div'> => (<div className={`WideAlert text-xs-center
  ${props.purple && 'is-purple'}`}>
  {props.children}
</div>)

export default WideAlert
