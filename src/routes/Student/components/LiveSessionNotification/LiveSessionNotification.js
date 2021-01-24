// @flow
import * as React from 'react'
import './style.scss'
import Icon from 'components/Icon'
import { minuteNumberToString } from 'utils'
import moment from 'moment'
// import {Link} from 'react-router'
type PropsType = {
  sessions: Array<Object>,
  student_link: string,
  serverdate: string,
  storeSessionClick: Function,
  classroom_session: Object,
  classroom_session_id: number
};

const LiveSessionNotification = (props: PropsType): React.Element<'div'> => {
  const { serverdate, sessions, storeSessionClick, classroom_session_id: sessionId } = props

  const _logSessionClick = () => {
    storeSessionClick(sessionId)
  }
  const momentServerTime = moment(serverdate)

  const liveSession = sessions.find((s, key) => {
    if (!s.classroom_session) return false
    if (s.classroom_session.canceled === 1) return false
    const sessionStartAt = moment(s.classroom_session.start_at)
    return (
        sessionStartAt.isBefore(momentServerTime) &&
        sessionStartAt
          .clone()
          .add(s.classroom_session.duration, 'minutes')
          .isAfter(momentServerTime)
    )
  })
  if (!liveSession) {
    return <div />
  }

  const { classroom_session, student_link: studentLink } = liveSession

  const startAtMoment = moment(classroom_session.start_at)
  const diff = startAtMoment.diff(momentServerTime)
  const duration = moment.duration(diff)
  const diffInMinutes = duration.minutes()

  return (
    <div className='c-live-session-notificaion'>
      <div className='col-xs-2'>
        <span className='c-live-session-notificaion__indicator is-active'>
          <Icon name='classroom-teacher-avatar' className='c-live-session-notificaion__icon' />
        </span>
      </div>
      <div className='col-xs-6' style={{ fontSize: 14 }}>
        اللقاء المباشر جاري حاليا
        <p style={{ fontSize: 13, margin: 0 }}>
          إنطلق منذ {minuteNumberToString(-diffInMinutes)}
        </p>
      </div>
      <div className='col-xs-4'>
        <a href={studentLink}
          target='_blank'
          onClick={_logSessionClick}
          className='btn btn-success'
          style={{ marginTop: 5 }}>
          دخول
        </a>
      </div>
    </div>
  )
}

export default LiveSessionNotification
