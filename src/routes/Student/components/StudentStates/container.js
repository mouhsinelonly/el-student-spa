import { connect } from 'react-redux'

import StudentStates from './StudentStates'

const mapStateToProps = (state) => {
  return {
    profile: state.student.profile
  }
}

export default connect(mapStateToProps)(StudentStates)
