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

class RTCVoip extends React.Component<PropsType, StateType> {
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
  roomId = 0
  localStreamId = 0
  phone = null
  // $FlowFixMe

  componentWillUnmount () {
    window.io = null
    this._endCall()
  }
  componentDidMount () {
    const { remoteUserId, localUserId, autoConnect, join } = this.props
    this.roomId = `g${remoteUserId}hjhjh${localUserId}g`
    this.phone = PHONE({
        number        : join ? remoteUserId : localUserId,
        publish_key   : 'pub-c-1a5e7ec2-e4ef-4c3a-a2b2-b179ee0ed8df',
        subscribe_key : 'sub-c-b669078a-4a1f-11e8-9740-2a794453019a',
        ssl           : true
    })
    // this.videoContainer.current.append(phone.video)
    // As soon as the phone is ready we can make calls
    this.phone.camera.ready((video) => {
      this.videoContainer.current.appendChild(video);
    })
    this.phone.ready(() => {
        // Dial a Number and get the Call Session
        // For simplicity the phone number is the same for both caller/receiver.
        // you should use different phone numbers for each user.
        const session = this.phone.dial(!join ? remoteUserId : localUserId);
        // phone.startcamera()
        // this.videoContainer.current.appendChild(session.video);
    })

    // When Call Comes In or is to be Connected
    this.phone.receive((session) => {
        // Display Your Friend's Live Video
        session.connected((session) => {
            this.videoContainer.current.appendChild(session.video)
        })

    })
    return
    this.connection = new RTCMultiConnection()
    // this.connection.socketMessageEvent = 'pubnub-demo'

    // this.connection.setCustomSocketHandler(PubNubConnection)

    // this.connection.session = {
    //   audio: true,
    //   video: true
    // }

    // this.connection.sdpConstraints.mandatory = {
    //   OfferToReceiveAudio: true,
    //   OfferToReceiveVideo: true
    // }

    // this.connection.videosContainer = this.videoContainer.current
    // this.connection.onstream = this._onStream

    // if (autoConnect) {
    //   this._call()
    // }
    // return
    // const { remoteUserId, localUserId, autoConnect, join } = this.props
    // this.roomId = `g${remoteUserId}hjhjh${localUserId}g`
    window.io = io
    // by default, socket.io server is assumed to be deployed on your own URL
    // this.connection.socketURL = '/'
    // comment-out below line if you do not have your own socket.io server
    // this.connection.socketURL = 'https://el-css.com/'
    this.connection.socketURL = 'https://el-css.com:9001/'

    // first step, ignore default STUN+TURN servers
    // this.connection.iceServers = []

    // // second step, set STUN url
    // this.connection.iceServers.push({
    //   urls: 'stun:yourSTUN.com:port'
    // })

    // // last step, set TURN url (recommended)
    // this.connection.iceServers.push({
    //   urls: 'turn:yourTURN.com:port',
    //   credential: 'password',
    //   username: 'username'
    // })

    this.connection.socketMessageEvent = 'video-conference-demo'
    this.connection.session = {
      audio: true,
      video: true
    }
    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    }
    this.connection.videosContainer = this.videoContainer.current

    this.connection.onstream = this._onStream
    this.connection.onstreamended = this._onStreamEnd

    this.connection.maxParticipantsAllowed = 1
    this.connection.onRoomFull = this._onRoomFull

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
    const { join } = this.props
    this.setState((): Object => ({ calling: true }))
    if (!join) {
      this.connection.open(this.roomId)
    } else {
      this.connection.join(this.roomId)
    }
  }

  _onStream = (event: Object) => {
    const width = parseInt(this.connection.videosContainer.clientWidth / 2)
    const mediaElement = getMediaElement(event.mediaElement, {
      title: event.userid,
      buttons: ['full-screen'],
      width: width,
      height: this.connection.videosContainer.clientHeight,
      showOnMouseEnter: false
    })
    mediaElement.width = width
    mediaElement.controls = false
    this.setState((): Object => ({ connected: true, calling: false }))
    this.connection.videosContainer.appendChild(mediaElement)
    mediaElement.id = event.streamid
    mediaElement.media.play()
    setTimeout(() => {
      if (mediaElement !== null && typeof mediaElement !== 'undefined') {
        mediaElement.media.play()
      }
    }, 5000)
  }

  _onStreamEnd = (event: Object) => {
    const { onCallEnd } = this.props
    const mediaElement = document.getElementById(event.streamid)
    if (mediaElement && mediaElement.parentNode != null) {
      mediaElement.parentNode.removeChild(mediaElement)
    }
    onCallEnd()
  }
  _endCall = () => {
    const { onCallEnd } = this.props
    this.setState((): Object => ({ calling: false, connected: false }))
    this.connection.close()
    this.connection.leave()
    this.connection.closeSocket()
    this.connection.attachStreams.forEach(function (stream: Object) {
      stream.stop()
    })
    onCallEnd()
  }

  _onRoomFull = (roomid: number) => {
    const { onCallEnd } = this.props
    this.connection.closeSocket()
    this.connection.attachStreams.forEach(function (stream: Object) {
      stream.stop()
    })
    onCallEnd()
    alert('المكالمة ممتلئة..')
  }
}

export default RTCVoip
