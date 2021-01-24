import { connect } from 'react-redux'
import { getSocialCities, uploadFile } from '../../../../modules/form'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import FormSixthPage from './FormSixthPage'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile; the component doesn't care   */

const mapActionCreators = {
  getSocialCities,
  uploadFile
}

const mapStateToProps = (state) => {
  return {
    countries: state.countries.data,
    socialCities: state.signupform.socialCities,
    files: state.signupform.files
  }
}

export default connect(mapStateToProps, mapActionCreators)(FormSixthPage)
