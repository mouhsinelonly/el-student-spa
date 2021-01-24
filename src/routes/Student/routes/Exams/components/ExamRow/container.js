// @flow
import { connect } from 'react-redux'

import ExamRow from './ExamRow'

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    loading: state.softwares.loading,
    serverdate: state.serverdate,
    softwares: state.softwares.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(ExamRow)
