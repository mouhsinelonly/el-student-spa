// @flow
import { connect } from 'react-redux'
import Home from './Home'
import { getTickets, getTicketTemplates, getTicketVideos, getDepartments, getFavoriteReplies } from 'routes/Users/modules/tickets'
const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    tickets: state.user_tickets.tickets,
    showFullGrade: state.user_ui.showFullGrade
  }
}

export default connect(mapStateToProps, mapActionCreators)(Home)
