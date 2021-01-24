import { connect } from 'react-redux'

import SubNav from './SubNav'

const mapActionCreators = {}

const mapStateToProps = (state) => {
  return {
    sessions: state.sessions.data,
    serverdate: state.serverdate,
    classrooms: state.classrooms.data,
    semesterevents: state.semester_events.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(SubNav)
