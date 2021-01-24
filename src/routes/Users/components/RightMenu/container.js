// @flow
import { connect } from 'react-redux'
import RightMenu from './RightMenu'
import { logoutAndRedirect } from 'routes/Auth/modules/auth'

const mapActionCreators = {
  logoutAndRedirect
}

const mapStateToProps = (state: Object): Object => {
  return {
    profile: state.user_profile.profile,
    totalTickets: state.user_tickets.total,
    statistics: state.user_tickets.statistics
  }
}

export default connect(mapStateToProps, mapActionCreators)(RightMenu)
