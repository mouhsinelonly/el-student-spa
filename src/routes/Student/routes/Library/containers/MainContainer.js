import { connect } from 'react-redux'
import { toggleLibraryVisibility, getCategories } from 'routes/Student/modules/library'
import { getFolders } from 'modules/library_research'

import Library from '../components/Library'

const mapActionCreators = {
  toggleLibraryVisibility,
  getCategories,
  getFolders
}

const mapStateToProps = (state) => {
  return {
    profile: state.student.profile,
    borrowingids: state.library.borrowingids,
    query: state.library.search.query,
    category_id: state.library.search.category_id,
    type: state.library.search.type
  }
}

export default connect(mapStateToProps, mapActionCreators)(Library)
