// @flow
import * as React from 'react'
import './style.scss'
import { getPageVisibility, secondNumberToString, toHHMMSS } from 'utils'

type PropsType = {
  timer: number,
  id: number,
  seeked: number,
  cycle: number,
  seeking: boolean,
  threshold: number,
  videoelement: Object,
  enabled: boolean,
  watched: boolean,
  showgrademessage: boolean,
  pauseVideo: Function,
  updateVideoSeek: Function,
  startWatching: Function,
  onEnd: Function,
  resetTimer: Function
};

type StateType = {
  elementId: number
};

class VideoConfirmAvailability extends React.Component<PropsType, StateType> {
  state = { elementId: 0 }
  componentDidMount () {
    const { visibilityChange } = getPageVisibility()

    window.addEventListener(visibilityChange, this._onVisibilityChange)

  }
  componentWillUnmount () {
    const { visibilityChange } = getPageVisibility()
    window.removeEventListener(visibilityChange, this._onVisibilityChange)
  }
  UNSAFE_componentWillReceiveProps (nextProps: Object) {
    const { id } = this.props

    this.setState({ elementId: id })
  }

  componentDidUpdate (nextProps: Object, nextState?: Object) {
    const {
      seeked: seekedMinutes,
      videoelement,
      seeking,
      enabled,
      id,
      onEnd,
      watched,
      cycle,
      timer,
      updateVideoSeek,
      pauseVideo
    } = this.props
    const { elementId } = this.state

    const currentTime = parseInt(videoelement ? videoelement.getCurrentTime() : 0, 10)
    if (
      enabled &&
      videoelement &&
      currentTime % 47 === 0 &&
      currentTime !== seekedMinutes &&
      videoelement.getCurrentTime() >= 1 &&
      !seeking
    ) {
      updateVideoSeek(id, currentTime)
    }

    if (
      videoelement &&
      id === elementId &&
      enabled &&
      !watched &&
      (videoelement.getCurrentTime() >= (videoelement.getDuration() - 10 * 60)) &&
      (videoelement.getDuration() - 10 * 60) > 100) {
      onEnd(id)
    }
    // console.log(cycle, timer, cycle - timer)
    if ((cycle - timer <= 0) && enabled) {
      pauseVideo()
    }
  }
  render (): React.Element<'div'> {
    const { timer,
      cycle,
      threshold,
      videoelement,
      seeked,
      playing,
      showgrademessage,
      enabled } = this.props

    if (!videoelement || !enabled) {
      return <div />
    }

    const videoIsPlaying = (videoelement && videoelement.getPlayerState() === 1)
    const percentage = videoelement.getCurrentTime() / videoelement.getDuration() * 100
    const seekedPercentage = seeked / videoelement.getDuration() * 100

    const showCheck = timer < cycle - threshold

    return (
      <div>
        
        <div
          className={`label label-success
          c-video-confirm-availability__grademessage shadow-1 ${!showgrademessage ? 'hidden-xs-up' : ''}`}
        >
          لقد حصلت على درجة مشاهدة الدرس
        </div>
        <div className='c-video-confirm-availability__overlay s'
          style={{ visibility: videoIsPlaying ? 'visible' : 'hidden' }} />
        <div className='c-video-confirm-availability__bar-outer'>
        {playing ? 'i am playing' : 'not playing'}
          <div className='c-video-confirm-availability__bar' style={{ width: `${percentage}%` }}>
            <div className='c-video-confirm-availability__seconds'>
              {toHHMMSS(videoelement.getCurrentTime())}/{toHHMMSS(videoelement.getDuration())}
            </div>
          </div>
          <div className='c-video-confirm-availability__seek' style={{ width: `${seekedPercentage}%` }} />
        </div>
        <div
          className={`c-video-confirm-availability__container shadow-1
          ${showCheck ? 'hidden-xs-up' : ''}`}
          onClick={this._resetTimer}
        >
          <div className='c-video-confirm-availability__loader p-a-2 '>
            <div className='c-video-confirm-availability__dot animated-blink' />
            اضغط هنا لإثبات حضورك او سيتم ايقاف الفيديو بعد{' '}
            <span className='c-video-confirm-availability__timer'>
              {cycle - timer} {secondNumberToString(cycle - timer)}
            </span>
          </div>
        </div>
      </div>
    )
  }
  _resetTimer = () => {
    const { resetTimer } = this.props
    resetTimer()
  }

  // _onFocus = () => {
  //   const { videoelement } = this.props
  //   if (videoelement && videoelement.getPlayerState() === 2) {
  //     videoelement.playVideo()
  //   }
  // }
  // _onBlur = () => {
  //   const { videoelement } = this.props
  //   if (videoelement && videoelement.getPlayerState() === 1) {
  //     videoelement.pauseVideo()
  //   }
  // }
  _onVisibilityChange = () => {
    const { hidden } = getPageVisibility()
    const { videoelement, startWatching } = this.props
    // $FlowFixMe
    if (videoelement && videoelement.getPlayerState() === 1 && document[hidden]) {
      videoelement.pauseVideo()
    } else if (videoelement && videoelement.getPlayerState() === 2) {
      videoelement.playVideo()
      startWatching()
    }
  }
}

export default VideoConfirmAvailability
