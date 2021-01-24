import { connect } from 'react-redux'
import { getOrders } from '../modules/market'
import { getProfile, setRemoteCallId, getTypeForms, getCertificateDays, getSettings as getGeneralSettings } from '../modules/student'
import { getSubjects, getSubjectsForums } from '../modules/subjects'
import { getQuranRecordings, getQuranExtends, getQuranPages } from 'routes/Student/modules/quran'
import { logoutAndRedirect } from 'routes/Auth/modules/auth'
import {
  showNavbarDropdown,
  hideNavbarDropdown,
  windowResized
} from '../modules/ui'
import { getSessions, showAllPastSessions, getSessionPoll } from '../modules/sessions'
import { getSettings } from '../modules/settings'
import { getDelayOrders, getWithdrawOrders } from '../modules/orders'
import { getLessons } from '../modules/lessons'
import { getServerDate } from 'modules/network'
import { getActivePayment } from '../modules/payments'
import { getSemesterEvents } from '../modules/semester_events'
import { getClassrooms } from '../modules/classrooms'
import { isPushSupported, subscribePush, unsubscribePush } from '../modules/gcm'
import { getSemesters } from '../modules/semesters'
// import { windowResized } from '../modules/ui'
import { getExams } from '../modules/exams'
import { getGrades } from '../modules/grades'
import { getDocuments } from '../modules/documents'
import { getResearchActivities } from '../modules/researches'
import { getMessages } from '../modules/messages'
import { getTickets, createTicket, setActiveTicket, sendTicketReply, getTicketCategories } from '../modules/tickets'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import Student from 'routes/Student/components/Student'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile the component doesn't care   */

const mapActionCreators = {
  windowResized,
  getSettings,
  getTypeForms,
  getCertificateDays,
  setRemoteCallId,
  getSessionPoll,
  getOrders,
  getProfile,
  showAllPastSessions,
  getDocuments,
  getServerDate,
  getGeneralSettings,
  getMessages,
  getExams,
  getGrades,
  getSemesters,
  getDelayOrders,
  getResearchActivities,
  getSubjectsForums,
  setActiveTicket,
  getWithdrawOrders,
  logoutAndRedirect,
  showNavbarDropdown,
  hideNavbarDropdown,
  getSubjects,
  getSessions,
  getTicketCategories,
  sendTicketReply,
  getActivePayment,
  getSemesterEvents,
  getLessons,
  getClassrooms,
  getTickets,
  createTicket,
  isPushSupported,
  subscribePush,
  unsubscribePush,
  getQuranRecordings,
  getQuranExtends,
  getQuranPages
}

const mapStateToProps = state => {
  return {
    navbarvisible: state.studentui.navbarvisible,
    profile: state.student.profile,
    thesisAllVisible: state.student.thesisAllVisible,
    userId: state.student.userId,
    callUrl: state.student.callUrl,
    loading: state.student.loading,
    subjects: state.subjects.data,
    sessions: state.sessions.data,
    subjectsError: state.subjects.error,
    subjectsloading: state.subjects.loading,
    modalvisible: state.modals.visible,
    libraryvisible: state.library.visible,
    chatboxopen: state.chatbox.open,
    activeticket: state.tickets.activeticket,
    events: state.semester_events.data,
    reasearchActivities: state.researches.activities,
    tickets: state.tickets.tickets,
    token: state.auth.token,
    serverdate: state.serverdate,
    supportButtonVisible: state.ui.supportButtonVisible,
    gcmenabled: state.gcm.enabled,
    showallpastsessions: state.sessions.showallpastsessions
  }
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const profile = (state) => state.profile
    const tripleCount = createSelector(profile, (count) => count * 3)
    const mapStateToProps = (state) => ({
      profile: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(Student)
