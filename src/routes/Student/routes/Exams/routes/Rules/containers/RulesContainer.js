import { connect } from 'react-redux'
import Rules from '../components/Rules'

import {getExamsRules} from '../modules/rules'

const mapActionCreators = {
  getExamsRules
}

const mapStateToProps = (state) => {
  return {
    rules: state.exams_rules.data,
    events: state.semester_events.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(Rules)
