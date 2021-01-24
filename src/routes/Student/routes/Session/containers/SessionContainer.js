import { connect } from 'react-redux'
import {showStudentNavbar, hideStudentNavbar} from 'routes/Student/modules/ui'
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import Session from '../components/Session'

const mapActionCreators = {
  showStudentNavbar,
  hideStudentNavbar
}

const mapStateToProps = (state) => {
  return {
    navbarvisible: state.studentui.navbarvisible,
    sessions: state.sessions.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(Session)
