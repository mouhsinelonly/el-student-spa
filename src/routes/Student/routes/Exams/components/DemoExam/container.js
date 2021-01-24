// @flow
import { connect } from 'react-redux'

import DemoExam from './DemoExam'

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    loading: state.exams.loadingDemo,
    exam: state.exams.demo,
    serverdate: state.serverdate
  }
}

export default connect(mapStateToProps, mapActionCreators)(DemoExam)
