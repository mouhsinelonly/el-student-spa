import { connect } from 'react-redux'
import { toggleExamComplaint, toggleAllExamComplaints, sendExamComplaint
  , goToComplaintStep, addExamComplaintReason } from 'routes/Student/modules/exams'
import { showModal } from 'modules/modals'

import ExamResultTable from './ExamResultTable'

const mapActionCreators = {
  toggleExamComplaint,
  showModal,
  toggleAllExamComplaints,
  sendExamComplaint,
  addExamComplaintReason,
  goToComplaintStep
}

const mapStateToProps = (state) => {
  return {
    checkedlist: state.exams.checkedcomplaints,
    sendingcomplaint: state.exams.sendingcomplaint,
    complaintstep: state.exams.complaintstep,
    complaintreason: state.exams.complaintreason,
    events: state.semester_events.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(ExamResultTable)
