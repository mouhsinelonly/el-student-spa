// @flow
import React from 'react'
import CUserNavbar from 'components/UserNavbar'
import { Link } from 'react-router'
import './UserNavbar.scss'
import CodeBox from 'routes/Affiliate/routes/Home/components/CodeBox'
type PropsType = {};

const UserNavbar = (props: PropsType): React.Element<'nav'> => {
  return <CUserNavbar>
    <li className={`Affiliate-UserNavbar__nav-item nav-item `}>
      <CodeBox />
    </li>
    <li className={`Affiliate-UserNavbar__nav-item nav-item `}>
      <Link
        to='/support/faq'
        style={{ cursor: 'pointer' }}
        className={`nav-link Affiliate-UserNavbar__nav-link`}>
        الأسئلة الشائعة
      </Link>
    </li>
    <li className={`Affiliate-UserNavbar__nav-item nav-item `}>
      <Link
        to='/affiliate/settings'
        style={{ cursor: 'pointer' }}
        className={`nav-link Affiliate-UserNavbar__nav-link`}>
        إعدادات الحساب
      </Link>
    </li>
  </CUserNavbar>
}

export default UserNavbar
