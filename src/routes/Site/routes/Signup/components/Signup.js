// @flow
import * as React from 'react'
// components
import SignupDashboard from './SignupDashboard'

type PropType = {
  children: React.Node
};

export const Signup = (props: PropType): React.Element<'div'> => (<div>{props.children || <SignupDashboard />}</div>)

export default Signup
