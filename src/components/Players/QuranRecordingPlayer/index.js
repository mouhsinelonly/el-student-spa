// @flow
import * as React from 'react'
import { getRandom } from 'utils'
type PropsType = {
  streamName: string,
  className: string,
  height: number,
  width: string,
  autoPlay: boolean,
  controls: boolean
};

class QuranRecordingPlayer extends React.Component<PropsType> {
  static defaultProps = {
    controls: true,
    width: '100%',
    height: 360
  }
  render (): React.Element<'video'> {
    const { streamName, className, height, autoPlay, controls, width } = this.props
    const tilawaServer = typeof streamName !== 'undefined' ? streamName.indexOf('html5') >= 0
    ? 'https://tilawa.el-css.edu.om/mp4s/'
    : 'https://el-css2.com/streams/' : ''

    return (<video className={className || 'embed-responsive-item'}
      width={width}
      height={height}
      controls={controls}
      autoPlay={autoPlay === true} >
      <source src={`${tilawaServer}${streamName}.webm`}
        type='video/webm' />
      <source src={`${tilawaServer}${streamName}.mp4?t=${getRandom(98236782, 98394787823)}`}
        type='video/mp4' />
      متصفحك لا يدعم تشغيل الفيديو
    </video>)
  }
}

export default QuranRecordingPlayer
