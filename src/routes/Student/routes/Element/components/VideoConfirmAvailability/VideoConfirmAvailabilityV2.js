// @flow
import React, { useCallback, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'
import usePageVisible from 'hooks/usePageVisible'
import { secondNumberToString, toHHMMSS } from 'utils'
import { resetTimer, updateVideoSeek } from 'routes/Student/modules/element_video'

type PropsType = {
  timer: number,
  id: number,
  seeked: number,
  cycle: number,
  seeking: boolean,
  threshold: number,
  enabled: boolean,
  duration: number,
  currentTime: number,
  playing: boolean,
  playVideo: Function,
  pauseVideo: Function,
  refreshSeek: Function,
  showgrademessage: boolean
};

type StateType = {
  elementId: number
};

const VideoConfirmAvailability = (props: PropsType, state: StateType): React.Element<'div'> => {
  const {
    id,
    seeked,
    duration,
    currentTime,
    playing,
    playVideo,
    pauseVideo,
    refreshSeek,
    enabled } = props

  if (!enabled) {
    return <div />
  }

  const { timer, cycle, threshold, seeking, showgrademessage } =
  useSelector((state: Object): Object => state.elementvideo)

  const { visibilityState } = usePageVisible()
  const dispatch = useDispatch()

  useEffect(() => {
    // pause play video based n page visibility
    if (visibilityState === 'hidden' && playing) {
      pauseVideo()
    } else if (visibilityState !== 'hidden' && !playing) {
      // playVideo()
    }
  }, [visibilityState])

  useEffect(() => {
    // update seek position every 30 seconds
    if (
      enabled &&
      currentTime % 30 === 0 &&
      currentTime !== seeked &&
      currentTime >= 1 &&
      !seeking
    ) {
      refreshSeek()
      dispatch(updateVideoSeek(id, currentTime))
    }
  }, [currentTime])

  useEffect(() => {
    if (((cycle - timer) <= 0) && enabled) {
      pauseVideo()
    }
  }, [cycle, timer])

  const _resetTimer = useCallback(() => {
    dispatch(resetTimer())
    playVideo()
  })

  const percentage = currentTime / duration * 100
  const seekedPercentage = seeked / duration * 100
  console.log(timer, cycle, threshold, (cycle - threshold))
  const showCheck = timer < (cycle - threshold)

  return (
    <div>
      <div
        className={`label label-success
        c-video-confirm-availability__grademessage shadow-1 ${!showgrademessage ? 'hidden-xs-up' : ''}`}
      >
        لقد حصلت على درجة مشاهدة الدرس
      </div>
      <div className='c-video-confirm-availability__overlay'
        style={{ visibility: playing ? 'visible' : 'hidden' }} />
      <div className='c-video-confirm-availability__bar-outer'>
        <div className='c-video-confirm-availability__bar' style={{ width: `${percentage}%` }}>
          <div className='c-video-confirm-availability__seconds'>
            {toHHMMSS(currentTime)}/{toHHMMSS(duration)}
          </div>
        </div>
        <div className='c-video-confirm-availability__seek' style={{ width: `${seekedPercentage}%` }} />
      </div>
      <div
        className={`c-video-confirm-availability__container shadow-1
        ${showCheck ? 'hidden-xs-up' : ''}`}
        onClick={_resetTimer}
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

export default memo(VideoConfirmAvailability)
