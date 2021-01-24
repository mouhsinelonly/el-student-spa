import { connect } from 'react-redux'
import { selectRegistrationSpecialty, getSpecialities, setActiveDepartment } from '../../../modules/specialities'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import Specialty from './Specialty'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile the component doesn't care   */

const mapActionCreators = {
  selectRegistrationSpecialty,
  getSpecialities,
  setActiveDepartment
}

const mapStateToProps = (state) => {
  return {
    period: state.registration_period.period,
    specialty: state.specialities.selectedSpecialty,
    activeDepartment: state.specialities.activeDepartment
  }
}

export default connect(mapStateToProps, mapActionCreators)(Specialty)
