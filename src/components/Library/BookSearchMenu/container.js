// @flow
import { connect } from 'react-redux'
import { toggleBookSearchMenu, goToPage } from 'routes/Student/modules/library'

import BookSearchMenu from './BookSearchMenu'

const mapActionCreators = {
  toggleBookSearchMenu,
  goToPage
}

const mapStateToProps = (state: Object): Object => {
  return {
    windowHeight: state.ui.windowHeight,
    settings: state.library.settings,
    visible: state.library.bookSearchVisible,
    singleSearchLoading: state.library.singleSearchLoading,
    singleSearchResult: state.library.singleSearchResult
  }
}

export default connect(mapStateToProps, mapActionCreators)(BookSearchMenu)
