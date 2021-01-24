import { connect } from 'react-redux'
import {showAddEquation, hideAddEquation, uploadFile, changeFormPage, editEquationSubject, addEquationSubject} from '../modules/equation'
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import Equation from '../components/Equation'

const mapActionCreators = {
 	showAddEquation,
 	hideAddEquation,
 	uploadFile,
 	changeFormPage,
 	editEquationSubject,
 	addEquationSubject
}


const mapStateToProps = (state) => {
  return {
   degrees:state.registration_equation.degrees,
   addformvisible:state.registration_equation.add_form,
   page:state.registration_equation.page,
   loading:state.registration_equation.loading,
   edit_id:state.registration_equation.edit_id,
   step:state.registrar.profile.step,
  };
};

export default connect(mapStateToProps, mapActionCreators)(Equation)
