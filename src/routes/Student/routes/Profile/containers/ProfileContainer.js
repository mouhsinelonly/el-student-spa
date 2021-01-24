import { connect } from 'react-redux'
import { updateProfile } from 'routes/Student/modules/student'

import Profile from '../components/Profile'

const mapActionCreators = {
  updateProfile
}

const mapStateToProps = (state) => {
  return {
    profile: state.student.profile
  }
}

export default connect(mapStateToProps, mapActionCreators)(Profile)
