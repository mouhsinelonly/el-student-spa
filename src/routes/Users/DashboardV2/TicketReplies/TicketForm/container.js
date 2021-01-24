// @flow
import { connect } from 'react-redux'
import { storeTicket, toggleTemplatesVisiblity, toggleVideosVisibility, setActiveTicket,
 setTicketSeen, toggleFavoritesVisibility } from 'routes/Users/modules/tickets'
import { userStartedTyping, userStopedTyping, setStudentCallId, startOVSession, stopOVSession } from 'routes/Users/modules/users'
import { setActiveStudentDetails, getStudent } from 'routes/Users/modules/students'

import TicketForm from './TicketForm'
const mapActionCreators = {
  setActiveTicket,
  storeTicket,
  setTicketSeen,
  toggleFavoritesVisibility,
  setActiveStudentDetails,
  getStudent,
  toggleVideosVisibility,
  stopOVSession,
  toggleTemplatesVisiblity,
  setStudentCallId,
  userStartedTyping,
  userStopedTyping,
  startOVSession
}

const mapStateToProps = (state: Object): Object => {
  return {
    templatesVisible: state.user_tickets.templatesVisible,
    favoritesVisible: state.user_tickets.favoritesVisible,
    userId: state.user_profile.profile.id,
    studentCallId: state.user_profile.studentCallId,
    calling: state.user_profile.calling,
    onlineIDS: state.user_students.onlineIDS,
    loadingReply: state.user_tickets.loadingReply
  }
}

export default connect(mapStateToProps, mapActionCreators)(TicketForm)
