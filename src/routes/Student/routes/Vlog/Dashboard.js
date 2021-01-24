// @flow
import * as React from 'react'
import Home from './Home'
import { Link } from 'react-router'
import { isMobile } from 'utils'
type PropsType = {
  children: React.Node,
  getVlogs: Function,
  period: Object,
  toggleSupportFloatingButton: Function,
  hideStudentNavbar: Function,
  showStudentNavbar: Function
};

const Dashboard = (props: PropsType): Array<React.Element<*>> => {
  React.useEffect((): Function => {
    props.getVlogs()
    props.toggleSupportFloatingButton(false)

    if (isMobile()) {
      props.hideStudentNavbar()
    }

    return () => {
      props.toggleSupportFloatingButton(true)
      props.showStudentNavbar()
    }
  })
  return [<Link to='/student/community' className='btn btn-purple-outline c-vlog-Dashboard__back m-t-3 p-l-2'
    key='back'>
    <i className='material-icons c-vlog-Dashboard__icon'>arrow_forward</i> رجوع
  </Link>,
    props.children
    ? <React.Fragment key='vlog-children'>{props.children}</React.Fragment>
    : <Home {...props} key='home' />]
}

export default Dashboard
