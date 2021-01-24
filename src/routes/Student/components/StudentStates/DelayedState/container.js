// @flow
import { connect } from 'react-redux'
import { getDelayOrders } from 'routes/Student/modules/orders'
import DelayedState from './DelayedState'

const mapActionCreators = {
  getDelayOrders
}

const mapStateToProps = (state: Object): Object => {
  return {
    delays: state.orders.delays
  }
}

export default connect(mapStateToProps, mapActionCreators)(DelayedState)
