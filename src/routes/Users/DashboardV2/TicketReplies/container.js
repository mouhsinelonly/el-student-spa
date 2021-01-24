// @flow
import { connect } from 'react-redux'

import TicketReplies from './TicketReplies'
const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    activeTicket: state.user_tickets.activeTicket,
    total: state.user_tickets.total,
    loading: state.user_tickets.loading,
    userId: state.user_profile.profile.id,
  }
}

export default connect(mapStateToProps, mapActionCreators)(TicketReplies)
