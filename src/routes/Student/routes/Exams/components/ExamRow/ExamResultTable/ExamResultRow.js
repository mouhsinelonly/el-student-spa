// @flow
import * as React from 'react'
import { degreeNumberToString } from 'utils'
import Icon from 'components/Icon'
import './row.scss'

const dontShowVideoNotesIds = []

let complaintTexts = {
  waiting: 'جاري المراجعة',
  accepted: 'مقبول',
  refused: 'مرفوض',
  uncomplete: 'غير مكتمل',
  complete: 'مكتمل'
}

type PropsType = {
  exam: Object,
  onCheckExam: Function,
  showModal: Function,
  checked: boolean
};

class ExamResultRow extends React.Component<PropsType> {
  static defaultProps = {
    grade: 0
  }
  render (): React.Element<'div'> {
    const { exam: { attended, name, complaintStatus, monitor_notes_ids: monitorNotesIds,
      video_valuated : evaluated,
      excuseStatus, recordings, type, grade, cheatNote, cheatGrade,
      noCheatGrade, complaintGrade }, checked } = this.props
    // const startAt = moment(start_at)
    // const newGrade = typeof grade === 'undefined' || grade === null ? 0 : grade
    const excusesEnabled = false // type === 'final'
    const canComplain = false /* grade !== null && typeof grade !== 'undefined' && (complaintStatus === null ||
    typeof complaintStatus === 'undefined') && (excuseStatus === null ||
    typeof excuseStatus === 'undefined') && type === 'final' */
    const notesIds = (monitorNotesIds !== null && typeof monitorNotesIds !== 'undefined')
    ? monitorNotesIds.split(',')
    : []
    // console.log(notesIds.map(n => {console.log(parseInt(n))}))
    const shouldShowVideo = !notesIds.some((n: string): boolean =>
      dontShowVideoNotesIds.findIndex((i: number): boolean => i === parseInt(n)) >= 0)
    // const finishAt = moment(finish_at)
    const hasComplaint = complaintStatus !== null && typeof complaintStatus !== 'undefined'
    const hasExcuse = excuseStatus !== null && typeof excuseStatus !== 'undefined'
    // const duration = moment.duration(finishAt.diff(startAt)).asMinutes()
    let buttonClass = ''
    switch (complaintStatus) {
      case 'waiting':
        buttonClass = 'info'
        break
      case 'accepted':
        buttonClass = 'success'
        break
      case 'refused':
        buttonClass = 'danger'
        break
      case 'uncomplete':
        buttonClass = 'warning'
        break
    }

    // let gradeFrom = 0
    // switch (type) {
    //   case 'midterm':
    //     gradeFrom = 20
    //     break
    //   case 'activity':
    //     gradeFrom = 5
    //     break
    // }

    if (complaintStatus === 'accepted') {
      complaintTexts.accepted = `تم ترحيل ${degreeNumberToString(complaintGrade)} إلى الامتحان النهائي`
    }
    return (<div className={`c-exam-row-complaint-element text-xs-center p-y-2
      ${canComplain ? 'can-checked' : ''}
      ${checked ? 'is-checked' : ''}`}
      onClick={canComplain ? this._check : this._doNothing}>
      <div className={`col-xs-12 col-md-3 col-lg-4`}>
        <strong>{name}</strong>
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-1`}>
        {(!evaluated && type === 'midterm') || hasExcuse
        ? null
        : <strong className='text-info' >{noCheatGrade}</strong>}
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-1`}>
        {(!evaluated && type === 'midterm') || hasExcuse
      ? null
      : <strong className={cheatGrade < 0 ? 'text-danger' : ''} >{cheatGrade}</strong> }
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-1 `}>
        {(!evaluated && type === 'midterm') || hasExcuse ? null : <strong className='text-success' >{grade}</strong>}
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-3`}>
        {(!evaluated && type === 'midterm') ? null : <span className={`text text-${buttonClass}`}>
          {complaintTexts[complaintStatus]}
        </span>}
        {!evaluated && type === 'midterm' ? 'ستظهر النتيجة بعد الانتهاء من مراجعة فيديو الاختبار' : null}
        {excuseStatus === 'accepted' ? <span className='text-success'>غياب بعذر مقبول</span> : ''}
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-5 text-danger ${(!cheatNote) ? 'hidden-xs-up' : ''}`}>
        {(!evaluated && type === 'midterm') ? null : cheatNote}
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-3 text-xs-center ${(!canComplain) ? 'hidden-xs-up' : ''}`}>
        <Icon name={`checkbox-${checked ? 'checked' : 'unchecked'}`} />
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-3 text-xs-center
        ${((canComplain && !hasExcuse) || hasComplaint || !excusesEnabled || !evaluated) ? 'hidden-xs-up' : ''}`}>
        <span className={`text-success ${!hasExcuse ? 'hidden-xs-up' : ''}`}>قمت بتقديم عذر</span>
        <span className={`text-info ${hasExcuse ? 'hidden-xs-up' : ''}`}>يقدم في الاعذار</span>
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-3 text-xs-center
        ${((type !== 'midterm') || (type === 'midterm' && !evaluated) || !shouldShowVideo || hasExcuse || !attended)
        ? 'hidden-xs-up'
        : ''}`}>
        {
          recordings !== null ? <span onClick={this._showVideoModal}
            className='material-icons' style={{ cursor: 'pointer' }} >play_circle_filled</span> : null
        }
      </div>
    </div>)
  }

  _showVideoModal = () => {
    const { showModal, exam: { recordings } } = this.props
    showModal('playrecordings', { streams: recordings }, true, true, 'full')
  }

  _check = () => {
    const { onCheckExam, exam: { id } } = this.props
    onCheckExam(id)
  }

  _doNothing () {}
}

export default ExamResultRow
