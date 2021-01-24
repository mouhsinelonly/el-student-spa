import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import moment from 'moment'
import Icon from 'components/Icon'
import { dayNumberToString } from 'utils'
import { Link } from 'react-router'

class ActivityBlock extends Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    available: PropTypes.bool,
    submitted: PropTypes.number,
    evaluated: PropTypes.number,
    savingIds: PropTypes.array,
    serverdate: PropTypes.string,
    grade_notes: PropTypes.string,
    grade_value: PropTypes.number,
    start_at: PropTypes.string,
    edit_finish_at: PropTypes.string,
    notesVisible: PropTypes.array,
    toggleNotesVisiblity: PropTypes.func,
    finish_at: PropTypes.string
  }
  constructor (props) {
    super(props)

    this._toggleNotes = this._toggleNotes.bind(this)
  }
  render () {
    const { id, title, start_at: startAt, finish_at: finishAt, available, serverdate,
      submitted, evaluated, grade_value: gradeValue, grade_notes: gradeNotes, notesVisible, savingIds, edit_finish_at } = this.props

    // console.log(edit_finish_at, 'sdfd')
    const notesIsVisible = notesVisible.findIndex(i => i === id) >= 0
    const startAtMoment = moment(startAt)
    const finishAtMoment = moment(finishAt)
    const serverTime = moment(serverdate)
    const daysToFinish = finishAtMoment.diff(serverTime, 'days')
    let actionLabel = ''
    const saving = savingIds.findIndex(i => i === id) >= 0

    if (submitted && !evaluated) {
      actionLabel = 'جاري تقييم النشاط'
    } else if (submitted && evaluated) {
      actionLabel = 'التقييم'
    } else {
      actionLabel = 'المطلوب منك'
    }
    return (
      <div className='c-activity-block shadow-1 my-panel-white'>
        <div className='col-xs-12 col-md-5 p-y-2 c-activity-block__content'>
          <Icon name='research-activity c-activity-block__icon' />
          <h3 className='c-activity-block__title p-t-1'>
            {title}
          </h3>
          <Link to={`/student/research/details/${id}`}
            className={`${!available && 'hidden-xs-up'} btn btn-sm btn-light`}>
            تفاصيل النشاط
          </Link>
        </div>
        <div className='col-xs-12 col-md-3 p-y-2 c-activity-block__dates'>
          <div className={`${available && 'hidden-xs-up'} p-b-1`}>يبدأ {startAtMoment.format('DD MMMM')}</div>
          <div className={`${available && 'hidden-xs-up'}`}>
            ينتهي {finishAtMoment.format('DD MMMM')}
          </div>
          <div className={`${!available && 'hidden-xs-up'} p-b-1`}>
            جاري حاليا
          </div>
          <div className={`${!available && 'hidden-xs-up'}`}>
            ينتهي بعد <b>{dayNumberToString(daysToFinish)}</b>
          </div>
        </div>
        <div className='col-xs-12 col-md-4 p-y-2 c-activity-block__actions'>
          <div className='c-activity-block__actions-meta p-b-1'>
            {actionLabel}
          </div>
          <Link to={`/student/research/details/${id}`}
            className={`${(available || submitted) && 'hidden-xs-up'} btn btn-dark-gray btn-block`}>
            الإطلاع على تفاصيل النشاط
          </Link>
          <Link to={`/student/research/form/${id}`} className={`${(!available || saving)
            ? 'hidden-xs-up' : ''} btn btn-success btn-block`}>
            {submitted !== null ? 'تعديل و إتمام النشاط' : 'انجاز النشاط'}
          </Link>
          <Link to={`/student/research/form/${id}`} className={`${(available || evaluated) &&
            'hidden-xs-up'} btn btn-sm btn-light`}>
            تصفح النشاط
          </Link>
          <span className='text-success c-activity-block__grade'>
            {gradeValue}
          </span>
          <button onClick={this._toggleNotes}
            className={`${!evaluated && 'hidden-xs-up'} btn btn-sm btn-light pull-xs-left`}>
            الملاحظة
          </button>
        </div>
        <div className='clearfix' />
        <div className={`${!notesIsVisible && 'hidden-xs-up'} c-activity-block__notes`}>
          <div className='col-xs-12 p-a-2'>
            <h1 className='c-activity-block__notes-title p-b-0'>
              <b>ملاحظة المدرس</b>
            </h1>
            <p className='c-activity-block__notes-text'>
              {gradeNotes}
            </p>
            <Link to={`/student/research/details/${id}`} className='btn btn-sm btn-light'>
              تصفح النشاط
            </Link>
          </div>
        </div>

        <div className='clearfix' />
      </div>
    )
  }

  _toggleNotes () {
    const { id, toggleNotesVisiblity } = this.props
    toggleNotesVisiblity(id)
  }
}

export default ActivityBlock
