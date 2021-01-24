// @flow
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import logoImg from 'static/img/logo-light.png'
import smallLogoImg from 'static/img/64x64.png'
import { Link } from 'react-router'
import Logout from 'components/Svg/Logout'
import './UserNavbar.scss'
import { logoutAndRedirect } from 'routes/Auth/modules/auth'
type PropsType = {
  children: React.children
};

const UserNavbar = (props: PropsType): React.Element<'nav'> => {
  const dispatch = useDispatch()
  const logOut = useCallback(() => {
    dispatch(logoutAndRedirect('/affiliate', 'affiliates'))
  })
  return <nav id='affiliatenavbar' className='navbar navbar-dark c-UserNavbar__bg '>
    <div className='container'>
      <div className='collapse navbar-toggleable-xs'>
        <Link to='/affiliate/home' className='navbar-brand c-UserNavbar__brand pull-sm-right'>
          <img className={`c-UserNavbar__logo img-fluid hidden-xs-down`} src={logoImg} alt='نظام دارس ' />
          <img className={`c-UserNavbar__logo-small img-fluid hidden-sm-up`} src={smallLogoImg}
            alt='نظام دارس ' />
        </Link>
        <ul className='nav c-UserNavbar__nav navbar-nav'>
          {props.children}
          <li className={`c-UserNavbar__nav-item nav-item `}>
            <a onClick={logOut}
              style={{ cursor: 'pointer' }}
              className={`nav-link c-UserNavbar__nav-link`}>
              خروج <Logout style={{ transform: 'rotateY(180deg)', verticalAlign: 'middle', marginRight: 10 }} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}

export default UserNavbar
