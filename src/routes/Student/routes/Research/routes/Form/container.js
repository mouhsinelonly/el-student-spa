import { connect } from 'react-redux'
import { hideStudentNavbar, showStudentNavbar } from 'routes/Student/modules/ui'

import Form from './Form'

const mapActionCreators = {
  hideStudentNavbar,
  showStudentNavbar
}

const mapStateToProps = (state) => {
  return {
    activities: state.researches.activities,
    savingIds: state.researches.savingIds,
    loadingActivities: state.researches.loadingActivities
  }
}

export default connect(mapStateToProps, mapActionCreators)(Form)
