import { connect } from 'react-redux'
import {goToPage} from 'routes/Student/modules/library'

import BookNotes from './BookNotes'

const mapActionCreators = {
  goToPage
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapActionCreators)(BookNotes)
