// @flow
import * as React from 'react'
import './style.scss'
type PropsType = {
  openUrl: string,
  join: boolean,
  onCallEnd: Function
};

type StateType = {
  connected: boolean
};

class ZoomVoip extends React.Component<PropsType, StateType> {
  static defaultProps = {
    onCallEnd: () => {}
  }
  render (): React.Element<'div'> {
    const { openUrl, join } = this.props
    return (
      <div className='RTCVoip-container'>
        <a href={openUrl} className='btn btn-success btn-block' target='_blank'>
          <i className='material-icons m-l-1' style={{ verticalAlign: 'middle', display: 'inline-block' }}>call</i>
          {!join ? 'بدأ المكالمة' : 'الرد على مكالمة من الدعم الفني'}
        </a>
        <button className='btn btn-danger btn-block' onClick={this._endCall}>
          <i className='material-icons m-l-1' style={{ verticalAlign: 'middle', display: 'inline-block' }}>call_end</i>
          {!join ? 'انهاء المكالمة' : 'رفض'}
        </button>
      </div>
    )
  }

  _call = () => {
  }

  _onStream = (session: Object) => {
  }

  _onStreamEnd = (event: Object) => {
  }
  _endCall = () => {
    const { onCallEnd } = this.props
    onCallEnd()
  }
}

export default ZoomVoip
