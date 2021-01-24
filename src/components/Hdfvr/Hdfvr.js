import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import utils
import {AppPublicPath, hdfvrFlashVars, hdfvrParams,
  hdfvrAttributes, isMobile, isIE, isIeLessThan9} from 'utils'
// import styles
import './style.scss'

class Hdfvr extends Component {
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
    const {userId} = this.props
    let modifiedFlashVars = hdfvrFlashVars
    modifiedFlashVars.userId = userId

    if (!isMobile()) {
      // setTimeout(() => {
      //   swfobject.embedSWF(`${AppPublicPath}assets/hdfvr/VideoRecorder.swf`,
      //   'quranRecorder', '100%', '270', '10.3.0', '', modifiedFlashVars, hdfvrParams, hdfvrAttributes)
      // }, 100)
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
    const {userId} = this.props
    let flashVarsString
    for (var k in hdfvrFlashVars) {
      if (typeof flashVarsString !== 'undefined') {
        flashVarsString += '&' + k + '=' + hdfvrFlashVars[k]
      } else {
        flashVarsString = k + '=' + hdfvrFlashVars[k]
      }
    }
    flashVarsString = flashVarsString.replace(/"/g, '&quot;')
    return (
      <div className='c-hdfvr-container my-panel-white shadow-1 text-xs-center' id='wrapper'>
        {isIE && isIeLessThan9 && <object type='application/x-shockwave-flash' name={hdfvrAttributes['name']}
          id={hdfvrAttributes['id'] + userId} width={320} height={270}>
          <param name='quality' value={hdfvrParams['quality']} />
          <param name='scale' value={hdfvrParams['scale']} />
          <param name='bgcolor' value={hdfvrParams['bgcolor']} />
          <param name='play' value={hdfvrParams['play']} />
          <param name='base' value={hdfvrParams['base']} />
          <param name='loop' value={hdfvrParams['loop']} />
          <param name='allowscriptaccess' value={hdfvrParams['allowscriptaccess']} />
          <param name='wmode' value={hdfvrParams['wmode']} />
          <param name='flashvars' value={flashVarsString} />
          <param name='movie' value={AppPublicPath + 'assets/hdfvr/VideoRecorder.swf'} />
        </object>
      }
        {!isIE || !isIeLessThan9 ? <object type='application/x-shockwave-flash' name={hdfvrAttributes['name']}
          id={hdfvrAttributes['id'] + userId}
          data={AppPublicPath + 'assets/hdfvr/VideoRecorder.swf'} width={320} height={270}>
          <param name='quality' value={hdfvrParams['quality']} />
          <param name='scale' value={hdfvrParams['scale']} />
          <param name='bgcolor' value={hdfvrParams['bgcolor']} />
          <param name='play' value={hdfvrParams['play']} />
          <param name='base' value={hdfvrParams['base']} />
          <param name='loop' value={hdfvrParams['loop']} />
          <param name='allowscriptaccess' value={hdfvrParams['allowscriptaccess']} />
          <param name='wmode' value={hdfvrParams['wmode']} />
          <param name='flashvars' value={flashVarsString} />
        </object> : <div />
      }
      </div>
    )
  }
  _handleOnSaveOk (streamName, streamDuration, userId,
    cameraName, micName, recorderId, audioCodec, videoCodec, fileType) {
    const {onSaveOk} = this.props
    onSaveOk && onSaveOk(streamName, streamDuration, userId)
  }
  _handleOnSaveFailed (streamName, streamDuration, userId, recorderId) {
    const {onSaveFailed} = this.props
    onSaveFailed && onSaveFailed(streamName, userId)
  }
  _handleOnMicActivityLevel (recorderId, level = 0) {
    const {onMicActivityLevel} = this.props
    onMicActivityLevel && onMicActivityLevel(level)
  }
  _handleOnFPSChange (recorderId = '', fps = 0) {
    const {onFPSChange} = this.props
    onFPSChange && onFPSChange(fps)
  }
  _handleOnUploadDone (streamName, streamDuration, userId, recorderId, audioCodec, videoCodec, fileType) {
    const {onUploadDone} = this.props
    onUploadDone && onUploadDone(streamName, streamDuration)
  }
  _handleoOnCamAccess (allowed = false) {
    const {onCamAccess} = this.props
    onCamAccess && onCamAccess(allowed)
  }
  _handleOnRecordingStarted (recorderId) {
    const {onRecordingStarted} = this.props
    onRecordingStarted && onRecordingStarted()
  }
  _handleStopRecordingPressed () {
    const {onStopRecordingPressed} = this.props
    onStopRecordingPressed && onStopRecordingPressed()
  }
  _handleOnFlashReady () {
    const {onFlashReady} = this.props
    onFlashReady && onFlashReady()
  }
  _handleUserHasMic (totalCams, totalMics) {
    const {onUserHasMic} = this.props
    onUserHasMic && onUserHasMic(totalCams, totalMics)
  }
}

export default Hdfvr
