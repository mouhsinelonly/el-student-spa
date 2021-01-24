import { connect } from 'react-redux'
import { toggleChoice, submitChoices } from 'routes/Student/modules/summer'
import { logoutAndRedirect } from 'routes/Auth/modules/auth'

import ChooseSummerSubjects from './ChooseSummerSubjects'

const mapActionCreators = {
  toggleChoice,
  submitChoices,
  logoutAndRedirect
}

const mapStateToProps = (state) => {
  return {
    subjects: state.subjects.data,
    sendingChoices: state.summer.sendingChoices,
    checkedsubjects: state.summer.checkedsubjects,
    termId: state.student.profile.term_id,
    departmentId: state.student.profile.department_id
  }
}

export default connect(mapStateToProps, mapActionCreators)(ChooseSummerSubjects)
