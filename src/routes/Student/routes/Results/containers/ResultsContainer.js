// @flow
import { connect } from 'react-redux'
import { setGradesYear } from 'routes/Student/modules/grades'

import Results from '../components/Results'

const mapActionCreators = {
  setGradesYear
}

const mapStateToProps = (state: Object): Object => {
  return {
    grades: state.grades.data.grades,
    events: state.semester_events.data,
    serverdate: state.serverdate,
    gpas: state.grades.data.gpas,
    currentyear: state.grades.currentyear,
    loadinggrades: state.grades.loadinggrades,
    profile: state.student.profile
  }
}

export default connect(mapStateToProps, mapActionCreators)(Results)
