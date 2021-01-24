// @flow
import * as React from 'react'
// import css
import './styles.scss'
import { Link } from 'react-router'

type PropsType = {
  active: boolean
};

class SubNav extends React.Component<PropsType> {
  static defaultProps = {
    active: 1
  }
  render (): React.Element<'nav'> {
    const { active } = this.props
    return (<nav className={`navbar library-subnav__navbar`}>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-10 col-lg-pull-1 text-xs-center'>
            <Link to='/library/home' className={`${active === 1 ? 'is-active' : ''
              } library-subnav__nav-link col-xs-4`}>
            المكتبة
            </Link>
            <Link to='/library/mylibrary' className={`${active === 2 ? 'is-active' : ''}
            library-subnav__nav-link col-xs-4`}>
              مكتبتي
            </Link>
            <Link to='/library/researcher' className={`${active === 3 ? 'is-active' : ''
              } library-subnav__nav-link col-xs-4`}>
              بوابة الباحث
            </Link>
          </div>
        </div>
      </div>
    </nav>)
  }
}

export default SubNav
