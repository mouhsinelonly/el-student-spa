// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
// import css
import './style.scss'

export const Navbar = (props: Object): React.Element<'nav'> =>
(<nav className={`navbar navbar-light c-navbar__shadow p-t-2 p-b-2`}>
  <div className='container'>
    {props.children}
  </div>
</nav>)

Navbar.propTypes = {
  children: PropTypes.array
}

export default Navbar
