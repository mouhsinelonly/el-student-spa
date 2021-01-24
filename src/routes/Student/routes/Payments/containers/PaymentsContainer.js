import { connect } from 'react-redux'
import { getInvoices } from 'routes/Student/modules/payments'
import { showPaymentDetails, hidePaymentsDetails } from '../modules/paymentsui'

import Payments from '../components/Payments'

const mapActionCreators = {
  getInvoices,
  showPaymentDetails,
  hidePaymentsDetails
}

const mapStateToProps = state => {
  return {
    invoices: state.payments.invoices,
    visibleinvoices: state.paymentsui.visibleinvoices,
    invoicesloading: state.paymentsui.invoicesloading
  }
}

export default connect(mapStateToProps, mapActionCreators)(Payments)
