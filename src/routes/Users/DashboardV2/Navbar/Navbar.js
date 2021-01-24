// @flow
import * as React from 'react'
import './style.scss'

type PropsType = {
  logoutAndRedirect: Function,
  getTickets: Function,
  loading: boolean
};

class Navbar extends React.Component<PropsType> {
  render (): React.Element<'nav'> {
    const { loading } = this.props
    return (
      <nav className='navbar navbar-inverse usersv2-navbar'>
        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav navbar-left pull-xs-left'>
            <li><a onClick={this._logout}>
              <span className='material-icons p-l-1' style={{ verticalAlign: 'middle' }}>power_settings_new</span>
              خروج
            </a></li>
          </ul>
          <ul className='nav navbar-nav navbar-right pull-xs-right'>
            <li>
              <button onClick={this._refresh} disabled={loading}>
                <span className='material-icons p-l-1' style={{ verticalAlign: 'middle' }}>refresh</span>
              تحديث
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }

  _logout = () => {
    const { logoutAndRedirect } = this.props
    logoutAndRedirect('/', 'users')
  }
  _refresh = () => {
    const { getTickets } = this.props
    getTickets(1, { open: 1, username: '', answered: 0 })
  }
}

export default Navbar
