// @flow
import * as React from 'react'
import './Student.scss'
import Loading from 'components/Loading'
// import moment from 'moment'
// import ErrorBoundary from 'components/ErrorBoundries'
import SubNav from './SubNav'
import LiveSessionNotification from './LiveSessionNotification'

import { changeThemeColor, getPageVisibility } from 'utils'

import requireAuthentication from 'components/AuthenticatedComponent'
import DefaultDashboard from './DefaultDashboard'
import NavBar from './NavBar'

const ChooseSpecialty = React.lazy((): Function => import('./ChooseSpecialty'))
const StudentStates = React.lazy((): Function => import('./StudentStates'))
// const OpenViduCall = React.lazy((): Function => import('components/OpenViduCall'))
const UpdateExamAppNotification = React.lazy((): Function => import('./Notifications/UpdateExamAppNotification'))
const Support = React.lazy((): Function => import('components/Support/'))
const SessionPoll = React.lazy((): Function => import('./SessionPoll'))

type PropType = {
  setRemoteCallId: Function,
  isPushSupported: Function,
  getSessionPoll: Function,
  getSemesters: Function,
  router: Function,
  getSubjectsForums: Function,
  reasearchActivities: Array<Object>,
  getMessages: Function,
  getExams: Function,
  setActiveTicket: Function,
  getDocuments: Function,
  getTypeForms: Function,
  createTicket: Function,
  getGrades: Function,
  getTickets: Function,
  sendTicketReply: Function,
  getDelayOrders: Function,
  getWithdrawOrders: Function,
  getLessons: Function,
  getGeneralSettings: Function,
  getClassrooms: Function,
  getSemesterEvents: Function,
  getProfile: Function,
  getResearchActivities: Function,
  getSubjects: Function,
  userId: number,
  windowResized: Function,
  getSessions: Function,
  getActivePayment: Function,
  profile: Object,
  loading: boolean,
  modalvisible: boolean,
  chatboxopen: boolean,
  subjectsloading: boolean,
  children: React.Element<*>,
  sessions: Array<Object>,
  subjects: Array<Object>,
  tickets: Object,
  token: string,
  libraryvisible: boolean,
  thesisAllVisible: boolean,
  navbarvisible: boolean,
  supportButtonVisible: boolean,
  activeticket: number,
  getTicketCategories: Function,
  getOrders: Function,
  getCertificateDays: Function,
  getServerDate: Function,
  getQuranRecordings: Function,
  getQuranExtends: Function,
  getSettings: Function,
  getQuranPages: Function
};

