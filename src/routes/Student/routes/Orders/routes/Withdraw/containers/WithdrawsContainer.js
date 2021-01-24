import { connect } from 'react-redux'
import {setWithdrawActivePage, uploadFile, sendWithdrawOrder} from '../modules/withdraw'
import Withdraw from '../components/Withdraw'

const mapActionCreators = {
  setWithdrawActivePage,
  uploadFile,
  sendWithdrawOrder
}

const mapStateToProps = (state) => {
  return {
    active: state.withdrawform.active,
    submitting: state.withdrawform.submitting,
    events: state.semester_events.data,
    orders: state.orders.withdraws
  }
}

export default connect(mapStateToProps, mapActionCreators)(Withdraw)
