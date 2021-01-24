// @flow
import { connect } from 'react-redux'
import { toggleActiveTab } from 'routes/Student/modules/schedule'

import Schedule from '../components/Schedule'

const mapActionCreators = {
  toggleActiveTab
}

const mapStateToProps = (state: Object): Object => {
  return {
    sessions: state.sessions.data,
    semester: state.student.profile.semester,
    events: state.semester_events.data,
    activetab: state.schedule.activetab
  }
}

export default connect(mapStateToProps, mapActionCreators)(Schedule)
