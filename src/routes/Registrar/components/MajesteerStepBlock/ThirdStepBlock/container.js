// @flow
import { connect } from 'react-redux'

import ThirdStepBlock from './ThirdStepBlock'

const mapStateToProps = (state: Object): Object => {
  return {
    exams: state.registrar.exams
  }
}

export default connect(mapStateToProps)(ThirdStepBlock)
