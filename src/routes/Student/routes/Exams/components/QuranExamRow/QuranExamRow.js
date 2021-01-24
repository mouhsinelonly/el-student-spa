// @flow
import React, { useCallback } from 'react'
import { showModal } from 'modules/modals'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { triesNumberToString } from 'utils'
import './style.scss'
import Icon from 'components/Icon'
import moment from 'moment'

type PropsType = {
   name: string,
   rules: Array<Object>,
   startAt: string,
   finishAt: string,
   recording: Object,
   serverdate: string,
   subjectId: number,
   retries: number
};

const QuranExamRow = (props: PropsType): React.Element<'div'> => {
  const { name, startAt, serverdate, finishAt,
    subjectId, rules,
    recording: { quran_video, subject_id, valid },
    recording, retries } = props
  const dispatch = useDispatch()
  const studentHasRecord = typeof recording.id !== 'undefined'
  const enabled = !studentHasRecord || recording.remaining > 0 || retries > 0

  const serverTimeMoment = moment(serverdate)
  const hasExcuse =
      typeof recording !== 'undefined' &&
      (typeof recording.excuse !== 'undefined' && recording.excuse && typeof recording.excuse.id !== 'undefined')
  const startAtMoment = startAt ? moment(startAt) : false
  const finishAtMoment = finishAt ? moment(finishAt) : false
  const { data: events } = useSelector((state: Object): Object => state.semester_events)

  let resultsEnabled = false

  const resultEvent = events.find((e: Object): boolean => e.category === 'result')
  if (resultEvent) {
    const serverTime = moment(serverdate)

    const resultEventStartAt = moment(`${resultEvent.start_at} ${resultEvent.time_start_at}`)
    const resultEventFinishAt = moment(`${resultEvent.finish_at} ${resultEvent.time_finish_at}`)
    if (resultEventStartAt.isBefore(serverTime) && resultEventFinishAt.isAfter(serverTime)) {
      resultsEnabled = true
    }
  }

  const passed = finishAtMoment.isBefore(serverTimeMoment)

  const canPass =
      enabled &&
      startAt &&
      finishAt &&
      (startAtMoment.isBefore(serverTimeMoment) && finishAtMoment.isAfter(serverTimeMoment))

  const maxTries = (retries > recording.remaining)
    ? retries
    : (recording ? recording.remaining : 5)

  const _showRulesModel = useCallback(() => {
    dispatch(showModal('rules', { title: 'تعليمات الاختبار', rules }, true, true))
  })
  const _showPlayerModel = useCallback(() => {
    dispatch(showModal('quran_recording', {
      streamName: quran_video,
      valid,
      subjectId: subject_id }, true, true, 'medium'))
  }, [valid])

  return (<div className='c-quran-exam-row'>
    <div className={`my-panel-white shadow-1 c-quran-exam-row__panel clearfix`}>
      <div className='col-xs-12 col-md-2 col-lg-1 p-t-2'>
        <Icon name='quran-medium' />
      </div>
      <div className='col-xs-12 col-md-5 col-lg-4 p-y-2'>
        <h5 className=''>
          اختبار التلاوة {name} {hasExcuse ? 'أعذار' : null}
        </h5>
        <div className='c-quran-exam-row__meta'>
          <span onClick={_showRulesModel} className='c-quran-exam-row__meta__rules'>
            القوانين و الشروط
          </span>
          <span className='c-quran-exam-row__meta__rules hidden-xs-up'>القوانين و الشروط</span>
          <span className='c-quran-exam-row__meta__guide hidden-xs-up'>طريقة الانجاز</span>
          <span>
            {passed ? (
              'انتهى الوقت'
            ) : (
              <div>
                <div className='c-quran-exam-row__label p-t-1'>
                  يبدأ في
                  {startAtMoment
                    ? startAtMoment.locale('en').format('DD') + ' ' + startAtMoment.locale('ar-SA').format('MMMM')
                    : null}{' '}
                  و ينتهي في
                  {finishAtMoment
                    ? finishAtMoment.locale('en').format('DD') + ' ' + finishAtMoment.locale('ar-SA').format('MMMM')
                    : null}
                </div>
              </div>
            )}
          </span>
        </div>
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-3 p-y-2 ${!studentHasRecord ? 'hidden-xs-up' : ''}`}>
        <span className='c-quran-exam-row__label'>التسجيل</span>
        <br />
        <button onClick={_showPlayerModel} className='btn btn-light btn-sm'>
          مشاهدة التسجيل
        </button>
      </div>
      <div
        className={`${((!studentHasRecord && passed) || studentHasRecord || !passed) ? 'hidden-xs-up' : ''}
      col-xs-12 col-md-3 col-lg-4 p-y-2`}
      >
        <span className='c-quran-exam-row__label'>المطلوب منك</span>
        {!hasExcuse ? (
          <Link to='/student/orders/quran_recording' className='btn-warning btn btn-block'>
            قدم عذر تغيبك
          </Link>
        ) : (
          <button className='btn-info btn btn-block'>{recording.excuse.state}</button>
        )}
      </div>
      <div
        className={`${(!studentHasRecord && !enabled) || (!studentHasRecord && enabled) ? 'hidden-xs-up' : ''}
      col-xs-12 col-md-3 col-lg-4 p-y-2`}
      >
        <div>
          <div className='col-xs-6 p-a-0'>
            <span className={`${resultsEnabled ? 'hidden-xs-up' : ''} c-quran-exam-row__label`}>التقييم</span>
            <div className={(passed && recording && recording.grade && !resultsEnabled)
              ? 'c-quran-exam-row__gradel text-success'
              : 'hidden-xs-up'}>
              جاري التقييم ...
            </div>
          </div>
          <div className={`col-xs-6 p-a-0 ${passed ? 'hidden-xs-up' : ''}`}>
            <div className={`${maxTries <= 0 ? 'hidden-xs-up' : ''}`}>
              <span className='c-quran-exam-row__label'>المحاولات المتبقية</span>
              <div>
                {triesNumberToString(maxTries)}
              </div>
            </div>
            {canPass ? (
              <Link
                to={`/student/exams/quranv2/${subjectId}`}
                className='btn-light m-t-1 btn btn-sm btn-block'
              >
                <Icon name='replay-gray-medium' /> محاولة ثانية
              </Link>
            ) : (
              <div className='m-t-2'>انتهت المحاولات</div>
            )}
          </div>
        </div>
      </div>
      <div className={`${!canPass || studentHasRecord ? 'hidden-xs-up' : ''}
      col-xs-12 col-md-3 col-lg-4 p-y-2`}>
        <span className='c-quran-exam-row__label'>المطلوب منك</span>
        <Link
          to={`/student/exams/quranv2/${subjectId}`}
          className='btn-success btn btn-block'
        >
          ابدا الاختبار
        </Link>
      </div>
    </div>
  </div>)
}

QuranExamRow.defaultProps = {
  name: '',
  event: {},
  rules: [],
  recording: {},
  finishAt: '',
  startAt: '',
  subjectId: 0
}
export default QuranExamRow
