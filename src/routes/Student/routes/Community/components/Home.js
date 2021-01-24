import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import './menu.scss'
import { isMobile } from 'utils'
import CommunityListItem from 'components/Community/CommunityListItem'
import Loading from 'components/Loading'
import VisibilitySensor from 'react-visibility-sensor'
import { Link } from 'react-router'
const Banner = React.lazy((): Function => import('components/Vlog/Banner'))
const empty = []
class Home extends PureComponent {
  static propTypes = {
    query: PropTypes.string,
    posts: PropTypes.object,
    mypagination: PropTypes.object,
    pagination: PropTypes.object,
    tab: PropTypes.string,
    getMyCommunityPosts: PropTypes.func,
    setCommunityTab: PropTypes.func,
    getCommunityPosts: PropTypes.func,
    setCommunitySearchQuery: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object
  }
  render () {
    const { pagination, mypagination, posts, query, tab } = this.props
    const loading = Object.keys(pagination.pages).filter(i => pagination.pages[i].isFetching !== false).length > 0
    const loadingMy = Object.keys(mypagination.pages).filter(i => mypagination.pages[i].isFetching !== false).length > 0
    let ids = []
    if (tab === 'new') {
      ids = empty.concat.apply(empty, Object.keys(pagination.pages).map(i => pagination.pages[i].ids))
    } else if (tab === 'my') {
      ids = empty.concat.apply(empty, Object.keys(mypagination.pages).map(i => mypagination.pages[i].ids))
    }

    let filteredPosts = {}
    for (let i of Object.keys(posts)) {
      if (ids.findIndex(id => id === posts[i].id) >= 0) {
        filteredPosts = {
          ...filteredPosts,
          [i]: posts[i]
        }
      }
    }

    return <div className='container  no-xs-padding'>
      <div className='row  no-xs-margin'>
        <div className='col-xs-12 col-md-10 col-md-pull-1 no-xs-padding'>
          <React.Suspense fallback={<div />}>
            <Banner />
          </React.Suspense>
        </div>
      </div>
      <Link to='/student/community/create'
        className='m-y-3 btn btn-success p-x-3 btn-lg m-x-auto student-community-home__new'>
          { isMobile() ? 'إضافة نقاش' : 'إضافة نقاش جديد' }
      </Link>
      <div className='row no-xs-margin'>
        <div className='col-xs-12 col-md-10 col-md-pull-1 no-xs-padding'>
          <ul className='c-student-community-menu'>
            <li className={`c-student-community-menu__item
              is-recent
            ${tab === 'new' ? 'is-active' : null}`}
              onClick={this._setTabNew} >
              <div className={`c-student-community-menu__item__action
                ${tab === 'my' ? 'is-active' : null}`}>
                الأحدث
              </div>
            </li>
            {/* <li className={`${menuClasses['menu__item']}  ${tab === 'most' ? menuClasses['is-active'] : null}`}>
              <div className={`${menuClasses['menu__item__action']}`}>الأكثر تفاعلا</div>
            </li> */}
            <li className={`c-student-community-menu__item is-mine ${tab === 'my' ? 'is-active' : null}`}
              onClick={this._setTabMy}>
              <div className='c-student-community-menu__item__action'>
              مواضيعي
              </div>
            </li>
            <li className='c-student-community-menu__item is-last'>
              <div className='c-student-community-menu__item__form form-group m-a-0'>
                <div className='input-group'>
                  <input ref='searchQuery'
                    defaultValue={query}
                    className='form-control form-control-md'
                    placeholder={isMobile() ? 'البحث' : 'البحث في النقاشات'} />
                  <span className='input-group-btn'>
                    <button onClick={this._setSearchQuery} className='btn
                    c-student-community-menu__search btn-success btn-md'>
                      { isMobile() ? <i className='material-icons'>search</i> : 'البحث'}
                    </button>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div className='clearfix' />
          <ul className='student-community-home__posts'>
            {Object.keys(filteredPosts).map(k =>
              <CommunityListItem
                handleClick={this._handleItemClick}
                key={k} {...filteredPosts[k]} />)}
          </ul>
          {loading && tab === 'new' ? <div className='p-y-3'><Loading /></div>
          : (tab === 'new' && pagination.totalPages > pagination.currentPage
          ? <VisibilitySensor delayedCall partialVisibility delay={500} onChange={this._loadMore}>
            <button className='btn btn-success btn-lg m-x-auto m-t-1'
              style={{ width: 200, display: 'block' }}
              onClick={this._loadMore}>المزيد</button>
          </VisibilitySensor>
          : null)}
          {loadingMy && tab === 'my' ? <div className='p-y-3'><Loading /></div>
          : (tab === 'my' && mypagination.totalPages > mypagination.currentPage
          ? <VisibilitySensor delayedCall partialVisibility delay={500} onChange={this._loadMoreMy}>
            <button className='btn btn-success btn-lg m-x-auto m-t-1'
              style={{ width: 200, display: 'block' }}
              onClick={this._loadMoreMy}>المزيد</button>
          </VisibilitySensor>
          : null)}
        </div>
      </div>
    </div>
  }
  _handleItemClick = (postId = 0) => {
    const { router } = this.context
    router.push('/student/community/show/' + postId)
  }
  _onVisibility = (v, l) => {

  }
  _setSearchQuery = () => {
    const { setCommunitySearchQuery } = this.props
    setCommunitySearchQuery(this.refs['searchQuery'].value)
  }
  _loadMore = (visible = false) => {
    if (visible === true) {
      const { pagination, getCommunityPosts } = this.props
      getCommunityPosts(pagination.currentPage + 1)
    }
  }
  _loadMoreMy = (visible = false) => {
    if (visible === true) {
      const { mypagination, getMyCommunityPosts } = this.props
      getMyCommunityPosts(mypagination.currentPage + 1)
    }
  }

  _setTabNew = () => {
    const { setCommunityTab } = this.props
    setCommunityTab('new')
  }

  _setTabMost = () => {
    const { setCommunityTab } = this.props
    setCommunityTab('most')
  }

  _setTabMy = () => {
    const { setCommunityTab, getMyCommunityPosts } = this.props
    setCommunityTab('my')
    getMyCommunityPosts()
  }
}

export default Home
