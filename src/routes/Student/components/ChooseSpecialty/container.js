// @flow
import { connect } from 'react-redux'
import { getSpecialties, toggleChooseSpecialty, setSpecialty, toggleEdit } from 'routes/Student/modules/student'

import ChooseSpecialty from './ChooseSpecialty'

const mapActionCreators = {
  getSpecialties,
  setSpecialty,
  toggleChooseSpecialty,
  toggleEdit
}

const mapStateToProps = (state: Object): Object => {
  return {
    loading: state.student.loadingSpecialties,
    events: state.semester_events.data,
    serverdate: state.serverdate,
    specialties: state.student.specialties,
    chosenSpecialtyID: state.student.chosenSpecialtyID,
    chooseSpecialtyVisible: state.student.chooseSpecialtyVisible,
    editSpecialtyVisible: state.student.editSpecialtyVisible
  }
}

export default connect(mapStateToProps, mapActionCreators)(ChooseSpecialty)
