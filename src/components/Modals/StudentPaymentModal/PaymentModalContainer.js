// @flow
import { connect } from 'react-redux'
import { closeModal } from 'modules/modals'
import { logout } from 'routes/Auth/modules/auth'
import { showPaymentView } from 'modules/paymentview'
import { getActivePayment, startStudentPayment } from 'routes/Student/modules/payments'
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import StudentPaymentModal from './StudentPaymentModal'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile; the component doesn't care   */

const mapActionCreators = {
  closeModal,
  logout,
  getActivePayment,
  startStudentPayment,
  showPaymentView
}

const mapStateToProps = (state: Object): Object => {
  if (typeof state.payments === 'undefined') {
    return {
      loading: false,
      data:{},
      waiting:false
    }
  }
  return {
    loading: state.payments.activepaymentloading,
    data: state.payments.activepayment,
    waiting: state.payments.waiting
  }
}

export default connect(mapStateToProps, mapActionCreators)(StudentPaymentModal)
