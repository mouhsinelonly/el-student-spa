import { connect } from 'react-redux'
import {setQuranRecordingActivePage, uploadFile, sendQuranRecordingOrder} from '../modules/quran_recordings'
import QuranRecording from '../components/QuranRecording'

const mapActionCreators = {
  setQuranRecordingActivePage,
  uploadFile,
  sendQuranRecordingOrder
}

const mapStateToProps = (state) => {
  return {
    active: state.quranrecordingform.active,
    submitting: state.quranrecordingform.submitting,
    events: state.semester_events.data,
    orders: state.orders.delays,
    subjects: state.subjects.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(QuranRecording)
