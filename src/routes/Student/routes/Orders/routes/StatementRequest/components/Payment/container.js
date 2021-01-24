// @flow
import { connect } from 'react-redux'
import { getStatementPayment } from 'routes/Student/modules/orders'

import Payment from './Payment'

const mapActionCreators = {
  getStatementPayment
}

const mapStateToProps = (state: Object): Object => {
  return {
    loading: state.orders.loadingpayment
  }
}

export default connect(mapStateToProps, mapActionCreators)(Payment)
