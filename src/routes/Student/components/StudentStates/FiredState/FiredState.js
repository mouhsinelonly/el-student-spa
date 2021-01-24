import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './style.scss'
import {subjectNumberToString} from 'utils'

class FiredState extends Component {
  static propTypes = {
    terms: PropTypes.array,
    gpas: PropTypes.array
  }
  static defaultProps = {
    terms: [],
    gpas: []
  }
  render () {
    const {terms, gpas} = this.props
    const allSubjects = terms.reduce((prev, current) => {
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

    return (<div>
      <div className='text-xs-center p-y-3'>
        <h3>نعتذر لقد تم فصلك</h3>
        <p>
        يوسفنا ان نخبرك انه تم فصلك لحصولك على معدل تراكمي ضعيف٫ وقد تحصلت على
        </p>
        <div className='row m-t-3'>
          <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
            <div className='col-xs-6 col-md-4'>
              <p>لقد نجحت في</p>
              <h2 className='text-warning'><b>{subjectNumberToString(successSubjects)}</b></h2>
            </div>
            <div className='col-xs-6 col-md-4'>
              <p>و رسبت في</p>
              <h2 className='text-warning'><b>{subjectNumberToString(failedSubjects)}</b></h2>
            </div>
            <div className='col-xs-6 col-md-4'>
              <p>معدلك التراكمي</p>
              <h2 className='text-warning'><b>
                {lastGpa ? lastGpa.gpa : 0}
              </b></h2>
            </div>
          </div>
        </div>
      </div>
      <div className={`text-xs-center ${classes['form']} shadow-1`}>
        <div className='p-y-3'>
          <h1 className={`${classes['form__title']} m-b-3`}>
            هل يمكنك مساعدتنا في معرفة رآيك حول تجربتك في التعليم عن بعد ؟
          </h1>
          <a href='' className='btn btn-success p-x-3 p-y-1'>
            نعم إبدأ الآن
          </a>
        </div>
      </div>
    </div>)
  }
}

export default FiredState
