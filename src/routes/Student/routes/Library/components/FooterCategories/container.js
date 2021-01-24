// @flow
import { connect } from 'react-redux'
import { getBooks } from 'routes/Student/modules/library'

import FooterCategories from 'components/LibraryFooterCategories'

const mapActionCreators = {
  getBooks
}

const mapStateToProps = (state: Object): Object => {
  return {
    categories: state.library.categories
  }
}

export default connect(mapStateToProps, mapActionCreators)(FooterCategories)
