// @flow
import { connect } from 'react-redux'
import { nextSignupStep, prevSignupStep, signup } from 'modules/market'
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
    currentStep: state.market.activeSignupStep,
    signupErrors: state.market.signupErrors,
    countries: state.countries.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(Signup)
