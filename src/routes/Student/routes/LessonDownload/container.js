// @flow
import { connect } from 'react-redux'

import LessonDownload from './LessonDownload'

const mapActionCreators = {
}

const mapStateToProps = (state: Object): Object => {
  return {
    subjects: state.subjects.data,
    serverdate: state.serverdate
  }
}

export default connect(mapStateToProps, mapActionCreators)(LessonDownload)
