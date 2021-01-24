// @flow
import React, { useEffect, useRef, memo, useMemo } from 'react'
import Headroom from 'headroom.js'
import { Translate } from 'react-localize-redux'
import LanguageToggle from 'components/LanguageToggle'
import './Navbar.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
// import assets
import logoAr from 'static/img/logo-ar.png'
import logoFr from 'static/img/logo-fr.png'
import logoEn from 'static/img/logo-en.png'
import MobileNavbar from './MobileNavbar'
import WideAlert from 'components/WideAlert'
const logos = {}

logos.ar = logoAr
logos.en = logoEn
logos.fr = logoFr

type PropsType = {
  children: Array<React.Element<'div'>>,
  token: string,
  className: string,
  library: boolean,
  market: boolean
};
const Navbar = memo((props: PropsType): React.Component<PropsType> => {
  const navbarRef = useRef()
  const { library, children, market } = props
  const { periods } = useSelector((state: Object): Object => state.registration_period)
  const { isMobile } = useSelector((state: Object): Object => state.ui)
  const { token } = useSelector((state: Object): Object => state.auth)

  const period = typeof periods !== 'undefined' && periods.length ? periods[0] : null
  useEffect((): Function => {
    const _headroom = new Headroom(navbarRef.current)
    _headroom.init()
    return (): Function => {
      _headroom && _headroom.destroy()
      document.querySelector('body').style.paddingTop = '0px'
    }
  }, [])
  let loginLink = `/auth`
  if (library) {
    loginLink = '/library/home'
  } else if (market) {
    loginLink = '/eshop/dashboard'
  }
  useEffect((): Function => {
    setImmediate(() => {
      if (navigator.userAgent !== 'ReactSnap') {
        document.querySelector('body').style.paddingTop = navbarRef.current.getBoundingClientRect().height + 'px'
      }
    })
    return () => {
      document.querySelector('body').style.paddingTop = '0px'
    }
  }, [periods])
  const defaultMenu = useMemo((): Array<React.Element> => [<li className='nav-item' key='1'>
    <Link activeClassName='is-active'
      className='c-navbar__nav-link'
      to='/info'>
      <Translate id='home.navbar_study' />
    </Link>
  </li>,
    <li className={`${!__DEV__ ? 'hidden-xs-up' : ''} nav-item`} key='2'>
      <Link activeClassName='is-active'
        className='c-navbar__nav-link'
        to='/library'>
        المكتبة
      </Link>
    </li>,
    <li className='nav-item' key='3'>
      <Link activeClassName='is-active'
        className='c-navbar__nav-link'
        to='/our_vision'>
        <Translate id='home.navbar_about' />
      </Link>
    </li>,
    <li className='nav-item' key='4'>
      <Link activeClassName='is-active'
        className='c-navbar__nav-link' to='/blog'>
        <Translate id='home.navbar_news' />
      </Link>
    </li>,
    <li className='nav-item' key='5'>
      <Link activeClassName='is-active'
        className='c-navbar__nav-link' to='/contact'>
        <Translate id='home.navbar_contact' />
      </Link>
    </li>,
    <li className='nav-item' key='89'>
      <Link activeClassName='is-active'
        className='c-navbar__nav-link' to='/eshop'>
        <Translate id='home.navbar_eshop' />
      </Link>
    </li>,
    <li className={`${library ? 'hidden-xs-up' : ''} nav-item`} key='6'>
      <Link className={`btn c-navbar__login-btn btn-white`}
        to={loginLink}>
        { token
        ? <Translate id='home.my_account' />
        : <Translate id='home.navbar_login' /> }
      </Link>
    </li>,
    <li className={`${!library ? 'hidden-xs-up' : ''} nav-item`} key='7'>
      <Link className={`btn c-navbar__login-btn btn-brown is-library`}
        to={loginLink}>
        { token
        ? <Translate id='home.my_account' />
        : <Translate id='home.library_navbar_login' /> }
      </Link>
    </li>], [library, token, __DEV__])
  return (
    <Translate>
      {({ activeLanguage }: Object): React.Element<'nav'> => (
        <nav id='TopNavbar'
          ref={navbarRef}
          className={`navbar c-navbar ${props.className} 
          ${activeLanguage && activeLanguage.code === 'ar' ? '' : 'is-ltr'}`}>
          <LanguageToggle />
          { navigator.userAgent !== 'ReactSnap' && period && <WideAlert>
            تم تمديد التسجيل إلى تاريخ<span className='WideAlert__number m-x-1'>
              {moment(period.finish_at).locale('en').format('DD ')}
              {moment(period.finish_at).locale('ar').format('MMMM')}
            </span>، سارع إلى التسجيل
          </WideAlert> }
          <div className='container'>
            <ul className='nav navbar-nav'>
              <li className='nav-item active'>
                <Link to='/' className='nav-link' >
                  <img src={logos[activeLanguage && activeLanguage.code ? activeLanguage.code : 'ar']}
                    alt='برنامج التَّعليم عَنْ بُعد'
                    className={`c-navbar__logo`} />
                </Link>
              </li>
            </ul>
            <ul className={`nav navbar-nav
              pull-xs-${activeLanguage && activeLanguage.code === 'ar' ? 'left' : 'right'}
                hidden-xs-down c-navbar__links`}>
              {children || defaultMenu}
            </ul>
            <Link to='/auth'
              className='btn btn-white hidden-sm-up toggler c-navbar__mobile-login' type='button' >
              {token ? <Translate id='home.my_account' /> : <Translate id='home.navbar_login' /> }
            </Link>

          </div>
          {isMobile && <MobileNavbar />}
          <div className='clearfix' />
        </nav>
       )}
    </Translate>
  )
})

export default Navbar
