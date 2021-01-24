// @flow
import { connect } from 'react-redux'

import Sessions from './Sessions'
import { showAllPastSessions } from 'routes/Student/modules/sessions'
import {
  hideHomePageSession,
  showHomePageSession,
  hideHomePagePastSession,
  showHomePagePastSession,
  hideHomePageLiveSession,
  showHomePageLiveSession
} from 'routes/Student/modules/ui'

const mapActionCreators = {
  showAllPastSessions,
  hideHomePageSession,
  showHomePageSession,
  hideHomePagePastSession,
  showHomePagePastSession,
  hideHomePageLiveSession,
  showHomePageLiveSession
}

const mapStateToProps = (state: Object): Object => {
  return {
    serverdate: state.serverdate,
    loadingsessions: state.sessions.loading,
    sessions: state.sessions.data,
    showallpastsessions: state.sessions.showallpastsessions,
    profile: state.student.profile,
    sessionsloading: state.sessions.loading,
    homepagesessionpastvisible: state.studentui.homepagesessionpastvisible,
    homepagesessionvisible: state.studentui.homepagesessionvisible,
    homepagesessionlivevisible: state.studentui.homepagesessionlivevisible,
  }
}

export default connect(mapStateToProps, mapActionCreators)(Sessions)
