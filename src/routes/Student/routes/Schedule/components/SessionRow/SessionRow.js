// @flow
import * as React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import './style.scss'

type PropsType = {
  classroom_session: Object,
  serverdate: string,
  attended: number
};

class SessionRow extends React.Component<PropsType> {
  render (): React.Element<'tr'> {
    const { classroom_session:  { subject, title, start_at, wiziq_status: wiziqStatus, canceled },
    attended, serverdate } = this.props
    const startAtMoment = moment(start_at)
    const isPast = moment(startAtMoment).add(60, 'minutes').isBefore(moment(serverdate))
    let isPastClassName
    if (!isPast) {
      isPastClassName = 'text-info'
    } else if (isPast && attended) {
      isPastClassName = 'text-success'
    } else {
      isPastClassName = 'text-danger'
    }
    let statusText = ''
    if (isPast) {
      if (attended === 1 && wiziqStatus === 'completed') {
        statusText = 'حضرت'
      } else if (attended === 0 && wiziqStatus === 'completed') {
        statusText = 'تغيبت'
      } else if (canceled === 1) {
        statusText = 'مؤجلة'
      } else if (attended === null) {
        statusText = 'جاري تسجيل الحضور'
      }
    } else if (!isPast) {
      if (canceled === 1) {
        statusText = 'مؤجلة'
      } else {
        statusText = 'قادم'
      }
    }
    return (<tr className='c-student-session-row'>
      <td><b>{subject.name}</b></td>
      <td>{title}</td>
      <td>
        {`${startAtMoment.format('dddd')} ${startAtMoment.locale('en').format('DD')}
        ${startAtMoment.locale('ar-SA').format('MMMM')}`}
      </td>
      <td>الساعة {startAtMoment.locale('en').format('HH:mm')} {startAtMoment.locale('ar-SA').format('a')}</td>
      <td className={isPastClassName}>
        {/* isPast ? (attended ? 'حضرت' : 'تغيبت') : 'قادم */}
        {statusText}
      </td>
    </tr>)
  }
}

export default SessionRow
