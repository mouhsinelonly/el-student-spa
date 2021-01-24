// @flow
import { connect } from 'react-redux'
import { getCategories, getProfile } from 'modules/library'
import { getBooks } from 'routes/Student/modules/library'

import Home from './Home'

const mapActionCreators = {
  getCategories,
  getProfile,
  getBooks
}

const mapStateToProps = (state: Object): Object => {
  return {
    categories: state.library_account.categories,
    profile: state.library_account.profile,
    query: state.library.search.query,
    pagination: state.library.pagination,
    type: state.library.search.type,
    category_id: state.library.search.category_id
  }
}

export default connect(mapStateToProps, mapActionCreators)(Home)
