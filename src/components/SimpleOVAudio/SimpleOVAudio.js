// @flow
import React, { useEffect, useRef, useCallback, useState } from 'react'
import './SimpleOVAudio.scss'

type SimplePropsType = {
  publisher: Object
};

const SimpleOVAudio = (props: SimplePropsType): React.Element<'div'> => {
  const audioRef = useRef(null)
  const [volume, setVolume] = useState(0)
  const _setVolume = useCallback((volumeEvent: Object) => {
    const volumeValue = Math.round(Math.abs(volumeEvent.value.newValue))
    setVolume(100 - volumeValue)
  })

  const _startListeners = useCallback(() => {
    props.publisher.on('streamAudioVolumeChange', _setVolume)
  }, [])

  useEffect((): Function => {
    if (!!audioRef && props.publisher) {
      props.publisher.addVideoElement(audioRef.current)
      props.publisher.on('streamPlaying', _startListeners)
    }

    return () => {
      if (props.publisher) {
        props.publisher.off('streamAudioVolumeChange', _setVolume)
        props.publisher.off('streamPlaying', _startListeners)
      }
    }
  }, [])

  return <div className='SimpleOVAudio'>
    <audio ref={audioRef} autoPlay /> <div className='SimpleOVAudio__volume' style={{ width: volume + '%' }} />
  </div>
}

export default SimpleOVAudio
