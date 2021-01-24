import { connect } from 'react-redux'
import {getRegistrationFees} from 'routes/Registrar/modules/registrar'

import FeesNotification from './FeesNotification'

const mapActionCreators = {
  getRegistrationFees
}

const mapStateToProps = (state) => {
  return {
    loadingfees: state.registrar.loadingfees,
    isMobile: state.ui.isMobile,
    fees_amount: state.registrar.profile.fees_amount
  }
}

export default connect(mapStateToProps, mapActionCreators)(FeesNotification)
