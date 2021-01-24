// @flow
import { connect } from 'react-redux'
import { choosePackage, getPackages, subscribe, getProfile } from 'modules/library'

import SubscriptionChooser from './SubscriptionChooser'

const mapActionCreators = {
  choosePackage,
  getPackages,
  getProfile,
  handleSubscribe: subscribe
}

const mapStateToProps = (state: Object): Object => {
  return {
    packages: state.library_account.packages,
    profile: state.library_account.profile,
    loadingPayment: state.library_account.loadingPayment,
    activePackage: state.library_account.activePackage
  }
}

export default connect(mapStateToProps, mapActionCreators)(SubscriptionChooser)
