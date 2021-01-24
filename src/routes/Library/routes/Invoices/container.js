// @flow
import { connect } from 'react-redux'

import Invoices from './Invoices'

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    profile: state.library_account.profile
  }
}

export default connect(mapStateToProps, mapActionCreators)(Invoices)
