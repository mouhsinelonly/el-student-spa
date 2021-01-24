// @flow
import { connect } from 'react-redux'
import { storeRecordingPlaint, getRecordingPlaints } from 'routes/Student/modules/exams'
import Home from './Home'

const mapActionCreators = {
  storeRecordingPlaint,
  getRecordingPlaints
}

const mapStateToProps = (state: Object): Object => {
  return {
    loading: state.exams.recordingPlaintsLoading,
    plaints: state.exams.recordingPlaints,
    exams: state.exams.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(Home)
