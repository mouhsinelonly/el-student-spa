// @flow
import { connect } from 'react-redux'
import { getTickets, setActiveTicket, setTicketSeen, getAnsweredTickets } from 'routes/Users/modules/tickets'
import { getStudent, setActiveStudentDetails } from 'routes/Users/modules/students'

import TicketsList from './TicketsList'
const mapActionCreators = {
  getTickets,
  setActiveTicket,
  setTicketSeen,
  getStudent,
  getAnsweredTickets,
  setActiveStudentDetails
}

const mapStateToProps = (state: Object): Object => {
  return {
    tickets: state.user_tickets.tickets,
    searchString: state.user_tickets.searchString,
    typings: state.user_tickets.typings,
    answeredTickets: state.user_tickets.answeredTickets,
    answeredLoading: state.user_tickets.answeredLoading,
    closedTickets: state.user_tickets.closedTickets,
    unAnsweredTickets: state.user_tickets.unAnsweredTickets,
    total: state.user_tickets.total,
    answeredTotal: state.user_tickets.answeredTotal,
    currentPage: state.user_tickets.currentPage,
    onlineIDS: state.user_students.onlineIDS,
    lastPage: state.user_tickets.lastPage,
    activeTicket: state.user_tickets.activeTicket,
    activeTab: state.user_tickets.activeTab,
    loading: state.user_tickets.ticketsLoading
  }
}

export default connect(mapStateToProps, mapActionCreators)(TicketsList)
