import { connect } from 'react-redux'
import {postAcceptRecording} from 'routes/Student/modules/quran'
import QuranRecordingModal from './QuranRecordingModal'
import {closeModal} from '../../../modules/modals'

const mapActionCreators = {
  postAcceptRecording,
  closeModal
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapActionCreators)(QuranRecordingModal)
