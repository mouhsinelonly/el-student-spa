// @flow
import * as React from 'react'
import './Opinions.scss'
import { isMobile } from 'utils'
import Icon from 'components/Icon'
import { Translate } from 'react-localize-redux'
import opinions from 'static/data/opinions.json'
type PropsType = {
  showModal: Function
};
class Opinions extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { showModal } = this.props
    return (
      <div className='opinions text-xs-center'>
        <h2 className='opinions__title'>
          <Translate id='home.opinions' />
        </h2>
        <div className='container'>
          <div className='opinions__items  row'>
            {opinions.map((o: Object, i: string): React.Element<'div'> => (<div key={i} className='col-xs-12 col-md-3'>
              <OpinionBlock {...o} showModal={showModal} />
            </div>))}
          </div>
        </div>
        <div className='clearfix' />
      </div>
    )
  }
}
type OpinionType = {
  youtubeId: string,
  title: string,
  showModal: Function
};

class OpinionBlock extends React.Component<OpinionType> {
  render (): React.Element<'article'> {
    const { youtubeId, title } = this.props
    return (<article className='opinions__item' onClick={this._openModal}>
      <section className='opinions__item__thumbnail' >
        <Icon name='play-white-circle' className='opinions__item__play' />
        <img loading='lazy'
          className='img-fluid' src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} alt={title} />
      </section>
      <footer>
        <h5 className='opinions__item__title'>
          <Translate id={title} />
        </h5>
      </footer>
    </article>)
  }

  _openModal = () => {
    const { youtubeId, showModal } = this.props
    showModal('youtube', { youtubeId: youtubeId }, true, true, isMobile() ? 'full' : 'medium')
  }
}

export default Opinions
