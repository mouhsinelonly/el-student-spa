// @flow
import { connect } from 'react-redux'
import { getCategories, getBooks } from 'routes/Student/modules/library'
import { toggleSearchCategory, toggleSearchCategoryDropDown,
  setSearchBook, showSearchCategory, toggleHamza, setSearchWords,
  setSearchConnected, toggleFormVisibility } from 'modules/library_research'
import SearchHero from './SearchHero'

const mapActionCreators = {
  toggleHamza,
  getBooks,
  getCategories,
  setSearchBook,
  toggleFormVisibility,
  toggleSearchCategory,
  setSearchWords,
  showSearchCategory,
  setSearchConnected,
  toggleSearchCategoryDropDown
}

const mapStateToProps = (state: Object): Object => {
  return {
    categories: state.library.categories,
    booksList: state.library_research.booksList,
    searchConnected: state.library_research.searchConnected,
    booksListLoading: state.library_research.booksListLoading,
    searchCategories: state.library_research.searchCategories,
    searchHamza: state.library_research.searchHamza,
    searchWords: state.library_research.searchWords,
    searchSelectedCategory: state.library_research.searchSelectedCategory,
    searchCategoriesBooks: state.library_research.searchCategoriesBooks,
    searchCategoryDropdownOpen: state.library_research.searchCategoryDropdownOpen
  }
}

export default connect(mapStateToProps, mapActionCreators)(SearchHero)
