// @flow
import { connect } from 'react-redux'
import ResearcherResult from './ResearcherResult'

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    books: state.library.books,
    pagination: state.library.pagination,
    booksloading: state.library.booksloading,
    words: state.library_research.searchWords
    .reduce((total: Array<string>, next: Object): Array<string> => total.concat(next.value), [])
  }
}

export default connect(mapStateToProps, mapActionCreators)(ResearcherResult)
