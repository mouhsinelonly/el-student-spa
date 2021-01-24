import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

import './style.scss'
import {subjectNumberToString} from 'utils'
import moment from 'moment'

class SuccessState extends Component {
  static propTypes = {
    terms: PropTypes.array,
    gpas: PropTypes.array,
    semesters: PropTypes.array,
    profile: PropTypes.object
  }
  static defaultProps = {
    semesters: [],
    gpas: [],
    terms: [],
    profile: {}
  }
  render () {
    const {terms, gpas, semesters, profile: {semester}} = this.props
    const allSubjects = terms.reduce((prev, current) => {
      // console.log(current.semester_id, semester.id)
      return parseInt(current.semester_id, 10) === parseInt(semester.id, 10) ? prev.concat(current.subjects) : prev
    }, [])
    const allUniqueSubjects = allSubjects.reverse().reduce((prev, current) => {
      if (prev.findIndex(s => s.subject_id === current.subject_id) < 0) {
        return prev.concat(current)
      }
      return prev
    }, [])
    let lastGpa
    if (gpas.length) {
      lastGpa = gpas.find(g => g.semester_id === semester.id)
      // lastGpa = gpas[gpas.length - 1]
    }
    // console.log(semester)
    const failedSubjects = allUniqueSubjects.reduce((prev, current) =>
      prev + (current.subject_state === 'fail' ? 1 : 0), 0)
    const successSubjects = allUniqueSubjects.reduce((prev, current) =>
      prev + (current.subject_state === 'success' ? 1 : 0), 0)

    const currentGrade = terms.find((g, i) => i === terms.length - 1)
    const currentGpa = gpas.find((g, i) => i === gpas.length - 1)
    const currentSemester = semesters.find(s => s.id === semester.id)
    // console.log(semesters)
    const nextSemester = semesters.find(s => s.id > semester.id)

    let nextSemesterMoment
    if (nextSemester) {
      nextSemesterMoment = moment(nextSemester.start_at)
    }

    if (!currentGpa || !currentSemester || !currentGrade) return false

    return <div>
      <div className='p-y-3 text-xs-center'>
        <h3>مبروك عليك النجاح</h3>
        <p>
          يسعدنا أن نهنئك على نجاحك في {currentSemester.name} للسنة {currentGrade.year_name}
        </p>
        <div className='row m-t-3'>
          <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
            <div className='c-success-state__grades'>
              <div className={`col-xs-6 col-md-4 p-b-3 c-success-state__grades__item`}>
                <p>لقد نجحت في</p>
                <h2 className='text-success'><b>{subjectNumberToString(successSubjects)}</b></h2>
              </div>
              <div className={`col-xs-6 col-md-4 p-b-3 is-middle c-success-state__grades__item`}>
                <p>و رسبت في</p>
                <h2 className='text-success'><b>{subjectNumberToString(failedSubjects)}</b></h2>
              </div>
              <div className={`hidden-xs-up col-xs-6 col-md-4 p-b-3 c-success-state__grades__item`}>
                <p>حصلت على مجموع</p>
                <h2 className='text-success'><b>
                  {lastGpa ? lastGpa.points : 0}
                </b></h2>
              </div>
              <div className={`col-xs-6 col-md-4 p-b-3 c-success-state__grades__item`}>
                <p>معدلك التراكمي</p>
                <h2 className='text-success'><b>
                  {lastGpa ? lastGpa.gpa : 0}
                </b></h2>
              </div>
            </div>
            <Link to='/student/results'
              className={`btn btn-gray btn-curved p-x-2 c-success-state__more-details`}>تفاصيل آكثر</Link>
            <div className='clearfix' />
            {failedSubjects ? <div className='btn btn-success-outline p-x-3 m-t-3'>
              ستدرس المواد التي رسبت فيها في الفصل الصيفي
            </div> : null }
          </div>
        </div>
      </div>
       {nextSemesterMoment ? <footer className='c-success-state__footer p-y-1 text-xs-center'>
        {
          nextSemesterMoment ? `${nextSemester.name} سينطلق يوم
          ${nextSemesterMoment.locale('en').format('DD')}
          ${nextSemesterMoment.locale('ar-SA').format('MMMM')}
          ${nextSemesterMoment.locale('en').format('YYYY')}` : ''
        }
       </footer> : null}
    </div>
  }
}

export default SuccessState
