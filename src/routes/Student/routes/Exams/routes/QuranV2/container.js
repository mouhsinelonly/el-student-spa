import { connect } from 'react-redux'

import Home from './Home'
import { showModal } from 'modules/modals'
import {
  updateActivityLevel,
  recordingStarted,
  recordingStoped,
  enableVideoGuide,
  disableVideoGuide,
  setRandomPageNumber,
  setQuranRecorded,
  resetQuranRecording
} from '../QuranV2/modules/quran_recorder'
import { storeQuranRecording, postAcceptRecording, resetRecorder, decreaseRemaining } from 'routes/Student/modules/quran'

import { hideStudentNavbar, showStudentNavbar } from 'routes/Student/modules/ui'
import { changeStep, setRecorderInstance } from './module'

const mapActionCreators = {
  showModal,
  setRecorderInstance,
  resetRecorder,
  hideStudentNavbar,
  showStudentNavbar,
  changeStep,
  updateActivityLevel,
  storeQuranRecording,
  postAcceptRecording,
  recordingStarted,
  recordingStoped,
  enableVideoGuide,
  disableVideoGuide,
  decreaseRemaining,
  setRandomPageNumber,
  setQuranRecorded,
  resetQuranRecording
}

const mapStateToProps = state => {
  return {
    step: state.quranexamv2.step,
    subjects: state.subjects.data,
    profile: state.student.profile,
    subjectsloading: state.subjects.loading,
    soundlevel: state.quran_recorder.soundlevel,
    isrecording: state.quran_recorder.isrecording,
    pages: state.quran.pages,
    uploadPercentage: state.html5recorder.uploadPercentage,
    uploading: state.html5recorder.uploading,
    uploaded: state.html5recorder.uploaded,
    videoguideenabled: state.quran_recorder.videoguideenabled,
    randompagenumber: state.quran_recorder.randompagenumber,
    isrecorded: state.quran_recorder.isrecorded,
    recordings: state.quran.recordings,
    rulesvisible: state.quran.rulesvisible,
    extendings: state.quran.extendings
  }
}

export default connect(mapStateToProps, mapActionCreators)(Home)
