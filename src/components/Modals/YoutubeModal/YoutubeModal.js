// @flow
import * as React from 'react'
//  import css

type PropsType = {
  closeModal: Function,
  youtubeId: string
};

class YoutubeModal extends React.PureComponent<PropsType> {
  closeModal = () => {
    const { closeModal } = this.props
    closeModal('youtube')
  }
  render (): React.Element<'div'> {
    const { youtubeId } = this.props

    return (<div className='shadow-modal embed-responsive embed-responsive-16by9' style={{ lineHeight: 0 }}>
      <iframe
        style={{ lineHeight: 0 }}
        className='embed-responsive-item'
        src={`//www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&showinfo=0&color=white&autoplay=1`} />
    </div>)
  }
}

export default YoutubeModal
