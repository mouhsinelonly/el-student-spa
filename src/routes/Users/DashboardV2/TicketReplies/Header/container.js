// @flow
import { connect } from 'react-redux'
import { closeTicket, openTicket, setActiveTicket } from 'routes/Users/modules/tickets'
import { toggleTicketsListMenu, toggleTicketsInfoMenu } from 'routes/Users/modules/userui'

import Header from './Header'
const mapActionCreators = {
  closeTicket,
  openTicket,
  setActiveTicket,
  toggleTicketsInfoMenu,
  toggleTicketsListMenu
}

const mapStateToProps = (state: Object): Object => {
  return {
    studentsTickets: state.user_tickets.studentsTickets,
    menuVisible: state.user_ui.ticketsListMenuVisible,
    infoVisible: state.user_ui.ticketsInfoMenuVisible,
    tickets: state.user_tickets.tickets,
    departments: state.user_tickets.departments
  }
}

export default connect(mapStateToProps, mapActionCreators)(Header)
