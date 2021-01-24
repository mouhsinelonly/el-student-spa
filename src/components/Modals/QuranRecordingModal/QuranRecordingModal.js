import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Player from 'components/Players/QuranRecordingPlayer'

class QuranRecordingModal extends Component {
  constructor (props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
    this._onAccept = this._onAccept.bind(this)
  }

  closeModal () {
    const { closeModal } = this.props
    closeModal('youtube')
  }

  _onAccept () {
    const { postAcceptRecording, subjectId, closeModal } = this.props
    postAcceptRecording(subjectId)
    closeModal('youtube')
  }

  render () {
    const { streamName, valid } = this.props

    return (<div className='shadow-modal'>
      <div className='embed-responsive embed-responsive-16by9'>
        <Player streamName={streamName} />
      </div>
      <button className={`btn btn-success m-y-2 m-x-auto ${valid && 'hidden-xs-up'}`}
        style={{ display: 'block' }} onClick={this._onAccept}>
          قبول و ارسال للتصحيح
      </button>
      <div className='clearfix' />
    </div>)
  }
}

QuranRecordingModal.propTypes = {
  streamName: ''
}

QuranRecordingModal.propTypes = {
  closeModal: PropTypes.func,
  valid: PropTypes.number,
  subjectId: PropTypes.number,
  postAcceptRecording: PropTypes.func,
  streamName: PropTypes.string
}

export default QuranRecordingModal
