// @flow
import { connect } from 'react-redux'
import { addStudentJoyride } from '../../modules/student'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import JoyrideMessage from './JoyrideMessage'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile the component doesn't care   */

const mapActionCreators = {
  addStudentJoyride
}

const mapStateToProps = (state: Object): Object => {
  return {}
}

export default connect(mapStateToProps, mapActionCreators)(JoyrideMessage)
