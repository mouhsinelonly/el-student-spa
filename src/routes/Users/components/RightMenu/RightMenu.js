// @flow
import * as React from 'react'
import './style.scss'
import { Link, IndexLink } from 'react-router'

type PropsType = {
  profile: Object,
  statistics: Object,
  hidden: boolean,
  logoutAndRedirect: Function
  // totalTickets: number
};

class RightMenu extends React.PureComponent<PropsType> {
  render (): React.Element<'div'> {
    const { profile: { name, avatar: { thumb } }, statistics, logoutAndRedirect, hidden } = this.props

    return (<div className={`c-admin-rightmenu col-xs-12 col-md-3 col-lg-2 p-a-0 ${hidden ? 'hidden-xs-down' : ''}`}>
      <div className='c-admin-rightmenu-name   p-y-2 p-x-1 m-x-0 m-b-3 row'>
        <div className='col-xs-12 col-md-5'>
          <img src={thumb} alt={name} className='c-admin-rightmenu-avatar m-l-2' />
        </div>
        <div className='col-xs-12 col-md-7'>
          <span>
            { name }
          </span>
        </div>
      </div>
      <ul className='c-admin-rightmenu-menu m-x-2'>
        <li className='c-admin-rightmenu-item'>
          <IndexLink activeClassName='is-active' to='/user' className='c-admin-rightmenu-link p-x-1'>
            الرئيسية
          </IndexLink>
        </li>
        <li className='c-admin-rightmenu-item'>
          <Link activeClassName='is-active' to='/user/tickets' className='c-admin-rightmenu-link p-x-1'>
            اكتب لنا <span className='c-admin-rightmenu-badge'>{statistics ? statistics.unansweredcount : 0}</span>
          </Link>
        </li>
        <li className='c-admin-rightmenu-item hidden-xs-up'>
          <Link activeClassName='is-active' className='c-admin-rightmenu-link p-x-1'>
            الطلاب <span className='c-admin-rightmenu-badge'>0</span>
          </Link>
        </li>
        <li className='c-admin-rightmenu-item hidden-xs-up'>
          <Link activeClassName='is-active' className='c-admin-rightmenu-link p-x-1'>
            التلاوة <span className='c-admin-rightmenu-badge'>0</span>
          </Link>
        </li>
        <li className='c-admin-rightmenu-item'>
          <a className='c-admin-rightmenu-link p-x-1'
            onClick={this._logout} >تسجيل الخروج</a>
        </li>
      </ul>
    </div>)
  }
  _logout = () => {
    const { logoutAndRedirect } = this.props
    logoutAndRedirect('/', 'users')
  }
}

export default RightMenu
