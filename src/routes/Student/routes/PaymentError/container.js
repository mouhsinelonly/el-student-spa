import { connect } from 'react-redux'
import { hideStudentNavbar, showStudentNavbar } from 'routes/Student/modules/ui'

import PaymentError from './PaymentError'

const mapActionCreators = {
  hideStudentNavbar,
  showStudentNavbar
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapActionCreators)(PaymentError)
