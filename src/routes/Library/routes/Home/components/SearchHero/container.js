// @flow
import { connect } from 'react-redux'
import { getBooks } from 'routes/Student/modules/library'

import LibrarySearchHero from 'components/LibrarySearchHero'

const mapActionCreators = {
  getBooks
}

const mapStateToProps = (state: Object): Object => {
  return {
    initialValues: { type: 'pages' }
  }
}

export default connect(mapStateToProps, mapActionCreators)(LibrarySearchHero)
