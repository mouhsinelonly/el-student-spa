// @flow
import React, { useRef, useEffect, useState, useCallback } from 'react'
import './OvVideo.scss'

type PropsType = {
  streamManager: React.Node,
  volumeBar: boolean,
  live: boolean,
  remaining: number,
  duration: number,
  onDurationFinished: Function
};

const OpenViduVideoComponent = (props: PropsType): React.Element<'div'> => {
  const videoRef = useRef()
  const [ volume, setVolume ] = useState(0)
  const _setVolume = useCallback((volumeEvent: Object) => {
    const volumeValue = Math.round(Math.abs(volumeEvent.value.newValue))
    setVolume(100 - volumeValue)
  })

  const _startListeners = useCallback(() => {
    props.volumeBar && props.streamManager.on('streamAudioVolumeChange', _setVolume)
  })

  useEffect((): Function => {
    props.remaining === 0 && props.onDurationFinished()
  }, [props.remaining])
  useEffect((): Function => {
    if (!!videoRef && props.streamManager) {
      props.streamManager.addVideoElement(videoRef.current)
      props.streamManager.on('streamPlaying', _startListeners)
    }

    return () => {
      if (props.streamManager) {
        props.volumeBar && props.streamManager.off('streamAudioVolumeChange', _setVolume)
        props.streamManager.off('streamPlaying', _startListeners)
      }
    }
  }, [props.streamManager])

  return <div
    className='shadow-1' style={{ width: 426, height: 240, display: 'inline-block', margin: 20 }}>
    <div style={{ position: 'relative',
      paddingBottom: '56.25%',
      paddingTop: '25',
      height: 0 }}>
      <video style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
        autoPlay ref={videoRef} />
      {props.live &&
        <div className='is-blinking label label-danger'
          style={{ position: 'absolute', left: 10, bottom: 10, borderRadius: 50, padding: 10 }}>جاري التسجيل</div>}
      <div style={{
        width: 8,
        height: volume + '%',
        backgroundColor: 'mediumseagreen',
        position: 'absolute',
        right: 10,
        borderRadius: 10,
        bottom: 10 }} />
      <div className='OvVideo__track' />
      <div className={`OvVideo__progress ${props.live ? 'is-playing' : ''}`}
        style={{ width: `${100 - props.remaining / props.duration * 100}%` }} />
    </div>
  </div>
}

export default OpenViduVideoComponent
