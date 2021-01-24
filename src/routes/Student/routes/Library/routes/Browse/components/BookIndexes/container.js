import { connect } from 'react-redux'
import {goToPage} from 'routes/Student/modules/library'

import BookIndexes from './BookIndexes'

const mapActionCreators = {
  goToPage
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapActionCreators)(BookIndexes)
