import { connect } from 'react-redux'

import SuccessState from './SuccessState'

const mapStateToProps = (state) => {
  return {
    terms: state.grades.data.grades,
    gpas: state.grades.data.gpas,
    semesters: state.semesters.data,
    profile: state.student.profile
  }
}

export default connect(mapStateToProps)(SuccessState)
