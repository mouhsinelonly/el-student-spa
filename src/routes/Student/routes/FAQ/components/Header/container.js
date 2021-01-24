import { connect } from 'react-redux'
import { setQuery } from 'routes/Student/modules/faq'

import Header from './Header'

const mapActionCreators = {
  setQuery
}

const mapStateToProps = (state) => {
  return {
    query: state.faq.query
  }
}

export default connect(mapStateToProps, mapActionCreators)(Header)
