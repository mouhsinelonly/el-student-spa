// @flow
import { connect } from 'react-redux'
import { showModal } from 'modules/modals'
import { getQuranRecordings, getQuranExtends, getQuranPages } from 'routes/Student/modules/quran'
import { getReasons } from 'routes/Student/modules/excuses'
import { getExams, toggleScheduleVisible, toggleExcuseVisible,
  toggleResultVisible, getRecordingPlaints } from 'routes/Student/modules/exams'
import { getSoftwares } from 'routes/Student/modules/softwares'

import Exams from '../components/Exams'

const mapActionCreators = {
  getSoftwares,
  getQuranRecordings,
  getQuranExtends,
  getReasons,
  getQuranPages,
  getExams,
  toggleScheduleVisible,
  toggleExcuseVisible,
  showModal,
  getRecordingPlaints,
  toggleResultVisible
}

const mapStateToProps = (state: Object): Object => {
  return {
    serverdate: state.serverdate,
    events: state.semester_events.data,
    subjects: state.subjects.data,
    profile: state.student.profile,
    recordings: state.quran.recordings,
    exams: state.exams.data,
    resultvisible: state.exams.resultvisible,
    schedulevisible: state.exams.schedulevisible,
    excusevisible: state.exams.excusevisible,
    extendings: state.quran.extendings
  }
}

export default connect(mapStateToProps, mapActionCreators)(Exams)
