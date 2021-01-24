// @flow
import { connect } from 'react-redux'
import { setSearchWords, toggleFormVisibility, toggleHamza } from 'modules/library_research'
import { getBooks } from 'routes/Student/modules/library'
import ResearchResultForm from './ResearchResultForm'

const mapActionCreators = {
  setWords: (words: Array<Object>): Object => setSearchWords(words),
  onBack: (visible: boolean): Object => toggleFormVisibility(visible),
  onSwitchHamza: (visible: boolean, guard: string): Object => toggleHamza(visible, guard),
  onSearch: (params: Object): Object => getBooks(params)
}

const mapStateToProps = (state: Object): Object => {
  return {
    words: state.library_research.searchWords,
    isHamza: state.library_research.searchHamza
  }
}

export default connect(mapStateToProps, mapActionCreators)(ResearchResultForm)
