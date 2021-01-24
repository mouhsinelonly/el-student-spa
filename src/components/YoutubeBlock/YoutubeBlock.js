// @flow
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'components/Icon'
import { showModal } from 'modules/modals'
import './YoutubeBlock.scss'

type PropertiesType = {
    link: string,
    id: number,
    title: string
  };

const VideoElement = (properties: PropertiesType): React.Element<'Link'> => {
  const { id, title } = properties

  const { isMobile } = useSelector((state: Object): Object => state.ui)
  const dispatch = useDispatch()
  const _showVideo = useCallback(() => {
    dispatch(showModal('youtube', { youtubeId: id }, true, true, isMobile ? 'full' : 'medium'))
  }, [])

  if (!id) return <div />

  return <div onClick={_showVideo} className='YoutubeBlock__container'>
    <section className='YoutubeBlock__container__thumb'>
      <img src={`//img.youtube.com/vi/${id}/hqdefault.jpg`} className='img-fluid' />
      <Icon name='play-white-circle' className='YoutubeBlock__container__icon' />
    </section>
    <footer className='YoutubeBlock__container__footer p-a-2 text-xs-center'>
      {title}
    </footer>
  </div>
}

export default VideoElement
