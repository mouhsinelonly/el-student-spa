import React from 'react'
const { red5prosdk } = require('libs/red5pro-sdk.min.js')

const rtcPublisher = new red5prosdk.RTCPublisher()
const rtcSubscriber = new red5prosdk.RTCSubscriber()

var config = {
  protocol: 'wss',
  host: 'el-css.com',
  port: 8083,
  app: 'live',
  streamName: 'mouhsine',
  iceServers: [{ urls: 'stun:el-css.com:5349' }]
}

class Red5Pro extends React.Component {
  componentDidMount () {}
  render () {
    return (
      <div>
        v
        <video
          id='red5pro-publisher'
          ref={video => {
            this.publish(video)
          }}
          width='640'
          height='480'
          muted
          autoPlay
        />
      </div>
    )
  }

  publish = video => {
    if (!video) return
    rtcPublisher
      .init(config)
      .then(() => {
        // On broadcast started, subscribe.
        // rtcPublisher.on(red5prosdk.PublisherEventTypes.PUBLISH_START, this.subscribe)
        return rtcPublisher.publish()
      })
      .then(() => {
      })
      .catch(err => {
        console.error('Could not publish: ' + err)
      })
  }
}

export default Red5Pro
