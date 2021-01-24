import { connect } from 'react-redux'
import { start, stop, upload, setBlob, resetRecorder, setHasCamera } from './module'
import HTML5VideoRecorder from './HTML5VideoRecorder'

const mapActionCreators = {
  upload,
  setBlob,
  start,
  setHasCamera,
  resetRecorder,
  stop
}

const mapStateToProps = state => {
  return {
    recording: state.html5recorder.recording,
    uploaded: state.html5recorder.uploaded,
    recordedSeconds: state.html5recorder.recordedSeconds,
    uploadingPercentage: state.html5recorder.uploadingPercentage,
    uploading: state.html5recorder.uploading,
    recorded: state.html5recorder.recorded,
    hasCamera: state.html5recorder.hasCamera,
    maxrecorded: state.html5recorder.maxrecorded
  }
}

export default connect(mapStateToProps, mapActionCreators, null, { forwardRef: true })(HTML5VideoRecorder)
