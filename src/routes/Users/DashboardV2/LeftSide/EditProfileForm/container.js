// @flow
import { connect } from 'react-redux'
import { toggleEditStudentProfile } from 'routes/Users/modules/userui'
import { updateStudent } from 'routes/Users/modules/students'

import EditProfileForm from './EditProfileForm'
const mapActionCreators = {
  toggleEditStudentProfile,
  updateStudent
}

const mapStateToProps = (state: Object): Object => {
  return {
    student: state.user_students.activeStudentDetails,
    loading: state.user_students.updatingStudentDetails,
    formVisible: state.user_ui.editStudentProfileVisible
  }
}

export default connect(mapStateToProps, mapActionCreators)(EditProfileForm)
