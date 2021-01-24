// @flow
import { connect } from 'react-redux'

import Orders from '../components/Orders'
import { getDelayOrders, getWithdrawOrders, getStatementOrders } from 'routes/Student/modules/orders'
import { getFiles } from 'routes/Student/modules/registrations'
import { toggleModalVisibility } from 'modules/modals'
const mapActionCreators = {
  getDelayOrders,
  getFiles,
  toggleModalVisibility,
  getStatementOrders,
  getWithdrawOrders
}

const mapStateToProps = (state: Object): Object => {
  return {
    serverdate: state.serverdate,
    delays: state.orders.delays,
    withdraws: state.orders.withdraws,
    statements: state.orders.statements,
    isFetching: state.orders.isFetching,
    events: state.semester_events.data,
    profile: state.student.profile
  }
}

export default connect(mapStateToProps, mapActionCreators)(Orders)
