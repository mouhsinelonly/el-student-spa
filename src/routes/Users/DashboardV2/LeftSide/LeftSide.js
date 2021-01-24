// @flow
import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTicketsInfoMenu } from 'routes/Users/modules/userui'
import Loading from 'components/Loading'
const StudentInfo = React.lazy((): Object => import('./StudentInfo'))
const EditProfileForm = React.lazy((): Object => import('./EditProfileForm'))
const StudentSubjects = React.lazy((): Object => import('./StudentSubjects'))
const StudentSessions = React.lazy((): Object => import('./StudentSessions'))
const StudentTilawa = React.lazy((): Object => import('./StudentTilawa'))
const StudentMarket = React.lazy((): Object => import('./StudentMarket'))
const StudentExams = React.lazy((): Object => import('./StudentExams'))
const StudentGrades = React.lazy((): Object => import('./StudentGrades'))
const Installlments = React.lazy((): Object => import('./Installlments'))
const StudentExcuses = React.lazy((): Object => import('./StudentExcuses'))

const LeftSide = (): React.Element<'div'> => {
  const dispatch = useDispatch()
  const { activeStudentDetails: { subjects, mobile, id, degree_type, username } = {}, loadingStudentDetails: loading } = useSelector((state: Object): Object =>
    state.user_students)

  const sessions = useSelector((state: Object): Object => state.user_sessions.activeStudentSessions)
  const { loading: loadingTickets, total } = useSelector((state: Object): Object => state.user_tickets)
  const { editStudentProfileVisible: formVisible, ticketsInfoMenuVisible: visible } = useSelector((state: Object): Object => state.user_ui)

  const userChosen = typeof id !== 'undefined'
  const isLoading = !(!loading || (!total && !loadingTickets))
  if (isLoading) {
    return <div className='col-xs-12 col-md-3 p-a-0 user2-dashboard__side is-border-right is-table'>
      <Loading strokeColor='#3d4d71' className='user2-dashboard__loading' />
    </div>
  }
  const hide = () => {
    dispatch(toggleTicketsInfoMenu(false))
  }
  return (
    <div className={`col-xs-12 col-md-3 p-a-0 user2-dashboard__side is-border-right
      ${userChosen ? '' : 'no-user'}
      ${visible ? 'is-visible' : ''}
      is-menu
      is-left-menu`}>
      <span className={`material-icons m-r-1 m-t-1 hidden-md-up
        ${formVisible ? 'hidden-xs-up' : ''}`} onClick={hide}>arrow_forward</span>
      <div
        className={`user2-dashboard__side-studentdata
          ${!userChosen ? 'hidden-xs-up' : ''}
          ${formVisible ? 'is-hidden' : ''}`}>
        <React.Suspense>
          <StudentInfo />
          <Installlments
            id={id}
            degreeType={degree_type}
            username={username} />
          <StudentSubjects subjects={subjects} />
          <StudentSessions subjects={sessions} />
          <StudentMarket />
          <StudentTilawa />
          <StudentExams studentId={id} />
          <StudentExcuses />
          <StudentGrades />
        </React.Suspense>
      </div>
      <EditProfileForm id={id} initialValues={{ mobile, id }} />
    </div>)
}

export default LeftSide
