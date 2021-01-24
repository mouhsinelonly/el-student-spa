// @flow
import { connect } from 'react-redux'
import { getResults, toggleGradePlaint, getPaymentFields, paymentFormClicked,
setPlaintsPayment } from 'routes/Student/modules/grades'
import { showPaymentView } from 'modules/paymentview'

import SemesterResultsTable from './SemesterResultsTable'

const mapActionCreators = {
  getResults,
  setPlaintsPayment,
  toggleGradePlaint,
  getPaymentFields,
  paymentFormClicked,
  showPaymentView
}

const mapStateToProps = (state: Object): Object => {
  return {
    events: state.semester_events.data,
    results: state.grades.results,
    plaintsids: state.grades.plaintsids,
    serverdate: state.serverdate,
    omanneturl: state.grades.omanneturl,
    loadingpayment: state.grades.loadingpayment,
    paymentfields: state.grades.paymentfields,
    paymentclicked: state.grades.paymentclicked,
    subjects: state.subjects.data,
    profile: state.student.profile,
    loadingsubjects: state.subjects.loading,
    exams: state.exams.data,
    loadingresults: state.grades.loadingresults
  }
}

export default connect(mapStateToProps, mapActionCreators)(SemesterResultsTable)
