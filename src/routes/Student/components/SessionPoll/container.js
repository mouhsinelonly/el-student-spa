// @flow
import { connect } from 'react-redux'
import { hideStudentNavbar, showStudentNavbar } from 'routes/Student/modules/ui'
import { setCurrentTestQuestionIndex, sendSessionPollAnswer, resetSessionPoll } from 'routes/Student/modules/sessions'

import SessionTest from './SessionTest'

const mapActionCreators = {
  hideStudentNavbar,
  sendSessionPollAnswer,
  resetSessionPoll,
  setCurrentTestQuestionIndex,
  showStudentNavbar
}

const mapStateToProps = (state: Object): Object => {
  return {
    serverdate: state.serverdate,
    index: state.sessions.currentTestQuestionIndex,
    poll: state.sessions.poll
  }
}

export default connect(mapStateToProps, mapActionCreators)(SessionTest)
