import { connect } from 'react-redux'

import FiredState from './FiredState'

const mapStateToProps = (state) => {
  return {
    terms: state.grades.data.grades,
    gpas: state.grades.data.gpas
  }
}

export default connect(mapStateToProps)(FiredState)
