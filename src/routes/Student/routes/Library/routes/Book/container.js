import { connect } from 'react-redux'
import {getBook, addBookToShelf, removeBookFromShelf, borrowBook} from 'routes/Student/modules/library'

import Book from './Book'

const mapActionCreators = {
  getBook,
  addBookToShelf,
  removeBookFromShelf,
  borrowBook
}

const mapStateToProps = (state) => {
  return {
    loadedbooks: state.library.loadedbooks,
    loadingbooks: state.library.loadingbooks,
    shelfingsid: state.library.shelfingsid,
    borrowingids: state.library.borrowingids
  }
}

export default connect(mapStateToProps, mapActionCreators)(Book)
