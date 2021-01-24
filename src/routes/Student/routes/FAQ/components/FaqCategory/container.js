import { connect } from 'react-redux'

import FaqCategory from './FaqCategory'

const mapActionCreators = {}

const mapStateToProps = (state) => {
  return {
    loading: state.faq.loadingquestions,
    questions: state.faq.questions
  }
}

export default connect(mapStateToProps, mapActionCreators)(FaqCategory)
