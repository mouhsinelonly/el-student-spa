// @flow
import { connect } from 'react-redux'
import { getVlogs } from 'routes/Student/modules/vlogs'
import { toggleSupportFloatingButton } from 'modules/ui'
import { hideStudentNavbar, showStudentNavbar } from 'routes/Student/modules/ui'

import Dashboard from './Dashboard'

const mapActionCreators = {
  getVlogs,
  toggleSupportFloatingButton,
  hideStudentNavbar,
  showStudentNavbar
}

const mapStateToProps = (state: Object): Object => {
  return {
    period: state.vlogs.active,
    joyrides: state.student.profile.joyrides
  }
}

export default connect(mapStateToProps, mapActionCreators)(Dashboard)
