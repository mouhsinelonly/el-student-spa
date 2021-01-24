import { connect } from 'react-redux'
import { setActivePage, sendRegistrationForm } from '../../../modules/form'
import { getRegistrationPeriod } from 'modules/registration_period'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import Form from '../components/Form'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile the component doesn't care   */

const mapActionCreators = {
  setActivePage,
  getRegistrationPeriod,
  sendRegistrationForm
}

const mapStateToProps = (state) => {
  return {
    active: state.signupform.active,
    files: state.signupform.files,
    errors: state.signupform.errors,
    loading: state.signupform.loading,
    periods: state.registration_period.periods,
    selectedID: state.specialities.selectedID
  }
}

export default connect(mapStateToProps, mapActionCreators)(Form)
