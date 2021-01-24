// @flow
import * as React from 'react'
import Loading from 'components/Loading'
import { Scrollbars } from 'react-custom-scrollbars'

import './style.scss'

type PropsType = {
  videosLoading: boolean,
  visible: boolean,
  onItemSelected: Function,
  videos: Array<Object>
};

type StateType = {
  videos: Array<Object>,
  searchTerm: string
};

class Videos extends React.Component<PropsType, StateType> {
  inputRef = React.createRef()
  state = {
    searchTerm: '',
    videos: this.props.videos || []
  }
  render (): React.Element<'div'> {
    const { videosLoading, visible } = this.props
    const { videos } = this.state

    if (videosLoading) return <Loading />
    return (
      <div className={`v2-ticket-videos ${visible ? '' : 'hidden-xs-up'}`}>
        <div className='v2-ticket-videos__search'>
          <input type='text'
            onKeyUp={this._search}
            ref={this.inputRef}
            placeholder='البحث عن شرح'
            className='form-control' />
          <i className='material-icons'>search</i>
        </div>
        <div className='v2-ticket-videos__items'>
          <Scrollbars>
            {videos.map((t: Object): React.Element<'div'> =>
              <div className='col-xs-6' key={t.id} >
                <VideoItem {...t} onChange={this._onChange} />
              </div>)}
          </Scrollbars>
        </div>
      </div>
    )
  }
  _onChange = (value: string) => {
    const { onItemSelected } = this.props
    onItemSelected(value)
  }

  _search = () => {
    const { videos } = this.props
    const value = this.inputRef.current.value
    const filtered = videos.filter((t: Object): boolean =>
      (t.title.search(value) >= 0))
    this.setState((): Object => ({ videos: filtered, searchTerm: value }))
  }
}
type ReplyPropsType = {
  title: string,
  url: string,
  onChange: Function
};

class VideoItem extends React.Component<ReplyPropsType> {
  render (): React.Element<'div'> {
    const { title, url } = this.props
    const youtubeString = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
    const youtubeId = (youtubeString !== null && typeof youtubeString !== 'undefined') ? youtubeString[1] : ''

    return (<div onClick={this._onChange}
      className='v2-ticket-videos__item m-t-1'>
      <div className='v2-ticket-videos__thumb'>
        <img className='img-fluid'
          src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`} alt={title} />
      </div>
      <h4 className='v2-ticket-videos__title'>{title}</h4>
    </div>)
  }
  _onChange = () => {
    const { url, onChange } = this.props
    onChange(url)
  }
}
export default Videos
