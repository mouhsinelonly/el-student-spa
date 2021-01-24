import { connect } from 'react-redux'
import { setCategory, setQuery } from 'routes/Student/modules/faq'

import Question from './Question'

const mapActionCreators = {
  setCategory,
  setQuery
}

const mapStateToProps = (state) => {
  return {
    categories: state.faq.categories,
    questions: state.faq.questions,
    loadingCategories: state.faq.loadingcategories,
    loadingQuestions: state.faq.loadingquestions
  }
}

export default connect(mapStateToProps, mapActionCreators)(Question)
