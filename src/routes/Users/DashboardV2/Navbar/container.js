// @flow
import { connect } from 'react-redux'
import Navbar from './Navbar'
import { logoutAndRedirect } from 'routes/Auth/modules/auth'
import { getTickets } from 'routes/Users/modules/tickets'

const mapActionCreators = {
  logoutAndRedirect,
  getTickets
}

const mapStateToProps = (state: Object): Object => {
  return {
    loading: state.user_tickets.loading
  }
}

export default connect(mapStateToProps, mapActionCreators)(Navbar)
