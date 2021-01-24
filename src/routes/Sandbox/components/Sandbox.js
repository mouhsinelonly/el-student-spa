// @flow
import React, { useEffect } from 'react'
// import { useOpenVidu } from 'hooks'
import OvVideo from 'components/OvVideo'

const Sandbox = (): React.Element<'div'> => {
  useEffect(() => {
    publish()
  }, [])
  const { subscribers, publisher, leaveSession, shareScreen, publish, live, remaining, duration } = {}
  // useOpenVidu({ sessionId: 'SessionA', duration: 10 })
  return <div>
    <div className='text-xs-center'>
      { publisher && <OvVideo
        remaining={remaining}
        duration={duration}
        onDurationFinished={leaveSession}
        volumeBar={false}
        live={live}
        streamManager={publisher} /> }
      { subscribers.length > 0 && subscribers.map((sub: Object, i: number): React.Element<typeof OvVideo> =>
        <OvVideo key={i} streamManager={sub} />) }
    </div>
    <div className='text-xs-center'>
      {!live &&
        <button className='btn btn-danger  btn-lg p-x-3 m-l-2' onClick={publish}>تسجيل</button>}
      {live &&
        <button className='btn btn-danger  btn-lg p-x-3 m-l-2' onClick={leaveSession}>خروج</button>}
      <button className='btn btn-success btn-lg p-x-3 ' onClick={shareScreen}>مشاركة سطح المكتب</button>
    </div>
  </div>
}

export default Sandbox
