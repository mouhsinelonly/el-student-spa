// @flow
import { connect } from 'react-redux'
import { getStudent, setActiveStudentDetails } from 'routes/Users/modules/students'
import { toggleTicketsInfoMenu } from 'routes/Users/modules/userui'

import LeftSide from './LeftSide'
const mapActionCreators = {
  getStudent,
  toggleTicketsInfoMenu,
  setActiveStudentDetails
}

const mapStateToProps = (state: Object): Object => {
  return {
    student: state.user_students.activeStudentDetails,
    sessions: state.user_sessions.activeStudentSessions,
    recordings: state.user_tilawa.activeStudentRecordings,
    financials: state.user_financials.activeStudentFinancials,
    loading: state.user_students.loadingStudentDetails,
    total: state.user_tickets.total,
    loadingTickets: state.user_tickets.loading,
    formVisible: state.user_ui.editStudentProfileVisible,
    visible: state.user_ui.ticketsInfoMenuVisible,
    token: state.auth.token
  }
}

export default connect(mapStateToProps, mapActionCreators)(LeftSide)
