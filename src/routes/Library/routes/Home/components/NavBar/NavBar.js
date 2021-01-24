// @flow
import * as React from 'react'
import { Link } from 'react-router'
import Headroom from 'headroom.js'
import ImageZoom from 'react-medium-image-zoom'

import logoImg from 'static/img/logo-light.png'
import smallLogoImg from 'static/img/64x64.png'
import './style.scss'
import Icon from 'components/Icon'

type PropsType = {
  dropdownvisible?: boolean,
  smallPhoto?: string,
  largePhoto?: string,
  name: string,
  showNavbarDropdown?: Function,
  hideNavbarDropdown?: Function,
  logoutAndRedirect?: Function
};

class NavBar extends React.Component<PropsType> {
  _headroom = null
  componentDidMount () {
    const navbarElement = document.getElementById('libraryusernavbar')
    this._headroom = new Headroom(navbarElement)
    // initialise
    this._headroom.init()
  }
  componentWillUnmount () {
    this._headroom && this._headroom.destroy()
  }

  render (): React.Element<'nav'> {
    let { profile, dropdownvisible, smallPhoto, largePhoto, name } = this.props

    return (<nav id='libraryusernavbar'
      className={`navbar navbar-dark libraryuser-navbar__bg is-library`}>
      <div className='container'>
        <div className='collapse navbar-toggleable-xs' ref='collapse'>
          <Link to='/library/home' className='navbar-brand libraryuser-navbar__brand pull-sm-right'>
            <img className={`libraryuser-navbar__logo img-fluid hidden-xs-down`} src={logoImg} alt='نظام دارس ' />
            <img className={`libraryuser-navbar__logo-small img-fluid hidden-sm-up`}
              src={smallLogoImg} alt='نظام دارس ' />
          </Link>
          <ul className='nav libraryuser-navbar__nav navbar-nav pull-sm-left'>

            <li className={`libraryuser-navbar__nav-item nav-item`}>
              <Link to='/library/invoices'
                activeClassName='active'
                className={`nav-link libraryuser-navbar__nav-link is-library`}>
                الدفوعات
              </Link>
            </li>
            <li className={`libraryuser-navbar__nav-item nav-item libraryuser-navbar__drop-nav-item`}>
              <div className='col-xs-12 col-sm-3 text-xs-center libraryuser-navbar__user-avatar'>
                {smallPhoto ? <ImageZoom
                  image={{
                    src: smallPhoto,
                    alt: name,
                    className: 'img-circle'
                  }}
                  zoomImage={{
                    src: largePhoto,
                    alt: name,
                    className: 'img-circle'
                  }} /> : null }
              </div>
              <div className={`hidden-xs-down col-sm-7 libraryuser-navbar__user-info
                is-library`}>
                <div className='libraryuser-navbar__user-info__name text-nowrap'>{name}</div>
              </div>
              <button
                className='libraryuser-navbar__drop-nav-item__trigger' onClick={this._toggleDropdown}>
                <Icon name={`drop-down-library drop-down`} />
              </button>
              <ul className={`libraryuser-navbar__drop-nav-item__drop text-xs-center
                ${!dropdownvisible ? 'hidden-xs-up' : ''}`}>
                <li className='libraryuser-navbar__drop-nav-item__drop__half'>
                  <Link to='/student/profile'>
                    <Icon name='gear-gray-medium' className='m-b-1' />
                    <div>إعدادات الحساب</div>
                  </Link>
                </li>
                <li className='libraryuser-navbar__drop-nav-item__drop__half'>
                  <Link to='/student/payments'>
                    <Icon name='credit-card-gray-medium' className='m-b-1' />
                    <div>المالية و الدفع</div>
                  </Link>
                </li>
                <li className='libraryuser-navbar__drop-nav-item__drop__half'>
                  <Link to='/student/docs'>
                    <Icon name='docs-gray-medium' className='m-b-1' />
                    <div>الخطابات</div>
                  </Link>
                </li>
                <li className='libraryuser-navbar__drop-nav-item__drop__half'>
                  <Link to='/student/orders'>
                    <Icon name='plus-gray-medium' className='m-b-1' />
                    <div>التأجيل و الانسحاب</div>
                  </Link>
                </li>
                <Link className='libraryuser-navbar__drop-nav-item__drop__full hidden-xs-up' to='/student/facematching'>
                  التحقق من الصورة
                </Link>
                <li className='libraryuser-navbar__drop-nav-item__drop__full' onClick={this._logOut}>
                  تسجيل الخروج
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>)
  }

  _logOut = () => {
    const { logoutAndRedirect } = this.props
    logoutAndRedirect()
  }

  _toggleDropdown = () => {
    const { showNavbarDropdown, hideNavbarDropdown, dropdownvisible } = this.props
    if (dropdownvisible) {
      // hideNavbarDropdown()
    } else {
      // showNavbarDropdown()
    }
  }
}

export default NavBar
