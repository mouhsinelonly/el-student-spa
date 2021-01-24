// @flow
import { connect } from 'react-redux'
import { addWaitingList } from 'modules/registration_period'

import WaitingList from './WaitingList'

const mapActionCreators = {
  addWaitingList
}

const mapStateToProps = (state: Object): Object => {
  return {
    loading: state.registration_period.loadingAddToWaitingList,
    sent: state.registration_period.addedWaitingList
  }
}

export default connect(mapStateToProps, mapActionCreators)(WaitingList)
