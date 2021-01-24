// @flow
import { connect } from 'react-redux'
import SessionExcuse from '../components/SessionExcuse'
import { uploadFile, sendSessionExcusesOrder, setExcuseReason, changeStep } from '../modules/session_excuse'
import { getExcuseReasons } from 'routes/Student/modules/sessions'

const mapActionCreators = {
  uploadFile,
  sendSessionExcusesOrder,
  setExcuseReason,
  changeStep,
  getExcuseReasons
}

const mapStateToProps = (state: Object): Object => {
  return {
    sessions: state.sessions.data,
    orders: state.session_excuse.orders,
    step: state.session_excuse.step,
    reason: state.session_excuse.reason,
    reasons: state.sessions.reasons,
    submitting: state.session_excuse.submitting
  }
}

export default connect(mapStateToProps, mapActionCreators)(SessionExcuse)
