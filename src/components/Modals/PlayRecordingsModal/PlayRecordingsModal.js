// @flow
import * as React from 'react'
import QuranRecordingPlayer from 'components/Players/QuranRecordingPlayer'

//  import css
import './style.scss'
type PropsType = {
  streams: string,
  closeModal: Function
};

class PlayRecordingsModal extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { streams } = this.props
    return (<div className='row c-playstreams-modal p-a-3'>
      {streams ? streams.split(',').map((name: string, i: number): React.Element<'div'> =>
        <div className='col-xs-12 col-md-6 m-b-2' key={i}>
          <div className='shadow-modal embed-responsive embed-responsive-16by9'>
            <QuranRecordingPlayer
              autoPlay={false}
              className=''
              controls
              height={360}
              width={240}
              streamName={name.split('.')[0]} />
          </div>
        </div>) : null}
    </div>)
  }
  _onNo = () => {
    const { closeModal } = this.props
    closeModal()
  }
}

export default PlayRecordingsModal
