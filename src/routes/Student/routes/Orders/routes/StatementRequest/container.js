// @flow
import { connect } from 'react-redux'

import StatementRequest from './StatementRequest'

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    statements: state.orders.statements,
    query: state.location.query,
    isFetching: state.orders.isFetching
  }
}

export default connect(mapStateToProps, mapActionCreators)(StatementRequest)
