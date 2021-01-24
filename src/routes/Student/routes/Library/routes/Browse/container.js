// @flow
import { connect } from 'react-redux'
import { hideStudentNavbar, showStudentNavbar } from 'routes/Student/modules/ui'
import { getBook, searchInBookContent, getBookPage, setVisiblePage,
  setHilightedText, setInvisiblePage } from 'routes/Student/modules/library'

import Browse from 'components/Library/Browse'

const mapActionCreators = {
  hideStudentNavbar,
  showStudentNavbar,
  searchInBookContent,
  getBook,
  getBookPage,
  setVisiblePage,
  setHilightedText,
  setInvisiblePage
}

const mapStateToProps = (state: Object): Object => {
  return {
    loadedbooks: state.library.loadedbooks,
    loadingbooks: state.library.loadingbooks,
    settings: state.library.settings,
    query: state.library.singleQuery,
    loadedPages: state.library.loadedPages,
    visiblePages: state.library.visiblePages,
    hilightedPage: state.library.hilighted.page,
    hilightedText: state.library.hilighted.text,
    hilightedPopUpVisible: state.library.hilighted.popup
  }
}

export default connect(mapStateToProps, mapActionCreators)(Browse)
