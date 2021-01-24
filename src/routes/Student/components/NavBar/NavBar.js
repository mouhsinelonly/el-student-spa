// @flow
import React, { useEffect, useRef, useCallback, memo } from 'react'
import { Link, IndexLink } from 'react-router'
import Headroom from 'headroom.js'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import ImageZoom from 'react-medium-image-zoom'
import { showNavbarDropdown, hideNavbarDropdown } from 'routes/Student/modules/ui'
import { logoutAndRedirect } from 'routes/Auth/modules/auth'
import logoImg from 'static/img/logo-light.png'
import smallLogoImg from 'static/img/64x64.png'
import './style.scss'
import Icon from 'components/Icon'

import Dot from 'components/Notifications/Dot'

const NavBar = memo((): React.Element<'nav'> => {
  const dispatch = useDispatch()
  const navbarEl = useRef(null)
  useEffect((): Function => {
    const _headroom = new Headroom(navbarEl.current)
    _headroom.init()
    return (): Function => {
      _headroom && _headroom.destroy()
      document.querySelector('body').style.paddingTop = '0px'
    }
  }, [])
  const { profile } = useSelector((state: Object): Object => state.student)
  const { libraryvisible } = useSelector((state: Object): Object => state.library)
  const serverdate = useSelector((state: Object): Object => state.serverdate)
  const { dropdownvisible } = useSelector((state: Object): Object => state.studentui)
  const events = useSelector((state: Object): Object => state.semester_events.data)
  let resultsEnabled = false
  if (events.length) {
    const resultEvent = events.find((e: Object): boolean => e.category === 'result')
    if (resultEvent) {
      const serverTime = moment(serverdate)

      const resultEventStartAt = moment(`${resultEvent.start_at} ${resultEvent.time_start_at}`)
      const resultEventFinishAt = moment(`${resultEvent.finish_at} ${resultEvent.time_finish_at}`)
      if (resultEventStartAt.isBefore(serverTime) && resultEventFinishAt.isAfter(serverTime)) {
        resultsEnabled = true
      }
    }
  }
  const isActive = profile.state === 'active'

  const _logOut = useCallback(() => {
    dispatch(logoutAndRedirect())
  }, [])

  const _toggleDropdown = useCallback(() => {
    if (dropdownvisible) {
      dispatch(hideNavbarDropdown())
    } else {
      dispatch(showNavbarDropdown())
    }
  }, [])
  return (<nav id='studentnavbar'
    ref={navbarEl}
    className={`navbar navbar-dark student-navbar__bg ${libraryvisible ? 'is-library' : ''}`}>
    <div className='container'>
      <div className='collapse navbar-toggleable-xs' reference='collapse'>
        <Link to='/student' className='navbar-brand student-navbar__brand pull-sm-right'>
          <img className={`student-navbar__logo img-fluid hidden-xs-down`} src={logoImg} alt='نظام دارس ' />
          <img className={`student-navbar__logo-small img-fluid hidden-sm-up`} src={smallLogoImg} alt='نظام دارس ' />
        </Link>
        <ul className='nav student-navbar__nav navbar-nav pull-sm-left'>
          <li className='student-navbar__nav-item nav-item hidden-xs-down'>
            <IndexLink to='/student' className={`nav-link student-navbar__nav-link
              ${libraryvisible ? 'is-library' : ''}`} activeClassName='active'>
           الرئيسية
            </IndexLink>
          </li>
          <li className={`student-navbar__nav-item nav-item ${!isActive ? 'hidden-xs-up' : ''}`}>
            <Link to='/student/library'
              activeClassName='active'
              className={`nav-link student-navbar__nav-link ${libraryvisible ? 'is-library' : ''}`}>
              المكتبة
            </Link>
          </li>
          <li className='student-navbar__nav-item nav-item'>
            <Link to='/student/market'
              activeClassName='active'
              className={`nav-link student-navbar__nav-link ${libraryvisible ? 'is-library' : ''}`}>
              المتجر
            </Link>
          </li>
          <li className={`student-navbar__nav-item nav-item ${!isActive ? 'hidden-xs-up' : ''}`}>
            <Link to='/student/schedule'
              activeClassName='active'
              className={`nav-link student-navbar__nav-link ${libraryvisible ? 'is-library' : ''}`}>
              <span className='hidden-xs-down'>التقويم الأكاديمي</span>
              <span className='hidden-sm-up'>التقويم</span>
            </Link>
          </li>
          <li className='student-navbar__nav-item nav-item'>
            <Link to='/student/results' activeClassName='active' className={`nav-link student-navbar__nav-link
              ${libraryvisible ? 'is-library' : ''}`}>
                النتائج
              {resultsEnabled && <Dot blink className='student-navbar__results-notification' />}
            </Link>
          </li>
          <li className={`student-navbar__nav-item nav-item student-navbar__drop-nav-item`}>
            <div className='col-xs-12 col-sm-3 text-xs-center student-navbar__user-avatar'>
              <ImageZoom
                image={{
                  src: profile && profile.photo ? profile.photo.thumb : null,
                  alt: profile.name,
                  className: 'img-circle'
                }}
                zoomImage={{
                  src: profile && profile.photo ? profile.photo.large : null,
                  alt: profile.name,
                  className: 'img-circle'
                }} />
            </div>
            <div className={`hidden-xs-down col-sm-7 student-navbar__user-info
              ${libraryvisible ? 'is-library' : ''}`}>
              <div className='student-navbar__user-info__name text-nowrap'>{profile.name}</div>
              <div className='student-navbar__user-info__code text-nowrap'>رقمك : {profile.username}</div>
            </div>
            <button disabled={typeof profile.id === 'undefined'}
              className='student-navbar__drop-nav-item__trigger' onClick={_toggleDropdown}>
              <Icon name={`${libraryvisible ? 'drop-down-library' : 'drop-down'} drop-down`} />
            </button>
            <ul className={`student-navbar__drop-nav-item__drop text-xs-center
              ${!dropdownvisible ? 'hidden-xs-up' : ''}`}>
              <li className='student-navbar__drop-nav-item__drop__half'>
                <Link to='/student/profile'>
                  <Icon name='gear-gray-medium' className='m-b-1' />
                  <div>إعدادات الحساب</div>
                </Link>
              </li>
              <li className='student-navbar__drop-nav-item__drop__half'>
                <Link to='/student/payments'>
                  <Icon name='credit-card-gray-medium' className='m-b-1' />
                  <div>المالية و الدفع</div>
                </Link>
              </li>
              <li className='student-navbar__drop-nav-item__drop__half'>
                <Link to='/student/docs'>
                  <Icon name='docs-gray-medium' className='m-b-1' />
                  <div>الخطابات</div>
                </Link>
              </li>
              <li className='student-navbar__drop-nav-item__drop__half'>
                <Link to='/student/orders'>
                  <Icon name='plus-gray-medium' className='m-b-1' />
                  <div>التأجيل و الانسحاب</div>
                </Link>
              </li>
              <Link className='student-navbar__drop-nav-item__drop__full hidden-xs-up' to='/student/facematching'>
                التحقق من الصورة
              </Link>
              <li className='student-navbar__drop-nav-item__drop__full' onClick={_logOut}>
                تسجيل الخروج
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>)
})

export default NavBar
