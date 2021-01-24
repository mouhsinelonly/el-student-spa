// @flow
import { connect } from 'react-redux'
import { getCategories, getBooks } from '../../../../modules/library'

import LibrarySearchHero from 'components/LibrarySearchHero'

const mapActionCreators = {
  getCategories,
  getBooks
}

const mapStateToProps = (state: Object): Object => {
  return {
    categories: state.library.categories
  }
}

export default connect(mapStateToProps, mapActionCreators)(LibrarySearchHero)