const Student = (props: PropType): React.Element<'div'> => {
  const {
      loading,
      children,
      chatboxopen,
      navbarvisible,
      token,
      profile,
      subjects,
      profile: { term_id: termId, id, username, state, portalType, isEquation },
      createTicket,
      tickets,
      setActiveTicket,
      activeticket,
      supportButtonVisible,
      sendTicketReply,
      setRemoteCallId,
      libraryvisible,
      getServerDate,
      thesisAllVisible,
      getSemesterEvents,
      getProfile,
      reasearchActivities,
      windowResized,
      getSubjects,
      getSubjectsForums,
      getClassrooms,
      router,
      getMessages,
      getSemesters,
      getSessions,
      getTypeForms,
      getGrades,
      getCertificateDays,
      getExams,
      isPushSupported,
      getSettings,
      getGeneralSettings,
      getSessionPoll,
      getTickets,
      getResearchActivities,
      getTicketCategories,
      getQuranRecordings,
      getQuranExtends,
      getOrders,
      getQuranPages
    } = props
  const _onVisibilityChange = () => {
    const { hidden } = getPageVisibility()
    if (document && document[hidden]) {

    } else {
      getServerDate()
      getSemesterEvents(true)
    }
  }
  const _endCall = () => {
    setRemoteCallId(0, '')
  }
  const _onWindowResized = () => {
    windowResized()
  }
  React.useLayoutEffect((): Function => {
    const { visibilityChange } = getPageVisibility()
    window.addEventListener(visibilityChange, _onVisibilityChange)
    window.addEventListener('resize', _onWindowResized)
    changeThemeColor('#344142')

    if (token && typeof profile.id === 'undefined') {
      getProfile().then((profile: Object) => {
        if (profile.state === 'active') {
          getSubjectsForums()
          getSessionPoll()
          getTypeForms()
          getExams()
          getResearchActivities()
          getClassrooms()
          getSessions()
          getSubjects()
          getSemesters()
          getSemesterEvents()
          getTicketCategories()
          getTickets()
          getQuranRecordings()
          getQuranExtends()
          getQuranPages()
        }
        getGeneralSettings()
        getGrades()
        getMessages()
        getSettings()
        getOrders({ landing: true })

        isPushSupported()
        if (profile.state === 'graduate') {
          getCertificateDays()
        }
      })
    }

    return () => {
      changeThemeColor('#fff')
      const { visibilityChange } = getPageVisibility()
      window.removeEventListener(visibilityChange, _onVisibilityChange)
      window.removeEventListener('resize', _onWindowResized)
    }
  }, [])

  const isCommunityRouterActive = router.isActive('student/community', true)
  const isExamsRouterActive = router.isActive('student/exams', true)
  const isOnHomePage = router.isActive('student', true)
  const hasNormalSubject = subjects.findIndex((subject: Object): boolean => ![89, 90].includes(subject.id)) >= 0
  const showSubNav = (router.isActive('student', true) || isCommunityRouterActive || isExamsRouterActive) &&
  (portalType !== 'thesis' || thesisAllVisible)
  const isThesisSubjects = portalType === 'thesis' && hasNormalSubject

  let activeSubnav = 1
  if (isExamsRouterActive) {
    activeSubnav = 3
  } else if (isCommunityRouterActive) {
    activeSubnav = 2
  }

  const studentIsActive = profile.state === 'active'
  if (loading) {
    return (
      <div className='student-dashboard__loading-container'>
        <Loading className='m-a-3 student-dashboard__loading-indicator' text='جاري تحميل بياناتك...' />
      </div>
    )
  }

  return (
    <div className={`student-dashboard ${libraryvisible ? 'is-library' : ''} ${navbarvisible
        ? 'is-nav-visible' : ''}`}>
      <div className={`student-dashboard__body ${chatboxopen ? 'is-chatbox-open' : ''}`}>
        <React.Suspense fallback={<span />}>
          {(termId === 4 && state === 'active' && !isEquation) && navbarvisible
            ? <ChooseSpecialty code={username} id={id} />
            : null }
        </React.Suspense>
        <React.Suspense fallback={<span />}>
          { (profile.applog === null && state === 'active') ? <UpdateExamAppNotification /> : null }
        </React.Suspense>
        {/* <ChangeProfilePhotoNotifcation /> */}
        {/* !profile.croped && <ChangeProfilePhotoNotifcation /> */}
        {navbarvisible && <NavBar />}
        <React.Suspense fallback={<span />}>
          {isOnHomePage ? <StudentStates /> : null}
        </React.Suspense>
        <SubNav
          key='subnav'
          active={activeSubnav}
          className={!studentIsActive || !showSubNav ? 'hidden-xs-up' : `${isThesisSubjects ? 'col-md-6 col-md-pull-3 m-t-2 m-b-2' : ''}`}
          cols={reasearchActivities.length ? 3 : 4}
          />
        {children || <DefaultDashboard {...props} />}
        {profile.state === 'active' &&
            (navbarvisible &&
              profile.state === 'active' && <LiveSessionNotification />)}
      </div>
      {navbarvisible && supportButtonVisible && (
      <React.Suspense fallback={<span />}>
        <Support
          createTicket={createTicket}
          setActiveTicket={setActiveTicket}
          activeticket={activeticket}
          ownerId={profile.id}
          sendReply={sendTicketReply}
          ownerType='students'
          tickets={tickets}
            />
      </React.Suspense>
        )}
      <React.Suspense fallback={<span />}>
        <SessionPoll />
      </React.Suspense>
      <div className='clearfix' />
      {/* <React.Suspense fallback={<span />}>
          {(userId && +profile.id === 10001) ? <OpenViduCall bottom streamName={`support_ticket_${userId}_${profile.id}`} /> : null}
        </React.Suspense> */}
      {/* { userId === 0 ? null : <RTCVoip openUrl={callUrl} */}
    </div>
  )
}

Student.defaultProps = {
  modalvisible: false,
  sessions: []
}

export default requireAuthentication(Student)
