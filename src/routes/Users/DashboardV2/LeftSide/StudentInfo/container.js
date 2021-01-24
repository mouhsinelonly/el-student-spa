// @flow
import { connect } from 'react-redux'
import { toggleEditStudentProfile } from 'routes/Users/modules/userui'

import StudentInfo from './StudentInfo'
const mapActionCreators = {
  toggleEditStudentProfile
}

const mapStateToProps = (state: Object): Object => {
  return {
    student: state.user_students.activeStudentDetails,
    financials: state.user_financials.activeStudentFinancials
  }
}

export default connect(mapStateToProps, mapActionCreators)(StudentInfo)
