// @flow
import { connect } from 'react-redux'
import { storeSessionClick } from '../../modules/sessions'

import LiveSessionNotification from './LiveSessionNotification'

const mapActionCreators = {
  storeSessionClick
}

const mapStateToProps = (state: Object): Object => {
  return {
    serverdate: state.serverdate,
    sessions: state.sessions.data,
    profile: state.student.profile
  }
}

export default connect(mapStateToProps, mapActionCreators)(LiveSessionNotification)
