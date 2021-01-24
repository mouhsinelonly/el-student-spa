import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './style.scss'

class ExamScheduleTable extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    exams: PropTypes.array
  }
  render () {
    const { exams, visible, type } = this.props

    return (<div className={`${!visible && 'hidden-xs-up'} text-xs-center `}>
      {exams.map((e, i) => {
        if (e.type === type) {
          const startAt = moment(e.start_at)
          const finishAt = moment(e.finish_at).locale('en')
          return <div className='p-y-2 c-exam-schedule-row clearfix' key={i}>
            <div className='col-xs-3 '>
              <b>{e.name}</b>
            </div>
            <div className='col-xs-3'>
              {startAt.format('dddd') + ' ' +
            startAt.locale('en').format('DD') + ' ' +
          startAt.locale('ar-SA').format('MMMM') + ' ' +
          startAt.locale('en').format('YYYY')}</div>
            <div className='col-xs-3'>
                  من {startAt.format('hh:mm')} {startAt.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساء'}
            </div>
            <div className='col-xs-3'>
                  إلى {finishAt.format('hh:mm')} {finishAt.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساء'}
            </div>
          </div>
        }
      })
    }
      <div className='c-general-exam-row__f p-y-2'>
          المرجو الإلتزام بالتواريخ و التواقيت المعروضة علمًا بأن التوقيت المعتمد هو توقيت سلطنة عمان فيرجى مراعاة فارق التوقيت
      </div>
    </div>)
  }
}

export default ExamScheduleTable
