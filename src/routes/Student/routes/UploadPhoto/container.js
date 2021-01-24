import { connect } from 'react-redux'
import {updateProfile, uploadPhoto, uploadReset} from 'routes/Student/modules/student'

import UploadPhoto from './components/UploadPhoto'

const mapActionCreators = {
  updateProfile,
  uploadPhoto,
  uploadReset
}

const mapStateToProps = (state) => {
  return {
    uploadingphoto: state.student.uploadingphoto,
    uploaddone: state.student.uploaddone,
    profile: state.student.profile,
    files: state.uploadProgress.files
  }
}

export default connect(mapStateToProps, mapActionCreators)(UploadPhoto)
