// @flow
import { connect } from 'react-redux'
import { toggleBookIndexMenu, setVisibleIndexTab } from 'routes/Student/modules/library'

import BookIndexMenu from './BookIndexMenu'

const mapActionCreators = {
  toggleBookIndexMenu,
  setVisibleIndexTab
}

const mapStateToProps = (state: Object): Object => {
  return {
    visible: state.library.bookIndexVisible,
    tab: state.library.visibleIndexTab,
    settings: state.library.settings,
    windowHeight: state.ui.windowHeight
  }
}

export default connect(mapStateToProps, mapActionCreators)(BookIndexMenu)
