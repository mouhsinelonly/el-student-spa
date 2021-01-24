// @flow
import { connect } from 'react-redux'
import { getSpecialities, showSignupRequirements, hideSinupRequirements } from '../../modules/specialities'
import { getRegistrationPeriod } from 'modules/registration_period'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import SignupDashboard from './SignupDashboard'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile the component doesn't care   */

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    specialities: state.specialities.data,
    periods: state.registration_period.periods,
    loading: state.specialities.loading,
    token: state.auth.token,
    activeSpecialty: state.ui.activeSpecialtyTab,
    isShowingRequirements: state.specialities.isShowingRequirements
  }
}

export default connect(mapStateToProps, mapActionCreators)(SignupDashboard)
