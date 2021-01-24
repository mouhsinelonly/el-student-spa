// @flow
import { connect } from 'react-redux'
import { toggleType } from 'routes/Users/modules/exams'
import { showModal } from 'modules/modals'

import StudentExams from './StudentExams'
const mapActionCreators = {
  toggleType,
  showModal
}

const mapStateToProps = (state: Object): Object => {
  return {
    exams: state.user_exams.activeStudentExams,
    visibleType: state.user_exams.visibleType
  }
}

export default connect(mapStateToProps, mapActionCreators)(StudentExams)
