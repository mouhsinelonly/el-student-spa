import { connect } from 'react-redux'
import { getFAQCategories, getFAQQuestions, setQuery } from 'routes/Student/modules/faq'

import FAQ from '../components/FAQ'

const mapActionCreators = {
  getFAQCategories,
  setQuery,
  getFAQQuestions
}

const mapStateToProps = (state) => {
  return {
    query: state.faq.query,
    loading: state.faq.loadingcategories,
    categories: state.faq.categories
  }
}

export default connect(mapStateToProps, mapActionCreators)(FAQ)
