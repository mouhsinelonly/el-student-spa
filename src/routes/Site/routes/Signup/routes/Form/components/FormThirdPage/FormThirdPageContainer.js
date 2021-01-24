import { connect } from 'react-redux'
import { getNationalityCities, getNationalityStates, uploadFile } from '../../../../modules/form';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import FormThirdPage from './FormThirdPage'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile; the component doesn't care   */

const mapActionCreators =  {
 getNationalityCities,
 getNationalityStates,
 uploadFile
}

const mapStateToProps = (state) => {
  return {
    countries2: state.countries,
    countries: state.countries.data,
    nationalityCities:state.signupform.nationalityCities,
    nationalityStates:state.signupform.nationalityStates,
    files: state.signupform.files
  }
}

export default connect(mapStateToProps, mapActionCreators)(FormThirdPage)
