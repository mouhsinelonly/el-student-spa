import { connect } from 'react-redux'
import {toggleExamExcuse, toggleAllExamExcuses, goToExcuseStep, addExamExcuseReason,
  uploadFile, sendExamExcuse} from 'routes/Student/modules/exams'

import ExamRowExcuseTable from './ExamRowExcuseTable'

const mapActionCreators = {
  toggleExamExcuse,
  uploadFile,
  toggleAllExamExcuses,
  addExamExcuseReason,
  sendExamExcuse,
  goToExcuseStep
}

const mapStateToProps = (state) => {
  return {
    checkedlist: state.exams.checkedexcuses,
    excusestep: state.exams.excusestep,
    reasons: state.excuses.reasons,
    excusereason: state.exams.excusereason,
    sendingexcuse: state.exams.sendingexcuse,
    events: state.semester_events.data,
    files: state.exams.excusefiles
  }
}

export default connect(mapStateToProps, mapActionCreators)(ExamRowExcuseTable)
