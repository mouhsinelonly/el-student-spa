// @flow
import { connect } from 'react-redux'
import { getMyBooks, addBookToShelf, removeBookFromShelf } from 'routes/Student/modules/library'

import MyProfile from './MyProfile'

const mapActionCreators = {
  getMyBooks,
  addBookToShelf,
  removeBookFromShelf
}

const mapStateToProps = (state: Object): Object => {
  return {
    books: state.library.myBooks,
    loading: state.library.myBooksLoading,
    profile: state.library_account.profile,
    guard: 'libraryuser'
  }
}

export default connect(mapStateToProps, mapActionCreators)(MyProfile)
