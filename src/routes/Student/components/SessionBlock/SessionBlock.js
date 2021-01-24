// @flow
import React, { useRef, useCallback } from 'react'
import moment from 'moment'
import './style.scss'
import Icon from 'components/Icon'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { dayNumberToString, hourNumberToString, minuteNumberToString, secondNumberToString,
monthNumberToString, teacherNumberToString } from 'utils'
import { storeSessionClick, toggleVisibleOthers } from '../../modules/sessions'

type SessionBlockType = {
  id: number,
  attendedInOther: boolean,
  classroom_session: Object,
  student_link: string,
  attended: number,
  classroom_session_id: number,
  excuseStatus: string,
  order: number,
  excuseComment: string,
  discuss_lessons: string,
  subject_id: number,
  csem: Array<Object>,
  index: number
};
const SessionBlock = (props: SessionBlockType): React.Element<'div'> => {
  const refContainer = useRef()
  const dispatch = useDispatch()

  const { id, classroom_session, index, attended, student_link: studentLink,
      excuseStatus, excuseComment, csem, attendedInOther,
      subject_id: subjectId, order, discuss_lessons: discussLessons,
      classroom_session_id: sessionId } = props
  const { data: semesterevents } = useSelector((state: Object): Object => state.semester_events)
  const serverdate = useSelector((state: Object): Object => state.serverdate)
  const { relatedSessions, visibleSessionOthers } = useSelector((state: Object): Object => state.sessions)

  const sessions = relatedSessions.filter((s: Object): boolean => s.order === order &&
      s.subject_id === subjectId)

  const showOtherSessions = visibleSessionOthers === id
  const startAtMoment = moment(classroom_session.start_at)
  const momentServerTime = moment(serverdate)
  const isPast = startAtMoment.clone().add(classroom_session.duration, 'minutes').isBefore(momentServerTime)
  const diff = startAtMoment.diff(momentServerTime)
  const duration = moment.duration(diff)
  const diffInMinutes = duration.minutes()
  const diffInMonths = duration.months()
  const sessionExcuseEvent = semesterevents.find((e: Object): boolean =>
      e.category === `classroom_execuse_${classroom_session.interval.order}`)

  let sessionExcuseActive = false
  if (sessionExcuseEvent) {
    const sessionExcuseEventStartAtMoment = moment(`${sessionExcuseEvent.start_at} ${sessionExcuseEvent.time_start_at}`)
    const sessionExcuseEventFinishAtMoment =
      moment(`${sessionExcuseEvent.finish_at} ${sessionExcuseEvent.time_finish_at}`)

    sessionExcuseActive = sessionExcuseEventStartAtMoment.isBefore(momentServerTime) &&
    sessionExcuseEventFinishAtMoment.isAfter(momentServerTime)
  }
  const diffInDays = duration.days()
  const diffInHours = duration.hours()
  const diffInSeconds = duration.seconds()
  const makingRecording = classroom_session.wiziq_recording_status !== 'available' &&
  classroom_session.wiziq_recording_status !== 'notavailable'
  const recordingAvailable = classroom_session.wiziq_recording_status === 'available'
  const isFuture = startAtMoment.isAfter(momentServerTime)
  let excuseText = ''

  let excuseStatusButton = ''

  switch (excuseStatus) {
    case 'waiting':
      excuseText = 'تَم إرسال عُذر'
      excuseStatusButton = 'info'
      break
    case 'refused':
      excuseText = 'رُفِض العُذر'
      excuseStatusButton = 'danger'
      break
    case 'accepted':
      excuseText = 'قُبِلَ العُذر'
      excuseStatusButton = 'success'
      break
    default:
  }
  const canExcuse = (sessionExcuseActive && attended === 0 &&
            (excuseStatus === 'refused' || excuseStatus === null) && csem.length < 2) &&
  !attendedInOther &&
  recordingAvailable

  const otherSessionsTeachers = sessions.reduce((total: Array<number>, next: Object): Array<number> =>
      total.findIndex((i: number): boolean =>
        i === next.teacher_id) >= 0 ? total : total.concat(next.teacher_id), []).length

  const isRunning = startAtMoment.clone().add(classroom_session.duration, 'minutes').isAfter(momentServerTime) &&
    startAtMoment.isBefore(momentServerTime)
  const hasExcuse = excuseStatus && excuseStatus !== null

  const _toggleOthers = useCallback(() => {
    dispatch(toggleVisibleOthers(id))
  }, [id])
  const _showExcuseComment = useCallback(() => {
    const commentStyle = refContainer.current.style
    commentStyle.display = commentStyle.display === 'block' ? 'none' : 'block'
  })
  const _logSessionClick = useCallback(() => {
    dispatch(storeSessionClick(sessionId))
  }, [sessionId])

  return (<div className='c-session-block'>
    <div className={`c-session-block__panel ${isPast || isRunning ? 'is-past' : ''} ${index > 0 ? 'm-t-2' : ''}`}>
      <div className='col-xs-2 col-md-2 p-y-1 col-lg-1 text-xs-center plg-r-0 p-l-0'>
        <span className={`c-session-block__indicator ${isRunning && 'is-active'}`}>
          <Icon name='classroom-teacher-avatar' className='c-session-block__icon' />
        </span>
      </div>
      <div className={`p-y-1 ${!classroom_session.classroom_id
        ? 'col-xs-5 col-md-6 col-lg-7' : 'col-xs-5 col-md-3 col-lg-3'}`}>
        <h4 className='c-session-block__title text-truncate'><b>{classroom_session.subject.name}</b></h4>
        <p className='c-session-block__description text-truncate'>
          {!classroom_session.classroom_id
            ? 'ستتعرف من خلال هذه الحلقة على مختلف تفاصيل الدراسة' : classroom_session.title}
        </p>
      </div>
      {classroom_session.classroom_id && (<div
        className={`${isRunning ? 'col-xs-5 col-md-5 col-lg-5' : 'col-xs-5 col-md-3 col-lg-2'} p-y-1`}>
        <p className='c-session-block__lessons' dangerouslySetInnerHTML={{ __html: discussLessons }} />
      </div>)}
      {isFuture && <div className='col-xs-12 col-md-4 col-lg-4 p-y-1'>
        <p style={{ fontSize: 14 }} className='c-session-block__countdown text-truncate'>باقي
          {diffInMonths > 0 ? ` ${monthNumberToString(diffInMonths)} و` : null}
          {diffInDays > 0 ? ` ${dayNumberToString(diffInDays)} و` : null}
          {diffInHours > 0 ? ` ${hourNumberToString(diffInHours)} و` : null}
          {diffInMinutes > 0 ? ` ${minuteNumberToString(diffInMinutes)} و` : null}
          {diffInSeconds > 0 ? ` ${diffInSeconds} ${secondNumberToString(diffInSeconds)}` : null}</p>
        <h5 className='m-a-0 text-nowrap c-session-block__date'><b>{startAtMoment.format('dddd ')}
          {startAtMoment.locale('en-us').format('D')}
          {startAtMoment.locale('ar-SA').format(' MMMM ')}
        </b> | <b>{startAtMoment.locale('en-us').format(' h:mm ')}
          {startAtMoment.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساء'}
        </b></h5>
      </div>
    }
      {isRunning && <div className='col-xs-12 col-md-3 p-y-1 col-lg-3 plg-r-0 text-xs-center no-pos-relative'>
        <a href={studentLink}
          onClick={_logSessionClick}
          target='_blank'
          className='btn btn-block c-session-block__running btn-success'>
              جاري الآن ،دخول
        </a>
        <p className='m-a-0 hidden-xs-up' style={{ fontSize: 13 }}>
          إنطلق منذ {minuteNumberToString(-diffInMinutes)}
        </p>
      </div>
    }
      {isPast &&
        <div className='col-xs-12 col-md-5 p-y-1 col-lg-6 p-r-0 text-xs-left' style={{ position: 'inherit' }}>
          {canExcuse
          ? <Link to={`/student/orders/session_excuse/${classroom_session.id}`}
            className={`btn btn-warning c-session-block__excuse-button has-right`}>
            {hasExcuse ? 'قَدِّم عذر آخر' : 'قَدِّم عذر غيابك' }
          </Link> : null}
            {hasExcuse ? <button
              onClick={excuseComment && _showExcuseComment}
              className={`btn btn-${excuseStatusButton}-light mmd-l-1 c-session-block__excuse-button has-right`}>
              {excuseText}
              <span className={`${!excuseComment ? 'hidden-xs-up' : ''}
              text c-session-block__excuse-plus`}>+</span>
            </button> : null
            }
            {recordingAvailable
                ? <a className={`btn c-session-block__recording btn-gray
                  ${(!canExcuse && !hasExcuse) ? 'is-full' : ''}`}
                  href={classroom_session.recording_link}
                  target='_blank'>
                  <Icon name='play-single-small-white' className='m-l-1' />
                    مُشاهدة التسجيل
                </a> : null}
            {makingRecording
            ? <button disabled
              className={`btn c-session-block__recording btn-gray ${!canExcuse ? 'is-full' : ''}`}>
          جاري اعداد التسجيل...
            </button>
        : null}
        </div>
    }
      <div className='clearfix' />
      <div ref={refContainer}
        className={`${!excuseComment ? 'hidden-xs-up' : ''} c-session-block__excuse-comment p-a-1`}>
        <h6 className='font-weight-bold'>السبب</h6>
        <p className='c-session-block__excuse-comment-text'>{excuseComment}</p>
      </div>
      { isPast ? <div className={`c-session-block__others__container ${!sessions.length ? 'hidden-xs-up' : ''}`}>
        <div className={showOtherSessions ? '' : 'hidden-xs-up'}>
          {sessions.map((s: Object): React.Element<'div'> => <div
            className='row c-session-block__others text-xs-center' key={s.id}>
            <div className='col-xs-12 col-md-4 c-session-block__others-title p-a-2'>
              {s.teacher_name}
            </div>
            <div className='col-xs-12 col-md-4 p-a-2 c-session-block__others-duration'>
              مدته {s.duration} دقيقة
            </div>
            <div className='col-xs-12 col-md-4 p-a-2'>
              <a href={s.recording_link} target='_blank' className='c-session-block__others-link'>
                مشاهدة التسجيل
              </a>
            </div>
          </div>)}
        </div>
        <button onClick={_toggleOthers} className='c-session-block__others-toggle p-y-1 m-x-auto'>
          {showOtherSessions
            ? <span><Icon name='minus-rounded' /> إخفاء الحصص</span>
            : <span><Icon name='plus-rounded' /> عرض حصص ل<b>
              {teacherNumberToString(otherSessionsTeachers)}</b></span>}
        </button>
      </div> : null }
    </div>
  </div>)
}

export default SessionBlock
