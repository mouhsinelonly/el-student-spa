// @flow
import * as React from 'react'
import './style.scss'
import Home from './Home'
import SubNav from './SubNav'

type PropsType = {
    profile?: Object,
    params: Object,
    children?: React.Node,
    toggleLibraryVisibility?: Function,
    getCategories?: Function,
    query?: string,
    category_id?: number,
    type?: string
  };

class LibraryDashboard extends React.Component<PropsType> {
  componentDidMount () {
    const { toggleLibraryVisibility, getCategories } = this.props
    toggleLibraryVisibility && toggleLibraryVisibility()
    getCategories && getCategories({ guard: 'student' })
  }
  componentWillUnmount () {
    const { toggleLibraryVisibility } = this.props
    toggleLibraryVisibility && toggleLibraryVisibility()
  }
  render (): React.Element<'div'> {
    const { children, params: { id } } = this.props

    return <div className='p-library-prod'>
      { !id ? <SubNav active={1} /> : null }
      { children || <Home {...this.props} /> }
    </div>
  }
}

export default LibraryDashboard
