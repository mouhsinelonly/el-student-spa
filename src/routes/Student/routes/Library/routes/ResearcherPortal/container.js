// @flow
import { connect } from 'react-redux'
import { setSearchType, getBooksList, showSearchCategory } from 'routes/Student/modules/library_research'
import ResearcherPortal from './ResearcherPortal'

const mapActionCreators = {
  showSearchCategory,
  setSearchType,
  getBooksList
}

const mapStateToProps = (state: Object): Object => {
  return {
    profile: state.student.profile
  }
}

export default connect(mapStateToProps, mapActionCreators)(ResearcherPortal)
