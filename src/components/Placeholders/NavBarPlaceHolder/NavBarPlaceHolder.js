// @flow
import * as React from 'react'

type PropsType = {};

const NavBarPlaceHolder = (props: PropsType): React.Element<'div'> => {
  return (
    <nav id='studentnavbar'
      className={`navbar navbar-dark student-navbar__bg`}>
      <div className='container'>
        <div className='collapse navbar-toggleable-xs' ref='collapse'>
          <a className='navbar-brand student-navbar__brand pull-sm-right'>
            <img className={`student-navbar__logo img-fluid hidden-xs-down`} src={logoImg} alt='نظام دارس ' />
            <img className={`student-navbar__logo-small img-fluid hidden-sm-up`} src={smallLogoImg} alt='نظام دارس ' />
          </a>
          <ul className='nav student-navbar__nav navbar-nav pull-sm-left'>
            <li className='student-navbar__nav-item nav-item hidden-xs-down'>
              <div to='/student' className='nav-link student-navbar__nav-link'>
             الرئيسية
              </div>
            </li>
            <li className={`student-navbar__nav-item nav-item ${!isActive ? 'hidden-xs-up' : ''}`}>
              <Link to='/student/library'
                activeClassName='active'
                className={`nav-link student-navbar__nav-link ${libraryvisible ? 'is-library' : ''}`}>
                المكتبة
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
                <Dot className='student-navbar__results-notification hidden-xs-up' />
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
                className='student-navbar__drop-nav-item__trigger' onClick={this._toggleDropdown}>
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
                <li className='student-navbar__drop-nav-item__drop__full' onClick={this._logOut}>
                  تسجيل الخروج
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBarPlaceHolder
