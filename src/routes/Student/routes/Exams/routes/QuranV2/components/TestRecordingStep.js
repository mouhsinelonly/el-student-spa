// @flow
import React, { useState, useCallback } from 'react'
import { Link } from 'react-router'
import HTML5VideoRecorder from 'components/HTML5VideoRecorder'
import { isMobile } from 'utils'
const isMobilePlatform = isMobile()

type PropsType = {
  changeStep: Function
};

const TestRecordingStep = (props: PropsType): React.Node => {
  const [ hasCamera, setHasCamera ] = useState(false)
  const [ recorderKey, setRecorderKey ] = useState(Math.random())
  const [ recordingStopped, setRecordingStopped ] = useState(false)

  const _handleHasCamera = useCallback((status: boolean) => {
    setHasCamera(status)
  }, [])
  const _nextStep = useCallback(() => {
    props.changeStep('terms')
  }, [])
  const _onRecordingStopped = useCallback(() => {
    setRecordingStopped(true)
  }, [])

  const _resetRecorder = useCallback(() => {
    setRecorderKey(Math.random())
    setRecordingStopped(false)
  }, [])
  return (
    <div className='TestRecordingStep container text-xs-center'>
      <div className='row'>
        <div className='TestRecordingStep__col col-xs-12 col-md-8 col-md-pull-2 col-lg-8 col-lg-pull-2'>
          <Link to='/student/exams' className='p-quran-pagev2__back'>
            <i className='material-icons m-l-1'>arrow_forward</i> تجربة الكاميرا و الصوت
          </Link>
          <div className='clearfix' />
          <HTML5VideoRecorder
            minutes={5}
            key={recorderKey}
            enabled
            ctaClassName={`TestRecordingStep__cta ${recordingStopped ? 'is-recorded' : ''}`}
            onRecordingStop={_onRecordingStopped}
            className='TestRecordingStep__camera'
            onHasCamera={_handleHasCamera}
            width={isMobilePlatform ? 320 : 640}
            height={isMobilePlatform ? 240 : 480}
          />
          <div className='clearfix' />
          <button
            type='button'
            disabled={!hasCamera}
            className={`TestRecordingStep__reset btn btn-white p-x-1 m-t-3 ${!recordingStopped ? 'hidden-xs-up' : ''}`}
            onClick={_resetRecorder}
          >
            <i className='material-icons'>refresh</i> اعادة التسجيل
          </button>
          <div className='clearfix' />
          <button
            type='button'
            disabled={!hasCamera}
            className={`TestRecordingStep__good btn btn-success p-x-3 m-t-3 ${!recordingStopped ? 'hidden-xs-up' : ''}`}
            onClick={_nextStep}
          >
            تعمل بشكل جيد التالي
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestRecordingStep
