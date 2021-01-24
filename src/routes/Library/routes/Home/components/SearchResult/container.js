// @flow
import { connect } from 'react-redux'
import { getBookSend, showSearchSinglePage, suggestBook, addBookToShelf, removeBookFromShelf,
  borrowBook, setShowSearchBookPages, getBooks, resetSearch, getBooksFilter } from 'routes/Student/modules/library'

import SearchResult from 'components/Library/SearchResult'

const mapActionCreators = {
  getBookSend,
  suggestBook,
  addBookToShelf,
  removeBookFromShelf,
  borrowBook,
  setShowSearchBookPages,
  showSearchSinglePage,
  getBooks,
  resetSearch,
  getBooksFilter
}

const mapStateToProps = (state: Object): Object => {
  return {
    query: state.library.search.query,
    pagination: state.library.pagination,
    books: state.library.books,
    booksloading: state.library.booksloading,
    count: state.library.count,
    category_id: state.library.search.category_id,
    type: state.library.search.type,
    searchSinglePage: state.library.searchSinglePage,
    suggestingState: state.library.suggestingState,
    shelfingsid: state.library.shelfingsid,
    showBookPages: state.library.showBookPages,
    borrowingids: state.library.borrowingids,
    guard: 'libraryuser'
  }
}

export default connect(mapStateToProps, mapActionCreators)(SearchResult)
