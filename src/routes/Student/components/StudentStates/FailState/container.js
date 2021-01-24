import { connect } from 'react-redux'

import FailState from './FailState'

const mapStateToProps = (state) => {
  return {
    profile: state.student.profile,
    terms: state.grades.data.grades,
    gpas: state.grades.data.gpas,
    semesters: state.semesters.data
  }
}

export default connect(mapStateToProps)(FailState)
