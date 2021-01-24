// @flow
import { connect } from 'react-redux'
import { toggleShowFullGrade } from 'routes/Users/modules/userui'

import StudentGrades from './StudentGrades'
const mapActionCreators = {
  toggleShowFullGrade
}

const mapStateToProps = (state: Object): Object => {
  return {
    grades: state.user_students.grades,
    events: state.user_profile.events,
    gradesLoading: state.user_students.gradesLoading,
    visible: state.user_ui.showFullGrade
  }
}

export default connect(mapStateToProps, mapActionCreators)(StudentGrades)
