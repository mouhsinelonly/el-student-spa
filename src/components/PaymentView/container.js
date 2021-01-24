import { connect } from 'react-redux'
import { hidePaymentView, onSubmit } from 'modules/paymentview'

import PaymentView from './PaymentView'

const mapActionCreators = {
  hidePaymentView,
  onSubmit
}

const mapStateToProps = (state) => {
  return {
    fields: state.paymentview ? state.paymentview.fields : {},
    paymentClicked: state.paymentview ? state.paymentview.paymentClicked : false,
    link: state.paymentview ? state.paymentview.link : ''
  }
}

export default connect(mapStateToProps, mapActionCreators)(PaymentView)
