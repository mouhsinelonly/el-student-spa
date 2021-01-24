// @flow
import * as React from 'react'
import { degreeNumberToString } from 'utils'
import { Link } from 'react-router'
import Icon from 'components/Icon'
import './ExamResultRowV2.scss'

const dontShowVideoNotesIds = []
// const dontShowVideoNotesIds = [24, 25, 26, 27, 49]
let complaintTexts = {
  waiting: 'جاري المراجعة',
  accepted: 'مقبول',
  refused: 'مرفوض',
  uncomplete: 'غير مكتمل',
  complete: 'مكتمل'
}

type PropsType = {
  exam: Object,
  recordingPlaintsLoading: boolean,
  recordingPlaints: Array<Object>,
  onCheckExam: Function,
  showModal: Function,
  checked: boolean,
  videoPlaintEnabled: boolean
};

class ExamResultRowV2 extends React.Component<PropsType> {
  static defaultProps = {
    grade: 0
  }
  render (): React.Element<'div'> {
    const { exam: { id, attended, name, complaintStatus, monitor_notes_ids: monitorNotesIds,
      video_valuated : evaluated,
      excuseStatus, recordings, type, grade, cheatNote, cheatGrade,
      noCheatGrade, complaintGrade }, checked, recordingPlaintsLoading,
      recordingPlaints, videoPlaintEnabled } = this.props
    // const startAt = moment(start_at)
    // const newGrade = typeof grade === 'undefined' || grade === null ? 0 : grade
    const excusesEnabled = false // type === 'final'
    const canComplain = false /* grade !== null && typeof grade !== 'undefined' && (complaintStatus === null ||
    typeof complaintStatus === 'undefined') && (excuseStatus === null ||
    typeof excuseStatus === 'undefined') && type === 'final' */
    const notesIds = (monitorNotesIds !== null && typeof monitorNotesIds !== 'undefined')
    ? monitorNotesIds.split(',')
    : []

    const plaint = recordingPlaints.find((p: Object): boolean => p.exam_id === id)

    const shouldShowVideo = !notesIds.some((n: string): boolean =>
      dontShowVideoNotesIds.findIndex((i: number): boolean => i === parseInt(n)) >= 0)
    // const finishAt = moment(finish_at)
    const hasComplaint = complaintStatus !== null && typeof complaintStatus !== 'undefined'
    const hasExcuse = excuseStatus !== null && typeof excuseStatus !== 'undefined'

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

    const didCheat = cheatGrade < 0
    if (complaintStatus === 'accepted') {
      complaintTexts.accepted = `تم ترحيل ${degreeNumberToString(complaintGrade)} إلى الامتحان النهائي`
    }

    const hasAcceptedPlaint = plaint && plaint.status === 'accepted'
    const hasAcceptedPartialPlaint = plaint && plaint.status === 'accepted_partial'
    const hasRefusedPlaint = plaint && plaint.status === 'refused'
    const cheatPercentage = Math.round((-cheatGrade / noCheatGrade) * 100)

    return (<div className={`c-exam-row-complaint-element text-xs-right text-md-center p-y-2
      ${canComplain ? 'can-checked' : ''}
      ${checked ? 'is-checked' : ''}`}
      onClick={canComplain ? this._check : this._doNothing}>
      <div className={`col-xs-6 col-md-8`}>
        <strong>{name}</strong>
      </div>
      <div className={`col-xs-6 col-md-4 text-xs-left text-md-right c-exam-row-complaint-element__grade-container`}>
        {(!evaluated && type === 'midterm') || (hasExcuse && excuseStatus !== 'refused')
        ? null
        : <strong className={`${didCheat ? 'text-warning' : 'text-success'}`} >

          <span className={`${didCheat ? '' : 'hidden-xs-up'} c-exam-row-complaint-element__original-grade`}>
            <i className='material-icons'>info</i>({noCheatGrade})
          </span> {grade}
          <div className={`${didCheat ? '' : 'hidden-xs-up'} clearfix shadow-1 c-grade-info`}>
            <div className='col-xs-6'><div>قبل الخصم</div>
              <b style={{ fontSize: 16 }}>{noCheatGrade}</b></div>
            <div className='col-xs-6'><div>بعد الخصم</div>
              <b className='text-warning' style={{ fontSize: 16 }}>{grade}</b></div>
          </div>
        </strong>}
      </div>
      <div className={`col-xs-12`}>
        {(!evaluated && type === 'midterm') ? null : <span style={{ fontSize: 14, color: '#50555a' }}>
          {complaintTexts[complaintStatus]}
        </span>}
        {!evaluated && type === 'midterm' ? 'ستظهر النتيجة بعد الانتهاء من مراجعة فيديو الاختبار' : null}
        {excuseStatus === 'accepted' ? <span className='text-success'>غياب بعذر مقبول</span> : ''}
      </div>

      <div className={`col-xs-12 col-md-2 col-lg-3 text-xs-center ${(!canComplain) ? 'hidden-xs-up' : ''}`}>
        <Icon name={`checkbox-${checked ? 'checked' : 'unchecked'}`} />
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-3 text-xs-center
        ${((canComplain && !hasExcuse) || hasComplaint || !excusesEnabled || !evaluated) ? 'hidden-xs-up' : ''}`}>
        <span className={`text-success ${!hasExcuse ? 'hidden-xs-up' : ''}`}>قمت بتقديم عذر</span>
        <span className={`text-info ${hasExcuse ? 'hidden-xs-up' : ''}`}>يقدم في الاعذار</span>
      </div>
      <div className={`col-xs-12 m-y-2 text-xs-center
        ${((!['midterm', 'final', 'summer'].includes(type)) || (type === 'midterm' && !evaluated) || !shouldShowVideo ||
          (hasExcuse && excuseStatus !== 'refused') || !attended)
        ? 'hidden-xs-up'
        : ''}`}>
        { recordings !== null && didCheat && (!(plaint && plaint.status === 'accepted'))
          ? <button onClick={this._showVideoModal}
            className='btn btn-white p-y-0 p-x-1'>
            <Icon name='play-black-tiny' className='m-l-1' /> الفيديو
          </button>
          : null }
        { (didCheat && videoPlaintEnabled && ((type === 'midterm') || (['final', 'summer'].includes(type) && cheatPercentage >= 40)))
          ? <RecordingPlaint {...plaint} examId={id} loading={recordingPlaintsLoading} />
          : null }
        { (didCheat && !videoPlaintEnabled)
          ? <RecordingPlaintFinished {...plaint} examId={id} loading={recordingPlaintsLoading} />
          : null }
      </div>
      <div className={`${hasAcceptedPartialPlaint ? '' : 'hidden-xs-up'} text-xs-center`} style={{ fontSize: 14 }}>
        <span>بعد مراجعة اللجنة تقرر قبول الشكوى جزئيا {(typeof plaint === 'undefined' || +plaint.old_grade === 0) ? null : 'و إعتماد'}</span>
        {(typeof plaint === 'undefined' || +plaint.old_grade === 0) ? null : <div className='text-success font-weight-bold'>
          إعادة { degreeNumberToString(plaint ? parseFloat(-plaint.old_grade - -plaint.new_grade).toFixed(2) : 0) }
          من أصل {plaint && -plaint.old_grade}
        </div>}
      </div>
      <div className={`col-xs-12 text-xs-center text-danger ${(!cheatNote) || !didCheat || hasAcceptedPlaint ||
        hasAcceptedPartialPlaint ? 'hidden-xs-up' : ''}`}>
        <div style={{ fontSize: 14, color: '#50555a' }}>
          {hasRefusedPlaint ? 'بعد مراجعة اللجنة تم رفض الشكوى و تم إعتماد' : ''}
        </div>
        <span className='text-warning font-weight-bold'>
          {hasRefusedPlaint ? '' : 'تم'} خصم {degreeNumberToString(-cheatGrade)} </span>
        <span style={{ fontSize: 14, color: '#50555a' }}>
          بسبب {(!evaluated && type === 'midterm') ? null : cheatNote}
        </span>
      </div>
    </div>)
  }

  _showVideoModal = () => {
    const { showModal, exam: { recordings } } = this.props
    showModal('playrecordings', { streams: recordings }, true, true, 'medium')
  }

  _check = () => {
    const { onCheckExam, exam: { id } } = this.props
    onCheckExam(id)
  }

  _doNothing () {}
}

type RecordingPlaintType = {
  loading: boolean,
  status: string,
  examId: number,
  id: number
};

const PlaintStatuses = {
  'waiting': {
    'button': 'info-light',
    'text': 'جاري المراجعة'
  },
  'accepted': {
    'button': 'success-light',
    'text': 'تم قبول و إعادة الدرجات المخصومة'
  },
  'accepted_partial': {
    'button': 'success-light',
    'text': 'قبول جزئي'
  },
  'refused': {
    'button': 'warning-light',
    'text': 'تم رفض الشكوى'
  },
  'undefined': {
    'button': 'white',
    'text': 'تقديم شكوى'
  }
}

const RecordingPlaintFinished = (props: RecordingPlaintType): React.Element<'button'> =>
  !props.loading && typeof props.id === 'undefined'
  ? null
  : <button className={`btn btn-${PlaintStatuses[props.status]['button']}  p-y-0 p-x-1 m-r-1`}
    style={{ cursor: 'default' }}>
    {PlaintStatuses[props.status]['text']}
  </button>

const RecordingPlaint = (props: RecordingPlaintType): React.Element<'button'> =>
  !props.loading && typeof props.id === 'undefined'
  ? (typeof props.id === 'undefined'
  ? <Link to={{ pathname: '/student/exams/recording_plaint', query: { id: props.examId } }}
    className={`btn btn-${PlaintStatuses[props.status]['button']}  p-y-0 p-x-1 m-r-1`}>
    {PlaintStatuses[props.status]['text']}
  </Link> : null)
  : <button className={`btn btn-${PlaintStatuses[props.status]['button']}  p-y-0 p-x-1 m-r-1`}
    style={{ cursor: 'default' }}>
    {PlaintStatuses[props.status]['text']}
  </button>

export default ExamResultRowV2
