import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// import css
import './styles.scss'
import { Link } from 'react-router'
import RadarNumber from 'components/Notifications'
import Dot from 'components/Notifications/Dot'

class SubNav extends PureComponent {
  render () {
    const { active, cols, newPosts, sessions, serverdate, className, semesterevents, classrooms } = this.props

    const momentServerTime = moment(serverdate)

    const classroomEvent = semesterevents.find(e => e.category === 'choose_classroom')
    const midTermEvent = semesterevents.find(e => e.category === 'mid_term_test')
    const activityEvent = semesterevents.find(e => e.category === 'short_test')
    const finalEvent = semesterevents.find(e => e.category === 'final_term_test')
    const summerEvent = semesterevents.find(e => e.category === 'final_term_test')
    const quranEvent = semesterevents.find(e => e.category === 'quran_test')
    const centersEvent = semesterevents.find(e => e.category === 'choose_centers')
    const refinalEvent = semesterevents.find(e => e.category === 'excuse_test')
    const resultEvent = semesterevents.find(e => e.category === 'result')

    const hasExamEvent = (midTermEvent && moment(midTermEvent.start_at).isBefore(momentServerTime) &&
      moment(`${midTermEvent.finish_at} 23:59:59`).isAfter(momentServerTime)) || (activityEvent &&
      moment(activityEvent.start_at).isBefore(momentServerTime) &&
      moment(`${activityEvent.finish_at} 23:59:59`).isAfter(momentServerTime)) || (finalEvent &&
      moment(finalEvent.start_at).isBefore(momentServerTime) &&
      moment(`${finalEvent.finish_at} 23:59:59`).isAfter(momentServerTime)) || (summerEvent &&
      moment(summerEvent.start_at).isBefore(momentServerTime) &&
      moment(`${summerEvent.finish_at} 23:59:59`).isAfter(momentServerTime)) || (quranEvent &&
      moment(quranEvent.start_at).isBefore(momentServerTime) &&
      moment(`${quranEvent.finish_at} 23:59:59`).isAfter(momentServerTime)) || (centersEvent &&
      moment(centersEvent.start_at).isBefore(momentServerTime) &&
      moment(`${centersEvent.finish_at} 23:59:59`).isAfter(momentServerTime)) || (refinalEvent &&
      moment(refinalEvent.start_at).isBefore(momentServerTime) &&
      moment(`${refinalEvent.finish_at} 23:59:59`).isAfter(momentServerTime)) || (resultEvent &&
      moment(resultEvent.start_at).isBefore(momentServerTime) &&
      moment(`${resultEvent.finish_at} 23:59:59`).isAfter(momentServerTime))

    let liveSessions = sessions.filter((s, key) => {
      if (!s.classroom_session) return false
      if (s.classroom_session.canceled === 1) return false
      let sessionStartAt = moment(s.classroom_session.start_at)
      return s.classroom_session.canceled === 0 && sessionStartAt.isBefore(momentServerTime) &&
      sessionStartAt.clone().add(s.classroom_session.duration, 'minutes').isAfter(momentServerTime)
    }).length
    liveSessions += (classroomEvent && classrooms.length > 0 &&
      moment(classroomEvent.start_at).isBefore(momentServerTime) &&
      moment(`${classroomEvent.finish_at} 23:59:59`).isAfter(momentServerTime)) ? 1 : 0

    return (<nav className={`navbar student-subnav__navbar ${className}`}>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-10 col-lg-pull-1 text-xs-center'>
            <Link to='/student' className={`${active === 1 &&
              'is-active'} student-subnav__nav-link col-xs-${cols}`}>
            الدراسة {liveSessions > 0 && <RadarNumber className='m-r-1' number={liveSessions} /> }
            </Link>
            <Link to='/student/community' className={`${active === 2 && 'is-active'}
            student-subnav__nav-link col-xs-${cols}`}>
              المجتمع {newPosts > 0 && <RadarNumber className='m-r-1' number={newPosts} /> }
            </Link>
            <Link to='/student/exams' className={`${active === 3 &&
              'is-active'} student-subnav__nav-link col-xs-${cols}`}>
              الاختبارات {hasExamEvent && <Dot />}
            </Link>
            {cols === 3 && <Link to='/student/research' className={`${active === 4 &&
              'is-active'} student-subnav__nav-link col-xs-${cols}`}>
              البحوث
            </Link>}
          </div>
        </div>
      </div>
    </nav>)
  }
}
SubNav.propTypes = {
  active: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  newPosts: PropTypes.number.isRequired,
  classrooms: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
  serverdate: PropTypes.string,
  className: PropTypes.string,
  semesterevents: PropTypes.array
}

SubNav.defaultProps = {
  newPosts: 0,
  cols: 4,
  active: 0,
  className: ''
}

export default SubNav
