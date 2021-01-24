// @flow
import React, { useEffect } from 'react'
import './OpenViduCall.scss'
import { useOpenVidu } from 'hooks'
import SimpleOVAudio from 'components/SimpleOVAudio'
type PropsType = {
  streamName: string,
  bottom: boolean
};

const OpenViduCall = (props: PropsType): React.Element<'div'> => {
  const { subscribers, publisher, leaveSession, publish, live } =
  useOpenVidu({ sessionId: props.streamName, audio: true, video: false })

  useEffect((): Function => {
    publish()
    return () => {
      leaveSession()
    }
  }, [])
  return <div className={`OpenViduCall shadow-1 p-x-1 ${props.bottom && 'is-bottom'}`}>
    <i style={{ verticalAlign: 'middle', display: 'inline-block', position: 'absolute', left: 5, top: 1 }}
      className='material-icons m-r-1'>{live ? 'phone_in_talk' : 'settings_phone'}</i>
    {publisher && <SimpleOVAudio publisher={publisher} autoPlay />}
    { subscribers.map((s: Object, i: number): React.Element<typeof SimpleOVAudio> =>
      <SimpleOVAudio key={i} publisher={s} />) }
  </div>
}

export default OpenViduCall
