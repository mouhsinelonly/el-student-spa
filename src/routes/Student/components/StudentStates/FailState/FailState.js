import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './style.scss'
import {subjectNumberToString} from 'utils'
import moment from 'moment'

class FailState extends Component {
  static propTypes = {
    profile: PropTypes.object,
    semesters: PropTypes.array,
    terms: PropTypes.array,
    gpas: PropTypes.array
  }

  static defaultProps = {
    profile: {},
    terms: [],
    gpas: [],
    semesters: []
  }

  render () {
    const {profile: {histories, semester}, terms, gpas, semesters} = this.props

    const nextSemester = semesters.find(s => s.id > semester.id && s.year_id === semester.year_id)
    let nextSemesterMoment
    if (nextSemester) {
      nextSemesterMoment = moment(nextSemester.start_at)
    }
    const lastHistory = histories.find(h => h.academycycle_semester_id === semester.id)

    if (!lastHistory) return false

    const allSubjects = terms.filter(t => t.semester_id === semester.id).reduce((prev, current) => {
      return prev.concat(current.subjects)
    }, [])
    const allUniqueSubjects = allSubjects.reverse().reduce((prev, current) => {
      if (prev.findIndex(s => s.subject_id === current.subject_id) < 0) {
        return prev.concat(current)
      }
      return prev
    }, [])
    let lastGpa
    if (gpas.length) {
      lastGpa = gpas[gpas.length - 1]
    }

    const failedSubjects = allUniqueSubjects.reduce((prev, current) =>
      prev + (current.subject_state === 'fail' ? 1 : 0), 0)
    const successSubjects = allUniqueSubjects.reduce((prev, current) =>
      prev + (current.subject_state === 'success' ? 1 : 0), 0)

    if (!lastHistory) return false

    return (<div className='text-xs-center'>
      <div className='row p-y-3'>
        <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
          <h4>إنتبه لقد رسبت في الفصل</h4>
          <p>
          يؤسفنا ان نخبرك أنك لم تنجح في {lastHistory.semester && lastHistory.semester.name} حيث حصلت على
          </p>
          <div className='clearfix m-t-3' />
          <div className='col-xs-6 col-md-3'>
            <p>لقد نجحت في</p>
            <h2 className='text-warning'><b>{subjectNumberToString(successSubjects)}</b></h2>
          </div>
          <div className='col-xs-6 col-md-3'>
            <p>و رسبت في</p>
            <h2 className='text-warning'><b>{subjectNumberToString(failedSubjects)}</b></h2>
          </div>
          <div className='col-xs-6 col-md-3'>
            <p>حصلت على مجموع</p>
            <h2 className='text-warning'><b>
              {lastGpa ? lastGpa.points : 0}
            </b></h2>
          </div>
          <div className='col-xs-6 col-md-3'>
            <p>معدلك التراكمي</p>
            <h2 className='text-warning'><b>
                {lastGpa ? lastGpa.gpa : 0}
            </b></h2>
          </div>
        </div>
      </div>
      {nextSemesterMoment ? <footer className={`${classes['footer']} p-y-1`}>
        {
          nextSemesterMoment ? `${nextSemester.name} سينطلق يوم
          ${nextSemesterMoment.locale('en').format('DD')}
          ${nextSemesterMoment.locale('ar-SA').format('MMMM')}
          ${nextSemesterMoment.locale('en').format('YYYY')}` : ''
        }
      </footer> : null}
    </div>
    )
  }
}

export default FailState
