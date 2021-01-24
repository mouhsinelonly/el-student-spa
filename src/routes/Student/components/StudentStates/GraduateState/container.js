import { connect } from 'react-redux'

import GraduateState from './GraduateState'

const mapStateToProps = (state) => {
  return {
    documents: state.documents.data,
    token: state.auth.token,
    terms: state.grades.data.grades,
    gpas: state.grades.data.gpas
  }
}

export default connect(mapStateToProps)(GraduateState)
