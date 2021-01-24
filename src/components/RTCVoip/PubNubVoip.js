// @flow
import * as React from 'react'
import io from 'socket.io-client'
import './style.scss'
type PropsType = {
  remoteUserId: number,
  localUserId: number,
  autoConnect: boolean,
  onCallEnd: Function,
  join: boolean
};

type StateType = {
  calling: boolean,
  connected: boolean
};

class PubNubVoip extends React.Component<PropsType, StateType> {
  static defaultProps = {
    remoteUserId: 0,
    localUserId: 1,
    onCallEnd: () => {},
    join: false,
    autoConnect: false
  }
  state = {
    calling: false,
    connected: false
  }
  // $FlowFixMe
  videoContainer = React.createRef()
  localStreamId = 0
  phone = null
  // $FlowFixMe

  componentWillUnmount () {
    window.io = null
    this._endCall()
  }
  componentDidMount () {
    const { localUserId, autoConnect, remoteUserId, join } = this.props
    this.phone = PHONE({
        number        : localUserId,
        publish_key   : 'pub-c-1a5e7ec2-e4ef-4c3a-a2b2-b179ee0ed8df',
        subscribe_key : 'sub-c-b669078a-4a1f-11e8-9740-2a794453019a',
        ssl           : true
    })
    // this.phone.ready(() => {
    //   setTimeout(() => {
    //     this.phone.dial(remoteUserId);
    //   }, join ? 1000 : 0)
    // })
    // this.videoContainer.current.append(phone.video)
    // As soon as the phone is ready we can make calls
    this.phone.camera.ready((video) => {
      this.videoContainer.current.append(video);
    })

    // When Call Comes In or is to be Connected
    this.phone.receive((session) => {
        session.connected((session) => {
          if (this.videoContainer.current != null) {
            this.videoContainer.current.append(session.video);
          }
        })
        session.ended((session) => {
          if (this.videoContainer.current != null) {
            // this.videoContainer.current.removeChild(session.video)
          }
        })
    })
    if (autoConnect) {
      this._call()
    }
  }
  render (): React.Element<'div'> {
    const { connected, calling } = this.state
    const { join } = this.props
    return (
      <div className='RTCVoip-container'>
        <div ref={this.videoContainer} className='RTCVoip-container__videos' >
          { !connected && join ? <div className='p-a-2 hidden-xs-up'>لديك اتصال من الدعم الفني....</div> : '' }
        </div>
        <button disabled={calling} className={`btn btn-success RTCVoip-container__action m-a-1
          ${connected ? 'hidden-xs-up' : ''}`}
          onClick={this._call}>
          <span className='material-icons' style={{ display: 'inline-block', verticalAlign: 'middle' }}>call</span>
        </button>
        <button className={`btn btn-danger RTCVoip-container__action m-a-1 ${!connected ? 'hidden-xs-up' : ''}`}
          onClick={this._endCall}>
          <span className='material-icons' style={{ display: 'inline-block', verticalAlign: 'middle' }}>call_end</span>
        </button>
      </div>
    )
  }

  _call = () => {
    const { join,remoteUserId } = this.props
    // this.setState((): Object => ({ calling: true }))
    this.phone.ready(() => {
      this.phone.dial(remoteUserId)
    })
  }

  _onStream = (session: Object) => {
    // this.setState((): Object => ({ connected: true, calling: false }))
    session.connected((session) => {
      // console.log(session)
      this.videoContainer.current.appendChild(session.video)
    })
  }

  _onStreamEnd = (event: Object) => {
    onCallEnd()
  }
  _endCall = () => {
    const { onCallEnd } = this.props
    // this.setState((): Object => ({ calling: false, connected: false }))
    this.phone.hangup()
    onCallEnd()
  }
}

export default PubNubVoip
