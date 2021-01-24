// @flow
import * as React from 'react'
import ProfileBlock from 'components/ProfileBlock'
import Alert from 'components/Alert'
import Icon from 'components/Icon'
import './SubjectSession.scss'
import { Link } from 'react-router'
import moment from 'moment'
import { dayNumberToString, hourNumberToString, monthNumberToString, minuteNumberToString } from 'utils'

type PropsType = {
  session?: Object,
  name: string,
  serverdate: string,
  discuss: string,
  events: Array<Object>,
  attendedInOther: boolean
};

const SubjectSession = ({ session, name, discuss,
  serverdate, events, attendedInOther }: PropsType): React.Element<'div'> | null => {
  let teacher
  let dateText = 'اليوم 00 الشهر'
  let timeText = 'الساعة'
  let placeholder = true
  let isFuture = true
  let isFinished = false
  let isCurrent = false
  let infoText
  let timeCssClass = ''
  let headingText
  let startedSinceText
  let makingRecording = false
  let recordingAvailable = false
  let excuseText = ''
  let excuseStatusButton = ''
  let hasExcuse = false
  let canExcuse = false

  const momentServerTime = moment(serverdate)

  if (session && session.classroom_session) {
    let sessionExcuseActive = false
    const sessionExcuseEvent = events.find((e: Object): boolean =>
      e.category === `classroom_execuse_${session.classroom_session.interval.order}`)
    if (sessionExcuseEvent) {
      const sessionExcuseEventStartAtMoment = moment(sessionExcuseEvent.start_at)
      const sessionExcuseEventFinishAtMoment = moment(`${sessionExcuseEvent.finish_at} 23:59:59`)

      sessionExcuseActive = sessionExcuseEventStartAtMoment.isBefore(momentServerTime) &&
      sessionExcuseEventFinishAtMoment.isAfter(momentServerTime)
    }

    hasExcuse = session.excuseStatus && session.excuseStatus !== null
    canExcuse = (sessionExcuseActive && session.attended === 0 &&
            (session.excuseStatus === 'refused' || session.excuseStatus === null) &&
            session.csem.length < 2) &&
    !attendedInOther &&
    session.classroom_session.wiziq_recording_status === 'available'

    recordingAvailable = session.classroom_session.wiziq_recording_status === 'available'
    makingRecording = session.classroom_session.wiziq_recording_status !== 'available' &&
    session.classroom_session.wiziq_recording_status !== 'notavailable'

    isFuture = session.isFuture
    isFinished = session.isFinished
    isCurrent = session.isCurrent

    placeholder = false
    const startAtMoment = moment(session.classroom_session.start_at)

    teacher = session.classroom_session.teacher
    dateText = `${startAtMoment.format('dddd ')}
    ${startAtMoment.locale('en-us').format('D')}
    ${startAtMoment.locale('ar-SA').format(' MMMM ')}`
    timeText = `${startAtMoment.locale('en-us').format(' h:mm ')}
            ${startAtMoment.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساءا'}`
    if (isCurrent) {
      const diff = momentServerTime.diff(startAtMoment)
      const duration = moment.duration(diff)

      dateText = 'اللقاء جاري لآن'
      timeText = 'بدأ منذ'
      startedSinceText = moment(duration.asMilliseconds()).subtract(4, 'hours').locale('en').format('HH:mm:ss')
    }
    if (isFuture) {
      headingText = 'اللقاء سيكون يوم'
      const diff = startAtMoment.diff(momentServerTime)
      const duration = moment.duration(diff)
      const diffInMonths = duration.months()
      const diffInDays = duration.days()
      const diffInHours = duration.hours()
      infoText = `باقي ${diffInMonths > 0 ? ` ${monthNumberToString(diffInMonths)} و` : ''}
      ${diffInDays > 0 ? ` ${dayNumberToString(diffInDays)} و` : ''}
            ${diffInHours > 0 ? ` ${hourNumberToString(diffInHours)}` : ''}`
    }
    if (isFinished) {
      const startAtMoment = moment(session.classroom_session.start_at)
      timeCssClass = 'is-past'
      timeText = `يوم ${startAtMoment.format('dddd ')}
    ${startAtMoment.locale('en-us').format('D')}
    ${startAtMoment.locale('ar-SA').format(' MMMM ')}.
    \u00A0\u00A0\u00A0\u00A0على الساعة ${startAtMoment.locale('en-us').format(' h:mm ')}
            ${startAtMoment.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساءا'}\u00A0\u00A0\u00A0\u00A0
            لمدة ${minuteNumberToString(session.classroom_session.duration)}`
      switch (session.attended) {
        case 0:
          headingText = 'لقد تغيبت عن اللقاء'
          // dateText = '0 درجة'
          break
        case 1:
          if (session.excuseStatus === 'accepted') {
            headingText = 'لقد تم قبول عذرك'
          } else {
            headingText = 'لقد حضرت'
          }
          // dateText = '2,5 درجة'
          break
        default:
          dateText = 'جاري اعداد التسجيل'
      }
      switch (session.excuseStatus) {
        case 'waiting':
          excuseText = 'تَم إرسال عُذر'
          excuseStatusButton = 'info'
          // excuseIcon = 'clock-info-tiny'
          break
        case 'refused':
          excuseText = 'رُفِض العُذر'
          excuseStatusButton = 'danger'
          // excuseIcon = 'times-single-warning'
          break
        case 'accepted':
          excuseText = 'قُبِلَ العُذر'
          // excuseIcon = 'check-single-green'
          excuseStatusButton = 'success'
          break
        default:
        // excuseIcon = ''
      }
    }
  }

  return (
    <div className={`col-xs-12 col-md-10 col-md-pull-1 m-t-3`}>
      <h5 className='text-xs-center SubjectSession__header'>{name}</h5>
      <div className={`my-panel-white shadow-1 p-t-3 m-t-3 SubjectSession ${placeholder ? 'is-placeholder' : ''}`}>
        <h4 className='m-b-0 p-b-2 text-xs-center SubjectSession__title'>
          {headingText}
        </h4>
        <h1 className={`SubjectSession__date text-xs-center p-b-2 m-b-0`}>{dateText}</h1>
        <h1 className={`SubjectSession__time text-xs-center p-b-2 m-b-0 ${timeCssClass}`}>
          {timeText}
        </h1>
        <h1 className='SubjectSession__time text-xs-center p-b-2'>{startedSinceText}</h1>
        <div className='p-y-1 text-xs-center SubjectSession__lessons'>
          يناقش الدروس <span className='p-x-3'> {discuss} </span>
          {isFuture ? <span>يرجى مراجعتها قبل اللقاء</span> : null}
        </div>
        {!isFinished ? <div className='p-a-2'>
          <div className='row'>
            <div className='col-xs-12 col-md-6'>
              {teacher ? <ProfileBlock
                name={teacher.name}
                photo={teacher.photo_url}
                role='محاضر المادة' /> : null}
            </div>
            <div className='col-xs-12 col-md-6'>
              {placeholder ? <Alert text='لم تحدد بعد تواقيت اللقاءات' info /> : null}
              {session && isFuture ? <Alert text={infoText} info /> : null}
              {session && isCurrent ? <a href={session.student_link}
                target='_blank'
                className='btn btn-success btn-block btn-lg'>أدخل الآن</a> : null}
            </div>
          </div>
        </div> : null }
        {isFinished && session ? <div className='p-a-2'>
          <div className='row text-xs-center'>
            <a href={recordingAvailable ? session.classroom_session.recording_link : null}
              type={!recordingAvailable ? 'button' : 'text/html'}
              target='_blank'
              className='btn btn-gray btn-lg p-x-3'>
              <Icon name='play-single-small-white' className='m-l-1' />
              {recordingAvailable ? 'مشاهدة التسجيل' : ''}
              {makingRecording ? 'جاري اعداد التسجيل' : ''}
            </a>
            {hasExcuse && session.excuseStatus !== 'accepted' ? <button
              className={`btn btn-lg m-r-2 btn-${excuseStatusButton}-light mmd-l-1`}>
              {excuseText}
            </button> : null
              }
            {canExcuse
            ? <Link to={`/student/orders/session_excuse/${session.classroom_session.id}`}
              className={`btn btn-warning btn-lg m-r-2 p-x-3`}>
              {hasExcuse ? 'قَدِّم عذر آخر' : 'قَدِّم عذر غيابك' }
            </Link> : null}
          </div>
        </div> : null }
      </div>
    </div>
  )
}

export default SubjectSession
