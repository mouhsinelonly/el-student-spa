// @flow
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { minuteNumberToString } from 'utils'
import './style.scss'
import LaddaButton, { SLIDE_RIGHT } from 'react-ladda'
import { getDemo, requestDemo } from 'routes/Student/modules/exams'

type PropType = {};

const DemoExam = (props: PropType): React.Element<'div'> => {
  const dispatch = useDispatch()

  const { loadingDemo: loading, demo: exam } = useSelector((state: Object): Object => state.exams)

  const serverdate = useSelector((state: Object): Object => state.serverdate)

  let hasExam = typeof exam.id !== 'undefined'

  useEffect(() => {
    dispatch(getDemo())
  }, [])

  const _handleClick = useCallback(() => {
    dispatch(requestDemo())
  }, [])

  let diffInMinutes = 0
  if (serverdate !== '' && hasExam) {
    const _finishAtMoment = moment(exam.finish_at)
    const _nowMoment = moment(serverdate)
    diffInMinutes = _finishAtMoment.diff(_nowMoment, 'minutes')
  }

  if (diffInMinutes <= 0) {
    hasExam = false
  }

  return (
    <div className='c-demo-exam-row'>
      <div className='my-panel-white shadow-1 clearfix c-demo-exam-row__panel p-a-1'>
        <div className='col-xs-12 col-md-9'>
          إنشاء اختبار تجريبي <span className='label label-warning c-demo-exam-row__label'>ينصح به</span>
          <p className='p-a-0 m-a-0'>
            {hasExam ? 'افتح البرنامج و قم بتسجيل الدخول، ستجد لديك اختبارا تجريبيا'
            : 'يساعدك في تجربة برنامج الاختبارات ويقربك من أجواء الاختبارات' }
          </p>
        </div>
        <div className='col-xs-12 col-md-3'>
          <LaddaButton
            disabled={loading}
            data-style={SLIDE_RIGHT}
            loading={loading}
            onClick={hasExam ? null : _handleClick}
            className={`${hasExam ? 'btn-info-light' : 'btn-warning'} btn btn-block`}
            style={{ cursor: hasExam ? 'default' : 'pointer' }}>
            {hasExam ? 'تم إنشاء الاختبار' : 'أنشئ اختبارا تجريبيا'}
          </LaddaButton>
          { hasExam ? <p className='text-xs-center'>
            سيغلق بعد {minuteNumberToString(diffInMinutes)}
          </p> : null}
        </div>
      </div>
    </div>
  )
}

export default DemoExam
