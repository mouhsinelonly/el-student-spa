import React from 'react'
import PropTypes from 'prop-types'
// import css
import './style.scss'
import {Link} from 'react-router'

export const SubNav = (props, context) => <nav className={`navbar library-subnav__navbar`}>
  <div className='container'>
    <div className='row'>
      <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-10 col-lg-pull-1 text-xs-center'>
        <Link to='/student/library' className={`${context.router.isActive('/student/library', true) &&
          'is-active'} library-subnav__nav-link col-xs-4`}>
        المكتبة
        </Link>
        <Link to='/student/library/myprofile' className={`${context.router.isActive('/student/library/myprofile') &&
        'is-active'}
        library-subnav__nav-link col-xs-4`}>
          مكتبتي
        </Link>
        <Link to='/student/library/researcher' className={`${context.router.isActive('/student/library/researcher') &&
          'is-active'} library-subnav__nav-link col-xs-4`}>
          بوابة الباحث
        </Link>
      </div>
    </div>
  </div>
</nav>

SubNav.contextTypes = {
  router: PropTypes.object.isRequired
}

SubNav.propTypes = {
  active: PropTypes.number.isRequired,
  newPosts: PropTypes.number.isRequired
}

SubNav.defaultProps = {
  newPosts: 0,
  active: 0
}

export default SubNav
