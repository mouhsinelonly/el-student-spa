// @flow
import { connect } from 'react-redux'
import { closeModal } from 'modules/modals'
// import { storeSessionClick } from 'routes/Student/modules/sessions'

import TypeForm from './TypeForm'

const mapActionCreators = {
  closeModal
}

const mapStateToProps = (state: Object): Object => {
  return {
    typeform: state.student.typeform,
    studentId: state.student.profile.id
  }
}

export default connect(mapStateToProps, mapActionCreators)(TypeForm)
