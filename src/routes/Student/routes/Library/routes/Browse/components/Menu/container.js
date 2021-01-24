// @flow
import { connect } from 'react-redux'
import { toggleBookIndexMenu, setVisibleIndexTab, toggleBookSearchMenu,
  bookMark, unBookMark, setHilightedPopUpVisibility } from 'routes/Student/modules/library'

import Menu from 'components/Library/Menu'

const mapActionCreators = {
  toggleBookIndexMenu,
  setVisibleIndexTab,
  toggleBookSearchMenu,
  bookMark,
  unBookMark,
  setHilightedPopUpVisibility
}

const mapStateToProps = (state: Object): Object => {
  return {
    settings: state.library.settings,
    visiblePages: state.library.visiblePages,
    markingids: state.library.markingids,
    visible: state.library.bookIndexVisible
  }
}

export default connect(mapStateToProps, mapActionCreators)(Menu)
