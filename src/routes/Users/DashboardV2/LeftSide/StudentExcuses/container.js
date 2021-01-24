// @flow
import { connect } from 'react-redux'
import { toggleType } from 'routes/Users/modules/excuses'

import StudentExcuses from './StudentExcuses'
const mapActionCreators = {
  toggleType
}

const mapStateToProps = (state: Object): Object => {
  return {
    sessions: state.user_excuses.activeStudentSessionsExcuses,
    exams: state.user_excuses.activeStudentExamsExcuses,
    visibleType: state.user_excuses.visibleType
  }
}

export default connect(mapStateToProps, mapActionCreators)(StudentExcuses)
