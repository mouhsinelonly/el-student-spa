import { connect } from 'react-redux'
import { matchFace } from 'routes/Student/modules/facematching'

import FaceMatching from './FaceMatching'

const mapActionCreators = {
  matchFace
}

const mapStateToProps = state => {
  return {
    processing: state.facematching.processing,
    ratio: state.facematching.ratio,
    done: state.facematching.done,
    exception: state.facematching.exception,
    settings: state.settings.data,
    profile: state.student.profile,
    match: state.facematching.match
  }
}

export default connect(mapStateToProps, mapActionCreators)(FaceMatching)
