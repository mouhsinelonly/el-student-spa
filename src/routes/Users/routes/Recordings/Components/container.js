// @flow
import { connect } from 'react-redux'
import { getRecordings, addToPlaylist, updateRecording } from 'routes/Users/modules/recordings'
import Recordings from './Recordings'

const mapActionCreators = {
  getRecordings,
  addToPlaylist,
  updateRecording
}

const mapStateToProps = (state: Object): Object => {
  return {
    recordings: state.user_recordings.data,
    playlist: state.user_recordings.playlist,
    updating: state.user_recordings.updating,
    loading: state.user_recordings.loading
  }
}

export default connect(mapStateToProps, mapActionCreators)(Recordings)
