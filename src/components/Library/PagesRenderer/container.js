// @flow
import { connect } from 'react-redux'

import PagesRenderer from './PagesRenderer'

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    loadedPages: state.library.loadedPages,
    query: state.library.singleQuery,
    settings: state.library.settings
  }
}

export default connect(mapStateToProps, mapActionCreators)(PagesRenderer)
