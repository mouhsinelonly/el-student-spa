// @flow
import { connect } from 'react-redux'
import { setVisibleSubjects } from 'routes/Users/modules/students'

import StudentSubjects from './StudentSubjects'
const mapActionCreators = {
  setVisibleSubjects
}

const mapStateToProps = (state: Object): Object => {
  return {
    state: state.user_students.visibleSubjects,
    failedSubjects: state.user_students.failedSubjects,
    researches: state.user_students.researches,
    researchesLoading: state.user_students.researchesLoading,
    failedSubjectsLoading: state.user_students.failedSubjectsLoading
  }
}

export default connect(mapStateToProps, mapActionCreators)(StudentSubjects)
