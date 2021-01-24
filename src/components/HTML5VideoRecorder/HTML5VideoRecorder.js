import * as React from 'react'
import moment from 'moment'
import RecordRTC from 'recordrtc'

import './style.scss'
import Icon from 'components/Icon'
const secondsInMinute = 60

type State = {
  volume: number,
  playing: boolean
};

type Props = {
  videoId: string,
  minutes: number,
  width: number,
  height: number,
  minutes: number,
  recordedSeconds: number,
  className: string,
  uploadPercentage: number,
  recording: boolean,
  enabled: boolean,
  uploading: boolean,
  recorded: boolean,
  uploadAfterDone: boolean,
  uploaded: boolean,
  hasCamera: boolean,
  onDone: Function,
  onHasCamera: Function,
  onRecordingStart: Function,
  onUploadDone: Function,
  resetRecorder: Function,
  onRecordingStop: Function,
  setBlob: Function,
  upload: Function,
  setHasCamera: Function,
  start: Function,
  ctaClassName: string,
  stop: Function
};
class HTML5VideoRecorder extends React.Component<Props, State> {
  _connectTimer = null
  video: ?HTMLVideoElement = React.createRef()
  stream: ?MediaStream
  speechEvents: ?Object
  recorder: ?Object
  interval: number = 0
  currentTime: number = 0
  totalTime: number = 0

  state = { volume: 0, playing: false }

