// @flow
import { connect } from 'react-redux'

import SecondStepBlock from './SecondStepBlock'

const mapStateToProps = (state: Object): Object => {
  return {
    exams: state.registrar.exams
  }
}

export default connect(mapStateToProps)(SecondStepBlock)
