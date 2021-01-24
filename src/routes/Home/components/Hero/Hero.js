// @flow
import React, { useEffect, useCallback, useMemo, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from 'modules/modals'
import { getRegistrationPeriod } from 'modules/registration_period'
import moment from 'moment'
import { Link } from 'react-router'
import { Translate } from 'react-localize-redux'
import Icon from 'components/Icon'
import videoPoster from 'static/img/hero.jpg'
// css
import './Hero.scss'

const Hero = (): React.Element<'div'> => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRegistrationPeriod())
  }, [])

  const { periods } = useSelector((state: Object): Object => state.registration_period)
  const { isAuthenticated } = useSelector((state: Object): Object => state.auth)
  const { isMobile } = useSelector((state: Object): Object => state.ui)
  const period = periods[0]
  const majesteer = false

  const _showVideo = useCallback(() => {
    dispatch(showModal('youtube', { youtubeId: 'fM4js-zWkxg' }, true, true, isMobile ? 'full' : 'medium'))
  }, [])

  const data = useMemo((): React.Element => (typeof period !== 'undefined' && !isAuthenticated) ? <div>
    <div className='c-hero__open-text p-y-2'>
      <div className='m-b-1'>
        <Translate id='hero.registration_open' />
      </div>
      <Translate id='global.from' /> <b>{moment(period.start_at).locale('en').format('YYYY-MM-DD')}</b>
      <Translate id='global.to' /> <b>{moment(period.finish_at).locale('en').format('YYYY-MM-DD')}</b>
    </div>
    <Link to='/programmes' poster={videoPoster} className={`m-t-1 c-hero__button btn btn-lg
      ${majesteer ? 'btn-purple' : 'btn-success'}`}>
      <Translate id={majesteer ? 'hero.register_majesteer' : 'hero.view_register'} />
    </Link>
  </div> : <div>
    <Link to='/programmes' className={`c-hero__button m-t-3 btn btn-lg
      ${majesteer ? 'btn-purple' : 'btn-success'}`}>
      <Translate id='hero.view' />
    </Link>
  </div>, [period])

  return (
    <div className={`c-hero text-xs-center ${majesteer ? 'is-majesteer' : ''}`} >
      <video data-src={`https://el-css2.com/cdn/videos/${isMobile ? 'mobile' : 'desktop'}-video-swaped.mp4`}
        type='video/mp4'
        autoPlay muted loop className='c-hero__video' />
      <div className={`c-hero__container p-t-3 ${majesteer ? 'is-majesteer' : ''}`}>
        <div className='container p-t-3'>
          <h1 className='c-hero__title'>
            <Translate id={majesteer ? 'hero.learn_majesteer' : 'hero.learn'} />
          </h1>
          <div className='c-hero__period'>
            {data}
            {!majesteer ? <button role='button' aria-label='play'
              className='m-y-2 c-hero__show-video' onClick={_showVideo}>
              <Icon name='play-white-circle' />
            </button> : null }
            { !majesteer ? <p className='c-hero__short-video'>
              <Translate id='hero.view_video' />
            </p> : null }
          </div>
        </div>
      </div>
    </div>
  )
}

Hero.defaultProps = {
  getRegistrationPeriod: () => {},
  periods: [],
  loading: false
}

export default memo(Hero)
