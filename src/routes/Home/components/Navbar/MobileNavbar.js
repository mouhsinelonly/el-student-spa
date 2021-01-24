// @flow
import * as React from 'react'
import { IndexLink, Link } from 'react-router'
import './Navbar.scss'
import Icon from 'components/Icon'
import { Translate } from 'react-localize-redux'

export const MobileNavbar = (): React.Element<'ul'> => <ul className='hidden-sm-up c-mobile-navbar'>
  <li className='c-mobile-navbar__nav-item'>
    <IndexLink aria-label='home page' activeClassName={'active'} className='c-mobile-navbar__nav-link' to='/'>
      <Icon name='home-black' />
    </IndexLink>
  </li>
  <li className='c-mobile-navbar__nav-item'>
    <Link activeClassName={'active'} className='c-mobile-navbar__nav-link' to='/our_vision'>
      <Translate id='home.navbar_about' />
    </Link>
  </li>
  <li className='c-mobile-navbar__nav-item'>
    <Link activeClassName={'active'} className='c-mobile-navbar__nav-link' to='/info'>
      <Translate id='home.navbar_study_mobile' />
    </Link>
  </li>
  <li className='c-mobile-navbar__nav-item hidden-xs-up'>
    <Link activeClassName={'active'} className='c-mobile-navbar__nav-link' to='/blog'>
      <Translate id='home.navbar_news' />
    </Link>
  </li>
  <li className='c-mobile-navbar__nav-item'>
    <Link activeClassName={'active'} className='c-mobile-navbar__nav-link btn-white' to='/contact'>
      <Translate id='home.navbar_contact' />
    </Link>
  </li>
  <li className='c-mobile-navbar__nav-item'>
    <Link activeClassName={'active'} className='c-mobile-navbar__nav-link btn-white' to='/eshop'>
      <Translate id='home.navbar_eshop' />
    </Link>
  </li>
</ul>

export default MobileNavbar
