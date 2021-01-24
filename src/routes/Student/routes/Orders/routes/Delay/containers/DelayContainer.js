import { connect } from 'react-redux'
import {setDelayActivePage, uploadFile, sendDelayOrder} from '../modules/delay'
import Delay from '../components/Delay'

const mapActionCreators = {
  setDelayActivePage,
  uploadFile,
  sendDelayOrder
}

const mapStateToProps = (state) => {
  return {
    active: state.delayform.active,
    submitting: state.delayform.submitting,
    events: state.semester_events.data,
    orders: state.orders.delays
  }
}

export default connect(mapStateToProps, mapActionCreators)(Delay)
