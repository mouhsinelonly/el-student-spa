// @flow
import { connect } from 'react-redux'
import { getBookPage, setVisiblePage, setInvisiblePage, setHilightedText } from 'routes/Student/modules/library'

import PageRenderer from './PageRenderer'

const mapActionCreators = {
  getBookPage,
  setVisiblePage,
  setHilightedText,
  setInvisiblePage
}

const mapStateToProps = (state: Object): Object => {
  return {
    loadedPages: state.library.loadedPages,
    settings: state.library.settings,
    query: state.library.singleQuery,
    visiblePages: state.library.visiblePages,
    hilightedPage: state.library.hilighted.page,
    hilightedText: state.library.hilighted.text,
    hilightedPopUpVisible: state.library.hilighted.popup
  }
}

export default connect(mapStateToProps, mapActionCreators)(PageRenderer)
