// @flow
import * as React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import Loading from 'components/Loading'
type PropsType = {
  getRecordings: Function,
  addToPlaylist: Function,
  updateRecording: Function,
  recordings: Object,
  playlist: Array<string>,
  updating: Array<string>
};
type StateType = {
  page: number
};
class Recordings extends React.PureComponent<PropsType, StateType> {
  state = {
    page: 1
  }
  render (): React.Element<'div'> {
    const { recordings, playlist, updating } = this.props

    return (
      <div className='container'>
        <div className='row'>
          {recordings.map((r: Object): React.Element<'div'> => <div
            key={r._id} className='col-xs-12 col-md-3'>
            {playlist.findIndex((p: string): boolean => p === r._id) < 0 ? <div
              data-id={r._id}
              style={{ with: '100%',
                height: 290,
                overflow: 'hidden',
                textAlign: 'center',
                paddingTop: 120,
                display: 'block',
                color: '#9E9E9E',
                boxSizing: 'border-box',
                fontSize: 40,
                backgroundColor: '#f9f9f9',
                marginBottom: 20,
                cursor: 'pointer' }}
              onClick={this._onWatch}>
              شاهد
            </div> : <div style={{ marginBottom: 20,
              height: 290,
              width: '100%',
              padding: 0,
              display: 'block',
              overflow: 'hidden' }}>
              <video className='embed-responsive-item'
                width='100%'
                height='240'
                controls
                autoPlay={false} >
                <source src={`https://el-css2.com/streams/${r.filename}.mp4`}
                  type='video/mp4' />
              متصفحك لا يدعم تشغيل الفيديو
              </video>
              <button onClick={this._update}
                data-id={r._id}
                disabled={updating.findIndex((p: string): boolean => p === r._id) >= 0}
                data-status={'APPROVED'}
                className='btn btn-success'
                style={{ borderRadius: 0, width: '50%', height: 40 }}>لم يغش</button>
              <button onClick={this._update}
                data-id={r._id}
                disabled={updating.findIndex((p: string): boolean => p === r._id) >= 0}
                data-status={'CHEAT'}
                className='btn btn-danger'
                style={{ borderRadius: 0, width: '50%', height: 40 }}>غش</button>
            </div>}
          </div>)}
          <div className='col-xs-12'>
            <VisibilitySensor delayedCall partialVisibility delay={500} onChange={this._loadMore}>
              <div className='text-xs-center'>
                <Loading strokeColor='#3d4d71' />
              </div>
            </VisibilitySensor>
          </div>
        </div>
      </div>
    )
  }
  _onWatch = (e: Object) => {
    const { addToPlaylist } = this.props
    addToPlaylist(e.target.dataset.id)
  }

  _update = (e: Object) => {
    const { updateRecording } = this.props
    const { id, status } = e.target.dataset
    updateRecording(id, status)
  }
  _loadMore = () => {
    const { getRecordings } = this.props
    const { page } = this.state
    this.setState((): Object => ({ page: page + 1 }))
    // console.log(`should load more${page}`)
    getRecordings(page)
  }
}

export default Recordings
