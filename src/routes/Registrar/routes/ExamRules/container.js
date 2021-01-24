// @flow
import { connect } from 'react-redux'
import { getExamRules } from 'routes/Registrar/modules/registrar'

import ExamRules from './ExamRules'

const mapActionCreators = {
  getExamRules
}

const mapStateToProps = (state: Object): Object => {
  return {
    rules: state.registrar.examRules,
    loading: state.registrar.examRulesLoading
  }
}

export default connect(mapStateToProps, mapActionCreators)(ExamRules)
