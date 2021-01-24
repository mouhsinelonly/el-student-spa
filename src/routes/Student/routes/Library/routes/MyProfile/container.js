// @flow
import { connect } from 'react-redux'
import { getMyBooks } from 'routes/Student/modules/library'

import MyProfile from 'components/Library/MyProfile'

const mapActionCreators = {
  getMyBooks
}

const mapStateToProps = (state: Object): Object => {
  return {
    books: state.library.myBooks,
    loading: state.library.myBooksLoading
  }
}

export default connect(mapStateToProps, mapActionCreators)(MyProfile)
