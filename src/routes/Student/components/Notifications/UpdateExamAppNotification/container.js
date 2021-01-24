import { connect } from 'react-redux'
import {showModal} from 'modules/modals'

import UpdateExamAppNotification from './UpdateExamAppNotification'

const mapActionCreators = {
  showModal
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapActionCreators)(UpdateExamAppNotification)
