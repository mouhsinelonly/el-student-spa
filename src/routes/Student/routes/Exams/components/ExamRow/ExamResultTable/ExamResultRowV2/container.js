// @flow
import { connect } from 'react-redux'
// import { } from 'modules/modals'

import ExamResultRowV2 from './ExamResultRowV2'

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    recordingPlaintsLoading: state.exams.recordingPlaintsLoading,
    recordingPlaints: state.exams.recordingPlaints
  }
}

export default connect(mapStateToProps, mapActionCreators)(ExamResultRowV2)
