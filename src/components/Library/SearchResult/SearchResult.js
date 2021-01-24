// @flow
import * as React from 'react'
import SearchBar from 'components/Library/SearchBar'
import Loading from 'components/Loading'
import { resultNumberToString } from 'utils'
import SearchResultBook from 'components/Library/SearchResultBook'
import './style.scss'
import SearchResultBookEmpty from 'components/Library/SearchResultBookEmpty'
import VisibilitySensor from 'react-visibility-sensor'
import ModalPage from 'components/Library/ModalPage'

type SearchResultType = {
   pagination: Object,
   booksloading: boolean,
   books: Array<Object>,
   getBookSend: Function,
   count: number,
   query: string,
   suggestingState: string,
   showSearchSinglePage: Function,
   suggestBook: Function,
   searchSinglePage: Object,
   addBookToShelf: Function,
   borrowBook: Function,
   showSearchSinglePage: Function,
   removeBookFromShelf: Function,
   setShowSearchBookPages: Function,
   shelfingsid: Array<number>,
   showBookPages: Object,
   borrowingids: Array<number>,
   getBooks: Function,
   guard: string,
   resetSearch: Function,
   getBooksFilter: Function,
   categories: Array<Object>,
   singleBookLink: string,
   category_id: number
};

class SearchResult extends React.PureComponent<SearchResultType> {
  static defaultProps = {
    booksloading: false,
    query: '',
    guard: 'students',
    books: [],
    count: 0,
    pagination: { currentPage: 1 }
  }
  render (): React.Element<'div'> {
    const { query, booksloading, books, count, searchSinglePage,
      showSearchSinglePage, suggestBook, suggestingState, shelfingsid,
      showBookPages, borrowingids, addBookToShelf, borrowBook, removeBookFromShelf,
      setShowSearchBookPages, category_id: categoryId, categories, getBooks,
      resetSearch, getBooksFilter, guard, singleBookLink, pagination } = this.props
    return (
      <div className='p-library-searchresult h-100'>
        <ModalPage searchSinglePage={searchSinglePage} handleHide={showSearchSinglePage} />
        <SearchBar initialValues={{ query }} filterEnabled
          category_id={categoryId}
          getBooks={getBooks}
          resetSearch={resetSearch}
          guard={guard}
          getBooksFilter={getBooksFilter}
          categories={categories} />
        {booksloading && books.length === 0 && <div className='p-y-3'><Loading /></div>}
        <div className={`container ${!count ? 'hidden-xs-up' : ''}`}>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2 p-x-0'>
              <div className='p-library-searchresult__count p-y-2'>
                <div>هناك {resultNumberToString(count)}</div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2 p-x-0'>
              <div className='p-library-searchresult__content'>
                {books.map((b: Object, i: number): React.Element<typeof SearchResultBook> =>
                  <SearchResultBook {...b} key={i}
                    shelfingsid={shelfingsid}
                    showBookPages={showBookPages}
                    borrowingids={borrowingids}
                    addBookToShelf={addBookToShelf}
                    guard={guard}
                    singleBookLink={singleBookLink}
                    borrowBook={borrowBook}
                    showSearchSinglePage={showSearchSinglePage}
                    removeBookFromShelf={removeBookFromShelf}
                    setShowSearchBookPages={setShowSearchBookPages} />)}
                {pagination.currentPage < pagination.totalPages
                  ? <VisibilitySensor delayedCall partialVisibility delay={500} onChange={this._loadMore}>
                    <button className='btn btn-success btn-lg m-x-auto m-y-3'
                      disabled={booksloading}
                      style={{ width: 200, display: 'block' }}
                      onClick={this._loadMore}>
                      {booksloading ? 'جاري التحميل...' : 'المزيد'}
                    </button>
                  </VisibilitySensor> : null }
              </div>
            </div>
          </div>
        </div>
        <div className={`${(count || booksloading) ? 'hidden-xs-up' : ''} text-xs-center p-y-3`} >
          <div className='col-xs-12 col-md-6 col-lg-4 col-md-pull-3 col-lg-pull-4'>
            <SearchResultBookEmpty handleSuggest={suggestBook} state={suggestingState} query={query} />
          </div>
        </div>
        <div className='clearfix' />
      </div>
    )
  }
  _loadMore = (visible: boolean = false) => {
    const { pagination, getBookSend, booksloading, guard } = this.props
    if (visible && !booksloading) {
      getBookSend({ page: pagination.currentPage + 1, guard })
    }
  }
}

export default SearchResult
