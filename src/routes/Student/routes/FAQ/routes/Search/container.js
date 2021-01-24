import { connect } from 'react-redux'
import { setCategory, setQuery } from 'routes/Student/modules/faq'

import Search from './Search'

const mapActionCreators = {
  setCategory,
  setQuery
}

const mapStateToProps = (state) => {
  return {
    categories: state.faq.categories,
    questions: state.faq.questions,
    loadingCategories: state.faq.loadingcategories,
    query: state.faq.query,
    loadingQuestions: state.faq.loadingquestions
  }
}

export default connect(mapStateToProps, mapActionCreators)(Search)
