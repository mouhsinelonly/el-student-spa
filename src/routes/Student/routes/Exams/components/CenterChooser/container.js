import { connect } from 'react-redux'
import { getExamCenters, chooseExamCenter, toggleExamCenters, rechooseCenter } from 'routes/Student/modules/exam_centers'
import CenterChooser from './CenterChooser'

const mapActionCreators = {
  getExamCenters,
  chooseExamCenter,
  toggleExamCenters,
  rechooseCenter
}

const mapStateToProps = (state) => {
  return {
    centers: state.examcenters.data,
    choosing: state.examcenters.choosing,
    settings: state.settings.data,
    centersvisible: state.examcenters.centersvisible,
    loading: state.examcenters.loading,
    rechoosecenter: state.examcenters.rechoosecenter,
    token: state.auth.token
  }
}

export default connect(mapStateToProps, mapActionCreators)(CenterChooser)
