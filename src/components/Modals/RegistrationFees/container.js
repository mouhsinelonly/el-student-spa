import { connect } from 'react-redux'
import { getRegistrationFees } from 'routes/Registrar/modules/registrar'
import { logoutAndRedirect } from 'routes/Auth/modules/auth'

import RegistrationFees from './RegistrationFees'

const mapActionCreators = {
  getRegistrationFees,
  logoutAndRedirect
}

const mapStateToProps = (state) => {
  return {
    loadingfees: state.registrar.loadingfees,
    fees_amount: state.registrar.profile.fees_amount
  }
}

export default connect(mapStateToProps, mapActionCreators)(RegistrationFees)
