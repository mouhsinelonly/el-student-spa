import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Icon from 'components/Icon'
import Dot from 'components/Notifications/Dot'
import moment from 'moment'
import { Link } from 'react-router'
import { lessonNumberToString, sessionNumberToString } from 'utils'

class SubjectBlock extends Component {
  render () {
    const { className, disabled, name, sessions, is_quran: isQuran,
      serverdate, id, color, image, total_lessons: totalLessons } = this.props
    const momentServerTime = moment(serverdate)
    const commingSession = sessions.find(s => {
      if (!s.classroom_session || s.classroom_session.canceled === 1) return false
      let startAt = moment(s.classroom_session.start_at)
      return startAt.isAfter(momentServerTime) || (startAt.isBefore(momentServerTime) &&
        startAt.add(s.classroom_session.duration, 'minutes').isAfter(momentServerTime))
    })

    const startAtMoment = commingSession && moment(commingSession.classroom_session.start_at)

    const isRunning = startAtMoment &&
    startAtMoment.clone().add(commingSession.classroom_session.duration, 'minutes').isAfter(momentServerTime) &&
    startAtMoment.isBefore(momentServerTime)
    // console.log(image)
    return (
      <div className={`text-xs-center subject-block ${className}`} >
        <Link to={`/student/subject/${id}`}
          className={`subject-block__panel shadow-1 ${disabled && 'is-disabled'}`}
          style={{ backgroundImage: (image ? `url("${image}")` : null) }}>
          <div className='subject-block__overlay' style={{ backgroundColor: `#${color}d1` }} />
          <header className={`subject-block__header p-x-2`}>
            <Dot className={`${!isRunning && 'hidden-xs-up'} subject-block__dot`} />
            <h1 className={`subject-block__title p-y-2`}>{name}</h1>
          </header>
          <section className={`subject-block__info p-y-1`}>
            {isQuran === 0 ? <span>
              {totalLessons ? `${lessonNumberToString(totalLessons)}` : null}
              {sessions
            ? ` | ${sessionNumberToString(sessions.filter(s => parseInt(s.classroom_session.canceled, 10) === 0).length)}`
          : null}
            </span> : <span>إستعرض المادة</span>}
          </section>
          <footer className={`subject-block__footer p-t-1 text-xs-right ${isQuran ? 'is-quran' : ''}`}>
            {
              commingSession && (<div>
                <div className='col-xs-3'>
                  <span className={`subject-block__indicator ${isRunning && 'is-active'}`}>
                    <Icon name='classroom-subject-avatar' className='subject-block__session-icon' />
                  </span>
                </div>
                <div className='col-xs-9 p-a-0'>
                  {`${startAtMoment.format('dddd')} ${startAtMoment.locale('en-us').format('DD')}
                ${startAtMoment.locale('ar-sa').format('MMMM')} | ${startAtMoment.locale('en-us').format('HH:mm')}
                ${startAtMoment.format('a') === 'am' ? 'صباحا' : 'مساء'}`}
                  <div className='subject-block__footer__subtitle'>
                    {commingSession.classroom_session.interval && commingSession.classroom_session.interval.title}
                  </div>
                </div>
              </div>)
            }
          </footer>
        </Link>
      </div>)
  }
}

SubjectBlock.propTypes = {
  image: PropTypes.string,
  serverdate: PropTypes.string,
  // lessons: PropTypes.array,
  total_lessons: PropTypes.number,
  sessions: PropTypes.array,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  is_quran: PropTypes.number.isRequired,
  id: PropTypes.number,
  className: PropTypes.string
}

export default SubjectBlock