  static defaultProps = {
    width: 640,
    height: 480,
    onUploadDone: (videoId: string) => {},
    onRecordingStop: () => {},
    onHasCamera: () => {},
    onRecordingStart: () => {}
  }
  componentWillUnmount () {
    clearTimeout(this._connectTimer)
    clearInterval(this.interval)
    const { resetRecorder } = this.props
    resetRecorder()
    if (this.video.current) {
      clearInterval(this.interval)
      // $FlowFixMe
      this.video.current.removeEventListener('pause', this._updatePause)
      // $FlowFixMe
      this.video.current.removeEventListener('playing', this._updatePlaying)
    }
  }
  componentDidMount () {
    this._connectTimer = setTimeout(() => {
      this._connect()
    }, 300)
    this.video.current.addEventListener('playing', this._updatePlaying)
    this.video.current.addEventListener('pause', this._updatePause)
  }
  render (): React.Element<'div'> {
    const {
      width,
      height,
      recording,
      recordedSeconds,
      recorded,
      hasCamera,
      className,
      uploading,
      enabled,
      uploaded,
      ctaClassName,
      minutes
    } = this.props
    const { volume, playing } = this.state
    let progressPercentage = 0
    if (recording) {
      progressPercentage = parseInt(recordedSeconds / (minutes * secondsInMinute) * 100, 10)
    } else if (recorded && this.video.current) {
      progressPercentage = this.video.current.currentTime / recordedSeconds * 100
    } else {
      progressPercentage = 0
    }

    if (recording) {
      this.currentTime = recordedSeconds
      this.totalTime = minutes * 60
    } else if ((playing || recorded) && this.video.current) {
      this.totalTime = recordedSeconds
      this.currentTime = this.video.current.currentTime
    }

    const totalTimeMoment = moment
      .utc(this.totalTime * 1000)
      .locale('en-us')
      .format(' mm:ss ')

    const currentTimeMoment = moment
      .utc(this.currentTime * 1000)
      .locale('en-us')
      .format(' mm:ss ')

    let ctaText = 'بدأ التسجيل'
    let ctaClass = 'btn-danger'
    let ctaIcon = 'adjust'
    if (recording) {
      ctaText = 'ايقاف التسجيل'
      ctaClass = 'btn-white'
      ctaIcon = 'stop'
    } else if (recorded && !playing) {
      ctaText = ''
      ctaClass = ''
      ctaIcon = 'play_arrow'
    } else if (recorded && playing) {
      ctaText = ''
      ctaClass = 'btn-success'
      ctaIcon = 'pause'
    }
    return (
      <div className={`${className} ${playing && 'is-playing'} c-html5-recorder shadow-1`} style={{ width, height }}>
        <div className={`c-html5-recorder__missing text-xs-center p-a-3 ${hasCamera ? 'hidden-xs-up' : ''}`}>
          <Icon name='missing-camera' />
          <h5 className='font-weight-bold  p-y-2'>عذرا الكاميرا أو الميكروفون لا يعملان</h5>
          <p className='text-xs-right p-t-2'>المرجو التأكد من التالي:</p>
          <ol className='text-xs-right'>
            <li className='p-b-1'>التاكد من ربط الكميرا بشكل جيد بحاسبك</li>
            <li className='p-b-1'>التاكد من ربط الميكروفون بشكل جيد بحاسبك</li>
            <li className='p-b-1'>تاكد من تثبيت البرمجيات الخاصة بالكميرا</li>
          </ol>
        </div>
        <div className={` ${!hasCamera ? 'hidden-xs-up' : ''}`}>
          <div
            className={`c-html5-recorder__volume hidden-xs-up`}
            style={{ transform: `scale(${volume / 100 + 0.3})` }}
          />
          <div
            className={`c-html5-recorder__percentage ${(recording && !uploading && !uploaded) || recorded
              ? ''
              : 'hidden-xs-up'}`}
          >
            <span
              className={`c-html5-recorder__percentage-current ${recorded ? 'is-playing' : ''}`}
              style={{ right: `${progressPercentage}%` }}
            >
              {recording || playing || recorded ? currentTimeMoment : null}
            </span>
            <span className={`c-html5-recorder__percentage-maxtime`}>
              {recording || playing || recorded ? totalTimeMoment : null}
            </span>
            <div
              className={`c-html5-recorder__percentage-done ${recorded ? 'is-playing' : ''}`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <video
            className='c-html5-recorder__video'
            id='selfVideo'
            volume='0'
            muted='muted'
            ref={this.video}
          />
          <button
            disabled={!enabled && !recording}
            className={`${ctaClass} ${playing && 'is-playing'} 
            ${ctaClassName} c-html5-recorder__start ${recording ? 'is-recording' : ''}`}
            onClick={this._handleAction}
          >
            <i className='material-icons'>{ctaIcon}</i>
            {ctaText}
          </button>
        </div>
      </div>
    )
  }
  _handleAction = () => {
    const { recorded, recording, onRecordingStop } = this.props
    const { playing } = this.state

    if (recorded && !playing && this.video.current) {
      this.video.current.play()
    } else if (recorded && playing && this.video.current) {
      this.video.current.pause()
    } else if (recording) {
      // $FlowFixMe
      this.recorder.stopRecording(this._endRecording)
      onRecordingStop()
    } else if (!recorded) {
      try {
        this._startRecording()
      } catch (e) {}
    }
  }
  _onDone = () => {
    const { videoId, onDone } = this.props
    onDone(videoId)
  }

  _startRecording = () => {
    const { start, minutes, onRecordingStart } = this.props
    if (this.recorder) {
      this.recorder.destroy()
      this.recorder = null
    }
    this.recorder = RecordRTC(this.stream, {
      type: 'video',
      // mimeType: 'video/mp4', // or video/mp4 or audio/ogg
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      // frameInterval: 5,
      disableLogs: true,
      numberOfAudioChannels: 1
    })
    if (this.recorder) {
      // auto stop recording after 5 seconds
      this.recorder.setRecordingDuration(minutes * secondsInMinute * 1000).onRecordingStopped(this._endRecording)
      // $FlowFixMe
      this.recorder.startRecording()
      onRecordingStart()
      start('idtest')
      // release camera on stopRecording
      // $FlowFixMe
      // this.recorder.camera = this.stream
    }
  }
  _endRecording = () => {
    const {
      stop,
      upload,
      setBlob,
      onRecordingStop,
      uploadAfterDone,
      videoId,
      onUploadDone
    } = this.props

    if (typeof this.recorder !== 'undefined' &&
      this.recorder !== null &&
      this.video.current !== null &&
      typeof this.video.current !== 'undefined') {
      this.video.current.src = ''
      this.video.current.srcObject = null

      const blob = this.recorder.getBlob()

      // $FlowFixMe
      this.video.current.src = URL.createObjectURL(blob)
      stop()
      if (uploadAfterDone) {
        // $FlowFixMe
        upload(blob, videoId).then(() => {
          // console.log(err ,res)
          onUploadDone(videoId)
        })
      }
      setBlob(blob)
      // this.video.current.play()
      // $FlowFixMe
      // if (this.recorder.camera) {

        // this.recorder.camera.stop()
      onRecordingStop()
        // $FlowFixMe

      // }

      if (this.speechEvents) {
        this.speechEvents.stop()
      }
      // $FlowFixMe
      // this.video.current.duration = recordedSeconds
      // $FlowFixMe
      this.video.current.controls = false
      // $FlowFixMe
      this.video.current.muted = false
      // $FlowFixMe
      this.video.current.volume = 1
      this.setState({ playing: false })
    }
  }

  _connect = () => {
    const { width, setHasCamera, onHasCamera } = this.props

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            // facingMode: { exact: 'environment' },
            mandatory: {
              maxWidth: width
            },
            optional: [{ maxWidth: 640 }]
          }
        })
        .then(stream => {
          try {
            setHasCamera(true)
            onHasCamera(true)
            this._setSrcObject(stream, this.video.current)
            // $FlowFixMe
            if (this.video.current) {
              // $FlowFixMe
              this.video.current.controls = false
              // $FlowFixMe
              this.video.current.muted = true
              // $FlowFixMe
              this.video.current.volume = 0
              this.video.current.play()
            }
            this.stream = stream
          } catch (error) {
            // console.log(error)
            setHasCamera(false)
            onHasCamera(false)
          }
        })
        .catch(function (error) {
          setHasCamera(false)
          onHasCamera(false)
        })
    }
  }

  _setSrcObject = (stream: MediaStream, element: ?HTMLVideoElement, ignoreCreateObjectURL: boolean = false) => {
    if (element && 'srcObject' in element) {
      element.srcObject = stream
    } else if (element && 'mozSrcObject' in element) {
      // $FlowFixMe
      element.mozSrcObject = stream
    } else {
      throw 'error mic or camera nor working'
    }
  }
  _updatePlaying = () => {
    const { recorded } = this.props
    if (recorded) {
      this.setState({ playing: true })
    }
    this.interval = setInterval(() => {
      if (this.interval) {
      //  this.forceUpdate()
      }
    }, 1000)
  }
  _updatePause = () => {
    const { recorded } = this.props
    if (recorded) {
      this.setState({ playing: false })
    }
    clearInterval(this.interval)
  }
}

export default HTML5VideoRecorder
