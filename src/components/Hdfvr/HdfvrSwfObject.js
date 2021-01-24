import React, { Component } from 'react'
import PropTypes from 'prop-types'
import swfobject from 'swfobject'
// import utils
import { AppPublicPath, hdfvrFlashVars, hdfvrParams, hdfvrAttributes, isMobile } from 'utils'
// import styles
import './style.scss'

class HdfvrSwfObject extends Component {
  static propTypes = {
    onUserHasMic: PropTypes.func,
    onFlashReady: PropTypes.func,
    onRecordingStarted: PropTypes.func,
    onCamAccess: PropTypes.func,
    onFPSChange: PropTypes.func,
    onMicActivityLevel: PropTypes.func,
    onUploadDone: PropTypes.func,
    onStopRecordingPressed: PropTypes.func,
    onSaveOk: PropTypes.func,
    userId: PropTypes.number,
    onSaveFailed: PropTypes.func
  }
  static defaultProps = {
    userId: 0
  }
  constructor (props) {
    super(props)
    this._handleOnSaveOk = this._handleOnSaveOk.bind(this)
    this._handleOnSaveFailed = this._handleOnSaveFailed.bind(this)
    this._handleUserHasMic = this._handleUserHasMic.bind(this)
    this._handleOnFlashReady = this._handleOnFlashReady.bind(this)
    this._handleStopRecordingPressed = this._handleStopRecordingPressed.bind(this)
    this._handleOnRecordingStarted = this._handleOnRecordingStarted.bind(this)
    this._handleOnUploadDone = this._handleOnUploadDone.bind(this)
    this._handleoOnCamAccess = this._handleoOnCamAccess.bind(this)
    this._handleOnMicActivityLevel = this._handleOnMicActivityLevel.bind(this)
  }
  componentDidMount () {
    const { userId } = this.props
    let modifiedFlashVars = hdfvrFlashVars
    let modifiedHdfvrAttributes = hdfvrAttributes
    modifiedHdfvrAttributes.id = 'VideoRecorder' + userId
    modifiedHdfvrAttributes.name = 'VideoRecorder' + userId
    modifiedFlashVars.userId = userId
    if (!isMobile()) {
      setTimeout(() => {
        swfobject.embedSWF(`${AppPublicPath}assets/hdfvr/VideoRecorder.swf`,
        'quranRecorderSwf' + userId, '100%', '270', '10.3.0', '',
        modifiedFlashVars, hdfvrParams, modifiedHdfvrAttributes)
      }, 100)
      window.userHasCamMic = this._handleUserHasMic
      window.btStopRecordingPressed = this._handleStopRecordingPressed
      window.onFlashReady = this._handleOnFlashReady
      window.onRecordingStarted = this._handleOnRecordingStarted
      window.onCamAccess = this._handleoOnCamAccess
      window.onFPSChange = this._handleOnFPSChange
      window.onMicActivityLevel = this._handleOnMicActivityLevel
      window.onUploadDone = this._handleOnUploadDone
      window.onSaveOk = this._handleOnSaveOk
      window.onSaveFailed = this._handleOnSaveFailed
      // window.onFPSChange = this._handle
    }
  }
  render () {
    const { userId } = this.props
    return (
      <div className='c-hdfvr-container my-panel-white shadow-1 text-xs-center'>
        <div id={`quranRecorderSwf${userId}`} />
      </div>
    )
  }
  _handleOnSaveOk (streamName, streamDuration, userId,
    cameraName, micName, recorderId, audioCodec, videoCodec, fileType) {
    const { onSaveOk } = this.props
    onSaveOk && onSaveOk(streamName, streamDuration, userId)
  }
  _handleOnSaveFailed (streamName, streamDuration, userId, recorderId) {
    const { onSaveFailed } = this.props
    onSaveFailed && onSaveFailed(streamName, userId)
  }
  _handleOnMicActivityLevel (recorderId, level = 0) {
    const { onMicActivityLevel } = this.props
    // console.log(level)
    onMicActivityLevel && onMicActivityLevel(level)
  }
  _handleOnFPSChange (recorderId = '', fps = 0) {
    const { onFPSChange } = this.props
    onFPSChange && onFPSChange(fps)
  }
  _handleOnUploadDone (streamName, streamDuration, userId, recorderId, audioCodec, videoCodec, fileType) {
    const { onUploadDone } = this.props
    onUploadDone && onUploadDone(streamName, streamDuration)
  }
  _handleoOnCamAccess (allowed = false) {
    const { onCamAccess } = this.props
    onCamAccess && onCamAccess(allowed)
  }
  _handleOnRecordingStarted (recorderId) {
    const { onRecordingStarted } = this.props
    onRecordingStarted && onRecordingStarted()
  }
  _handleStopRecordingPressed () {
    const { onStopRecordingPressed } = this.props
    onStopRecordingPressed && onStopRecordingPressed()
  }
  _handleOnFlashReady () {
    const { onFlashReady } = this.props
    onFlashReady && onFlashReady()
  }
  _handleUserHasMic (totalCams, totalMics) {
    const { onUserHasMic } = this.props
    onUserHasMic && onUserHasMic(totalCams, totalMics)
  }
}

export default HdfvrSwfObject
