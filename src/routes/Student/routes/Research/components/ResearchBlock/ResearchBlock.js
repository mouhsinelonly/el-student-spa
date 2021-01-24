import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import moment from 'moment'
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import { dayNumberToString } from 'utils'
import { Link } from 'react-router'
import DropZone from 'react-dropzone'

class ResearchBlock extends Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    upload: PropTypes.object,
    available: PropTypes.bool,
    evaluated: PropTypes.number,
    uploadResearch: PropTypes.func,
    savingIds: PropTypes.array,
    uploadedActivities: PropTypes.array,
    serverdate: PropTypes.string,
    uploading: PropTypes.bool,
    grade_notes: PropTypes.string,
    grade_value: PropTypes.number,
    start_at: PropTypes.string,
    edit_finish_at: PropTypes.string,
    notesVisible: PropTypes.array,
    toggleNotesVisiblity: PropTypes.func,
    finish_at: PropTypes.string
  }

  render () {
    const { id, title, uploading, start_at: startAt, finish_at: finishAt, available, serverdate
      , evaluated, upload: uploaded, grade_value: gradeValue, grade_notes: gradeNotes,
      notesVisible, savingIds, uploadedActivities, events, edit_finish_at } = this.props

    const fileUploadedSuccess = uploadedActivities.findIndex(i => i === id) >= 0
    const notesIsVisible = notesVisible.findIndex(i => i === id) >= 0
    const startAtMoment = moment(startAt)
    const finishAtMoment = moment(finishAt)
    const editFinishAtMoment = moment(edit_finish_at)
    const serverTime = moment(serverdate)
    const daysToFinish = finishAtMoment.diff(serverTime, 'days')
    const daysToEditFinish = editFinishAtMoment.diff(serverTime, 'days')
    let actionLabel = ''
    const saving = savingIds.findIndex(i => i === id) >= 0

    let editEnabled = true
    let resultsEnabled = false
    if (editFinishAtMoment.isBefore(serverdate)) {
      editEnabled = false
    }

    const resultEvent = events.find((e: Object): boolean => e.category === 'result')
    if (resultEvent) {
      const serverTime = moment(serverdate)
      const resultEventStartAt = moment(`${resultEvent.start_at} ${resultEvent.time_start_at}`)
      const resultEventFinishAt = moment(`${resultEvent.finish_at} ${resultEvent.time_finish_at}`)
      if (resultEventStartAt.isBefore(serverTime) && resultEventFinishAt.isAfter(serverTime)) {
        resultsEnabled = true
      }
    }

    if (uploaded && !evaluated) {
      actionLabel = 'جاري تقييم البحث'
    } else if (uploaded && evaluated) {
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
            تفاصيل البحث
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
            {uploaded ? 'ينتهي التعديل بعد' : 'ينتهي الرفع بعد'} <b>{uploaded ? dayNumberToString(daysToEditFinish) : dayNumberToString(daysToFinish)}</b>
          </div>
        </div>
        <div className='col-xs-12 col-md-4 p-y-2 c-activity-block__actions'>
          <div className='c-activity-block__actions-meta p-b-1'>
            {actionLabel}
          </div>
          <Link to={`/student/research/details/${id}`}
            className={`${(available || uploaded) && 'hidden-xs-up'} btn btn-dark-gray btn-block`}>
            الإطلاع على متطلبات البحث
          </Link>
          {uploading ? <Loading /> : null}
          <DropZone multiple={false} onDrop={this._uploadFile} style={{}}
            className={`${uploading === true && 'hidden-xs-up'}
           c-activity-block__dropzone`}>
            <button className={`${(!available || saving || evaluated || (!editEnabled && uploaded)) &&
              'hidden-xs-up'} btn btn-success btn-block`}>
              {uploaded !== null ? 'إعادة رفع البحث' : 'رفع البحث'}
            </button>
          </DropZone>
          {(!editEnabled && uploaded) ? <button className='btn btn-success btn-block' disabled>
            انتهت فترة تعديل البحث
          </button> : null}
          <a href={uploaded ? uploaded.file : null} target='_blank'
            className={`${(!available || evaluated || !uploaded) &&
            'hidden-xs-up'} btn btn-sm btn-light`}>
            تصفح البحث
          </a>
          <span className={`text-success c-activity-block__grade ${!resultsEnabled && 'hidden-xs-up'}`}>
            {gradeValue}
          </span>
          <button onClick={this._toggleNotes}
            className={`${!evaluated && 'hidden-xs-up'} 
            ${!resultsEnabled && 'hidden-xs-up'} btn btn-sm btn-light pull-xs-left`}>
            الملاحظة
          </button>
        </div>
        <div className='clearfix' />
        <div className={`${!notesIsVisible && 'hidden-xs-up'} 
        ${!resultsEnabled && 'hidden-xs-up'} c-activity-block__notes`}>
          <div className='col-xs-12 p-a-2'>
            <h1 className='c-activity-block__notes-title p-b-0'>
              <b>ملاحظة المدرس</b>
            </h1>
            <p className='c-activity-block__notes-text'>
              {gradeNotes}
            </p>
            <a href={uploaded ? uploaded.file : null} target='_blank' className='btn btn-sm btn-light'>
              تصفح البحث
            </a>
          </div>
        </div>
        <div className={`${!fileUploadedSuccess && 'hidden-xs-up'} text-xs-center p-a-3 c-activity-block__uploaded`}>
          <Icon name='checkmark-outline-medium-green' />
          <h5 className='p-t-2'>تم رفع الملف بنجاح</h5>
        </div>
        <div className='clearfix' />
      </div>
    )
  }
  _uploadFile = (files) => {
    const { id, uploadResearch } = this.props
    uploadResearch(files, id)
  }
  _toggleNotes = () => {
    const { id, toggleNotesVisiblity } = this.props
    toggleNotesVisiblity(id)
  }
}

export default ResearchBlock
