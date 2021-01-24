import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import './style.scss'
import { getDayString } from 'utils'

class SessionRow extends Component {
  static propTypes = {
    subjectName: PropTypes.string,
    classroomCode: PropTypes.string,
    classroomDay: PropTypes.number,
    classroomHour: PropTypes.string,
    serverdate: PropTypes.string,
    sessions: PropTypes.array
  }
  render () {
    const { subjectName, classroomDay, classroomHour, classroomCode } = this.props
    const startAtMoment = moment(classroomHour, 'HH:mm:ss')
    const period = startAtMoment.locale('en').format('a') === 'am' ? 'صباحا' : 'مساء'
    return (
      <tr className='c-student-sessionv2-row'>
        <td>
          <span className='c-student-sessionv2-row__subject'>{subjectName}</span>
          <div className='c-student-sessionv2-row__date'>
            {classroomCode ? <span className='c-student-sessionv2-row__day'>
              {classroomCode}
            </span> : null }
            <span className='c-student-sessionv2-row__day'>
              {getDayString(classroomDay)}
            </span>
            {classroomHour ? startAtMoment.locale('en')
            .format('HH:mm') : 'لم تقم باختيار شعبة'} {classroomHour ? period : ''}
          </div>
        </td>
        <td className='c-student-sessionv2-row__col'>{this.renderSession(1)}</td>
        <td className='c-student-sessionv2-row__col'>{this.renderSession(2)}</td>
        <td className='c-student-sessionv2-row__col'>{this.renderSession(3)}</td>
        <td className='c-student-sessionv2-row__col'>{this.renderSession(4)}</td>
        <td className='c-student-sessionv2-row__col'>{this.renderSession(5)}</td>
        <td className='c-student-sessionv2-row__col'>{this.renderSession(6)}</td>
      </tr>
    )
  }

  renderSession (order = 0) {
    const { sessions, serverdate } = this.props
    const session = sessions.sort((a, b) => +b.attended - +a.attended).find(s => (s.order === order) &&
      (s.classroom_session &&
        s.classroom_session.canceled === 0))

    if (!session) return 'لا يوجد'

    const { excuseStatus, attended,
      classroom_session: { id, wiziq_status: wiziqStatus, start_at: startAt, canceled }, compensatory } = session

    const startAtMoment = moment(startAt)
    const isPast = moment(startAtMoment).add(60, 'minutes').isBefore(moment(serverdate))
    const excuseAccepted = excuseStatus === 'accepted'
    let icon = ''
    let text = ''
    let subtext = ''

    if (isPast) {
      if (!excuseStatus && (attended === 1 && wiziqStatus === 'completed')) {
        icon = <Icon name='small-check-green' className='c-student-sessionv2-row__icon' />
        text = 'حضرت'
      } else if (excuseAccepted || (attended === 1 && wiziqStatus === 'completed')) {
        icon = <Icon name='small-check-green' className='c-student-sessionv2-row__icon' />
        text = 'غائب بعذر'
      } else if (attended === 0 && wiziqStatus === 'completed') {
        icon = <Icon name='error-small-orange' className='c-student-sessionv2-row__icon' />
        text = 'تغيبت'
      } else if (canceled && !compensatory) {
        text = 'تعويضي'
      } else if (attended === null) {
        text = <Loading scale={10} stroke={2} width={30} height={30} className='c-student-sessionv2-row__load' />
      }
    } else {
      if (compensatory) {
        icon = <Icon name='small-check-green' className='c-student-sessionv2-row__icon' />
        text = 'تعويضي'
        subtext = <span className='c-student-sessionv2-row__comp'>{`${startAtMoment.locale('en').format('DD')}
        ${startAtMoment.locale('ar-SA').format('MMMM')}
        ${startAtMoment.locale('en').format('YYYY')}`}
        </span>
      } else {
        text = <span>
          {`${startAtMoment.locale('en').format('DD')}
          ${startAtMoment.locale('ar-SA').format('MMMM')}
          ${startAtMoment.locale('en').format('YYYY')}
          `}
        </span>
      }
    }
    return <div id={`sid${id}`}>
      <div>{icon} {text}</div>
      {subtext}
    </div>
  }
}

export default SessionRow
