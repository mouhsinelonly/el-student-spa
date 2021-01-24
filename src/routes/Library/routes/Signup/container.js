// @flow
import { connect } from 'react-redux'
import { nextSignupStep, prevSignupStep, signup } from 'modules/library'
import { getCountries } from 'modules/countries'

import Signup from './Signup'

const mapActionCreators = {
  nextSignupStep,
  getCountries,
  prevSignupStep,
  signup
}

const mapStateToProps = (state: Object): Object => {
  return {
    currentStep: state.library_account.activeSignupStep,
    signupErrors: state.library_account.signupErrors,
    countries: state.countries.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(Signup)
