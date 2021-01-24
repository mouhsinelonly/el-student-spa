// @flow
import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { extendExamTime } from 'routes/Users/modules/students'
import Modal from 'react-responsive-modal'
import './style.scss'

const types = [
  { type: 'activity', title: 'القصير' },
  { type: 'midterm', title: 'منتصف' },
  { type: 'final', title: 'نهائي' },
  { type: 'summer', title: 'صيفي' }
]
type PropsType = {
  exams: Array<Object>,
  visibleType: string,
  studentId: number,
  toggleType: Function,
  showModal: Function
};
const StudentExams = ({ exams, visibleType, studentId, showModal, toggleType }: PropsType): React.Element<'div'> => {
  const minutesReference = useRef()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [examId, setExamId] = useState(0)
  const openModal = ({ examId }: Object): Function => {
    setExamId(examId)
    setOpen(true)
  }

  const onExtendClick = () => {
    if (!minutesReference.current) {
      return
    }
    dispatch(extendExamTime({
      studentId,
      examId,
      minutes: minutesReference.current.value ? +minutesReference.current.value : 0
    }))
    setOpen(false)
  }
  const _onTypeChanged = (e: Object) => {
    toggleType(e.target.value)
  }
  return (
    <div className='v2-ticket-student-exams p-b-2'>
      <h1 className='v2-ticket-student-exams__title is-active p-y-2 p-x-2'>
        الاختبارات
        <select className='v2-ticket-student-exams__type pull-xs-left'
          onChange={_onTypeChanged} value={visibleType}>
          {types.map((t: Object): React.Element<'option'> =>
            <option key={t.type} value={t.type}>{t.title}</option>)}
        </select>
      </h1>
      <div className='clearfix' />
      <Modal open={open} onClose={(): Function => setOpen(false)} center>
        <input type='text' ref={minutesReference} className='form-control' />
        <button type='button' onClick={onExtendClick} className='m-t-2 btn btn-primary'>إرسال تمديد</button>
      </Modal>
      {exams.filter((e: Object): boolean => e.type === visibleType)
        .map((e: Object): Object => <ExamRow openExtend={openModal} showModal={showModal} {...e} key={e.id} />)}
    </div>)
}
type ExamType = {
  name: string,
  attended: number,
  uploaded: number,
  finish_at: string,
  recordings: string,
  excused: number,
  id: number,
  type: string,
  start_at: string,
  openExtend: Function,
  showModal: Function,
  total_answers: number
};

const ExamRow = ({ showModal,
  recordings,
  openExtend,
  name,
  id,
  type,
  attended,
  excused,
  uploaded,
  finish_at: finishAt,
  start_at: startAt,
  total_answers: total = 0
}: ExamType): React.Element<'div'> => {
  const _showModal = () => {
    showModal('playrecordings', { streams: recordings }, true, true, 'medium')
  }
  let status = '--'
  let statusClass = ''
  let uploadStatus = '--'
  let totalAnswersStatus = '--'
  let uploadClass = ''
  const finishAtMoment = moment(finishAt)
  const startAtMoment = moment(startAt)
  const examPassed = finishAtMoment.isBefore(moment())
  const examStarted = startAtMoment.isBefore(moment())
  // console.log(examStarted)
  if (attended) {
    status = 'حضر'
    statusClass = 'text-success'
    totalAnswersStatus = `تم حل ${total || 0}`
  } else if (excused) {
    status = 'اعتذر'
    statusClass = 'text-success'
  } else if (examPassed) {
    status = 'تغيب'
    statusClass = 'text-danger'
  }
  if (uploaded) {
    uploadStatus = 'مرفوع'
    uploadClass = 'text-success'
  } else if (attended) {
    uploadStatus = 'لم يرفع'
    uploadClass = 'text-warning'
  }
  const examIsToday = startAtMoment.isSame(moment(), 'day')
  const startFormat = `${startAtMoment.locale('en-us').format('D')}
  ${startAtMoment.locale('ar-SA').format(' MMMM ')}
  | ${startAtMoment.locale('en-us').format(' h:mm ')}
  ${startAtMoment.locale('en-us').format('a') === 'am' ? 'صباحا' : 'مساءا'}`
  return (<div>
    <div data-rh={`${name} \n ${startFormat}`} data-rh-at='right'
      className='col-xs-4 v2-ticket-student-exams__item text-nowrap p-b-1'>
      {examIsToday ? <i className='text-success material-icons' style={{ display: 'inline-block', verticalAlign: 'middle' }}>room</i> : ''} {name}
    </div>
    <div className='col-xs-8'>
      <table width='100%' >
        <tbody>
          <tr>
            <td className={`${statusClass} v2-ticket-student-exams__info`}>{status}</td>
            <td className={`v2-ticket-student-exams__info ${uploadClass}`}>{uploadStatus}</td>
            <td className='v2-ticket-student-exams__info'>{totalAnswersStatus}</td>
            <td className='v2-ticket-student-exams__info'>
              {
                recordings !== null ? <span onClick={_showModal}
                  className='material-icons' style={{ cursor: 'pointer' }} >play_circle_filled</span> : null
              }
              {(type === 'final' && !examPassed && examStarted)
                ? <button
                  type='button'
                  onClick={(): Function => openExtend({ examId: id })} className='btn btn-success p-a-0'>تمديد</button>
                : null
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className='clearfix' />
  </div>)
}

export default StudentExams
