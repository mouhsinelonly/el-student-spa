// @flow
import { connect } from 'react-redux'

import SearchSwicth from './SearchSwitch'

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    searchType: state.library_research.searchType
  }
}

export default connect(mapStateToProps, mapActionCreators)(SearchSwicth)
