// @flow
import * as React from 'react'
import { browserHistory } from 'react-router'
import { Helmet } from 'react-helmet'

// import css
import './Blog.scss'
// import components
import Loading from 'components/Loading'
import { Translate } from 'react-localize-redux'

import PostBlock from 'components/Blog/PostBlock'
import ReactPaginate from 'react-paginate'

type TranslateType = {
  translate: Function
};
type PropsType= {
  posts: Array<Object>,
  query: string,
  location: Object,
  getNews: Function,
  setSearchQuery: Function,
  totalPages: number,
  loading: boolean,
  currentPage: number
};

class Blog extends React.Component<PropsType> {
  static defaultProps = {
    posts: [],
    loading: false,
    currentPage: 1
  }
  componentDidMount () {
    const { location: { query } } = this.props
    const { getNews } = this.props

    getNews(query.page ? query.page : 1, query.query ? query.query : '')
  }

  render (): React.Element<'div'> {
    const { totalPages, loading, currentPage, query } = this.props

    return (
      <div className={'container blog-page__container'}>
        <Translate>
          {({ translate }: Object): React.Element<typeof Helmet> => <Helmet>
            <title>{translate('home.navbar_news')}</title>
          </Helmet>}
        </Translate>
        <header className={`blog-page__header row`}>
          <div className={'col-xs-12 col-md-4 col-lg-8 '}>
            <h1 className={`blog-page__heading`}>
              <Translate id='blog.news' />
            </h1>
          </div>
          <div className='col-xs-12 col-md-8 col-lg-4 p-t-3'>
            <div className='input-group m-t-1'>
              <Translate>
                {({ translate }: TranslateType): React.Element<'input'> => (
                  <input onKeyPress={this.handleSearch}
                    ref='query'
                    placeholder={translate('blog.search')}
                    className={`form-control blog-page__search-input`}
                    type='text'
                    defaultValue={query} />
                  )}
              </Translate>
              <span className='input-group-btn'>
                <button className={`btn blog-page__search-button btn-success`}
                  onClick={this.handleSearch}>
                  <Translate id='blog.submit' />
                </button>
              </span>
            </div>
          </div>
        </header>
        <section className={`row $ blog-page__posts-container`}>
          {loading ? <Loading number={1} /> : this.renderPosts()}
        </section>
        <footer className='text-xs-center'>
          <Translate>
            {({ translate }: TranslateType): React.Element<typeof ReactPaginate> =>
              loading ? null : <ReactPaginate containerClassName='pagination'
                onPageChange={this.goToPage}
                previousLabel={translate('global.previous')}
                forceSelected={currentPage - 1}
                nextLabel={translate('global.next')}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                pageClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
                disabledClassName={'disabled'}
                pageLinkClassName={'page-link'}
                pageCount={totalPages} />
            }
          </Translate>
        </footer>
      </div>
    )
  }

  handleSearch = (e: Object) => {
    const { setSearchQuery, getNews } = this.props
    if (e.charCode === 13 || e.type === 'click') {
      const query = this.refs['query'].value
      setSearchQuery(query)
      getNews(1, query)
      browserHistory.push({ pathname: 'blog', query: { query } })
    }
  }

  goToPage = (pageNumber: Object) => {
    const { getNews, query } = this.props
    const page = pageNumber.selected + 1
    getNews(page, query)
    browserHistory.push({ pathname: 'blog', query: { page, query } })
  }

  renderPosts (): Array<Object> {
    const { posts } = this.props

    return posts.map((post: Object, i: number): React.Element<'div'> =>
      <div key={i} className={'col-xs-12 col-md-4 blog-page__post-item'}>
        <PostBlock id={post.id} createdAt={post.created_at} title={post.title} cover={post.cover_medium} />
      </div>)
  }
}

export default Blog
