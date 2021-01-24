// @flow
import { connect } from 'react-redux'
import { getProfile, getSemesterEvents } from '../modules/users'
import { getTickets, getStatistics, getAnsweredTickets, getDepartments } from '../modules/tickets'
import Home from '../components/Home'

const mapActionCreators = {
  getProfile,
  getAnsweredTickets,
  getSemesterEvents,
  getTickets,
  getDepartments,
  getStatistics
}

const mapStateToProps = (state: Object): Object => {
  return {
    profile: state.user_profile.profile,
    profileLoading: state.user_profile.profileLoading
  }
}

export default connect(mapStateToProps, mapActionCreators)(Home)
