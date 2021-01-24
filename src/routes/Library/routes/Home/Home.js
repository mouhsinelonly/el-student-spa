// @flow
import * as React from 'react'
import Search from './Search'
import requireAuthentication from 'components/AuthenticatedComponent'
import SearchResult from './components/SearchResult'
import UpgradeHidden from 'components/Library/UpgradeHidden'
import NavBar from './components/NavBar'
import './style.scss'

type PropsType = {
  children: React.Node,
  getCategories: Function,
  getProfile: Function,
  categories: Array<Object>,
  profile: Object,
  query: string,
  pagination: Object,
  category_id: number,
  type: string,
  params: Object
};

class Home extends React.Component<PropsType> {
  componentDidMount () {
    const { getCategories } = this.props
    getCategories()
  }
  render (): React.Node {
    const { children, query, category_id: categoryId, type, params: { id }, profile, pagination } = this.props

    const isSearch = (query || categoryId || type) && !id

    const SearchContent = isSearch ? <div className='p-library-prod p-b-3'>
      <SearchResult {...this.props} singleBookLink='/library/browse' />
      {!profile.activeSubscription && pagination.total ? <UpgradeHidden total={pagination.total} /> : null }
    </div> : null

    return (<div className='h-100'>
      <div className='container'>
        <div className='row col-xs-12' style={{ paddingTop: 67 }} >
          <NavBar name={profile.name} smallPhoto='https://avatar.el-cdn.net/cache/000/010/001/large/1aym0ColOG.jpg'
            largePhoto='https://avatar.el-cdn.net/cache/000/010/001/large/1aym0ColOG.jpg' />
        </div>
      </div>
      {SearchContent || (children || <Search {...this.props} />)}
    </div>)
  }
}

export default requireAuthentication(Home)
