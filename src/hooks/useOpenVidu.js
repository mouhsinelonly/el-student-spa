// @flow
import { useRef, useEffect, useState, useCallback } from 'react'
import useInterval from './useInterval'
// import { OpenVidu } from 'openvidu-browser'
import request from 'superagent'
import { APIBASE } from 'utils'
const useOpenVidu = ({ sessionId = 'demoSession',
  clientData = { clientData: 'mouhsine' }, audio = true, video = true,
  resolution = '426x240', record = true,
  onRecordingStart, onRecordingStop, log = false, duration = 0 }: Object): Function => {
  // primary video publisher for current user
  const publisherRef = useRef(null)
  const [ token, setToken ] = useState(null)
  // remaining seconds for the video to finish
  const [ remaining, setRemaining ] = useState(duration)
  // a list of other users for the same session
  const [ subscribers, setSubscribers ] = useState([])
  // is the publisher streaming to server
  const [ live, setLive ] = useState(false)
  // open video object
  const OvRef = useRef()
  // open video current session
  const sessionRef = useRef()

  useInterval(() => {
    setRemaining(remaining - 1)
  }, duration && live && remaining > 0 ? 1000 : null)

  const leaveSession = useCallback(() => {
    log && console.error('leaveSession was called', publisherRef.current)
    if (publisherRef.current) {
      sessionRef.current.unpublish(publisherRef.current)
      publisherRef.current.off('streamCreated', _onPublisherStreamCreated)
      publisherRef.current.off('streamCreated', _onPublisherStreamDestroyed)
      publisherRef.current.off('sessionDisconnected', _onPublisherSessionDisconnected)
    }
    if (sessionRef) {
      sessionRef.current.disconnect()
      setLive(false)
      request.post(`${APIBASE}` + '/api/openvidu/delete/' + sessionId)
    }
  }, [publisherRef, sessionRef])

  const onStreamCreated = useCallback((event: Object) => {
    log && console.log('1 ---> got new stream')
    const subscriber = sessionRef.current.subscribe(event.stream, undefined)
    const newSubscribers = [...subscribers, subscriber]
    setSubscribers(newSubscribers)
  }, [subscribers])

  const onStreamDestroyed = useCallback((event: Object) => {
    const index = subscribers.indexOf(event.stream.streamManager, 0)
    if (index > -1) {
      subscribers.splice(index, 1)
      setSubscribers(subscribers)
    }
  }, [subscribers])

  const _connect = useCallback((token: string) => {
    sessionRef.current.connect(token, { clientData: 'mouhsine' + Math.floor(Math.random() * 100) }).then(() => {
      sessionRef.current.publish(publisherRef.current)
    })
  }, [publisherRef])

  const publish = useCallback(() => {
    const data = { sessionId, record }
    request.post(`${APIBASE}/api/openvidu/token`)
          .set('Accept', 'application/json')
          .send(data)
          .end((err: Object, response: Object) => {
            if (!err) {
              setToken(response.body.token)
            }
          })
  }, [sessionId, record])
  useEffect(() => {
    if (token) {
      _connect(token)
    }
  }, [token])
  const _onPublisherStreamCreated = useCallback(() => {
    setLive(true)
    onRecordingStart && onRecordingStart()
  }, [])
  const _onPublisherStreamDestroyed = useCallback((event: Object) => {
    log && console.log('_onPublisherStreamDestroyed')
    onRecordingStop && onRecordingStop()
    // event.preventDefault()
  }, [])
  const _onPublisherSessionDisconnected = useCallback((event: Object) => {
    log && console.log('_onPublisherSessionDisconnected')
    // event.preventDefault()
  }, [])

  const shareScreen = useCallback(() => {
    const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen'
    const screenPublisher = OvRef.current.initPublisher(undefined,
      {
        videoSource,
        publishAudio: true,
        publishVideo: true,
        mirror: false,
      })
    screenPublisher.once('accessDenied', (error: Object) => {
      if (error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
        log && console.log(error.message)
        // showWarning could show a button with href 'error.message',
        // so the user can navigate to install the extension.
        // A browser refresh is also needed after installation
      } else if (error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
        log && console.log(`المتصفح الذي تستخدمه لا يدعم مشاركة الشاشة٫ 
        عليك القيام بتنصيب اخر نسخة من غوغ كروم او فايرفوكس`)
      } else if (error.name === 'SCREEN_EXTENSION_DISABLED') {
        log && console.log('عليك تفعيل اضافة المتصفح الخاصة بمشاركة الشاشة')
      } else if (error.name === 'SCREEN_CAPTURE_DENIED') {
        log && console.log('عليك باختيار شاشة او برنامج لمشاركته')
      }
    })
    screenPublisher.once('accessAllowed', () => {
      log && console.log('accessAllowed')
      sessionRef.current.unpublish(publisherRef.current)
      log && console.log('unpublished the shit')
      publisherRef.current = null
      publisherRef.current = screenPublisher
      sessionRef.current.publish(screenPublisher)
    })
  }, [publisherRef, sessionRef, OvRef])

  useEffect((): Function => {
    log && console.log('should use effect')
    window.addEventListener('beforeunload', leaveSession)
    // OvRef.current = new OpenVidu()
    // !log && OvRef.current.enableProdMode()
    log && console.log('after pro mode')
    sessionRef.current = OvRef.current.initSession()
    log && console.log('should before events')
    sessionRef.current.on('streamCreated', onStreamCreated)
    sessionRef.current.on('streamDestroyed', onStreamDestroyed)
    log && console.log('Should init')
    publisherRef.current = OvRef.current.initPublisher(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: undefined, // The source of video. If undefined default webcam
      publishAudio: audio, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: video, // Whether you want to start publishing with your video enabled or not
      resolution, // The resolution of your video
      // resolution: '640x480', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: false, // Whether to mirror your local video or not
    })

    publisherRef.current.on('streamCreated', _onPublisherStreamCreated)
    publisherRef.current.on('streamDestroyed', _onPublisherStreamDestroyed)
    publisherRef.current.on('sessionDisconnected', _onPublisherSessionDisconnected)

    return () => {
      window.removeEventListener('beforeunload', leaveSession)
      if (publisherRef.current) {
        publisherRef.current.off('streamCreated', _onPublisherStreamCreated)
        publisherRef.current.off('streamCreated', _onPublisherStreamDestroyed)
        publisherRef.current.off('sessionDisconnected', _onPublisherSessionDisconnected)
      }
      leaveSession()
      OvRef.current = null
    }
  }, [])

  return { subscribers, remaining, duration, publisher: publisherRef.current, leaveSession, shareScreen, publish, live }
}

export default useOpenVidu
