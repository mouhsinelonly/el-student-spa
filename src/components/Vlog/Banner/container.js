// @flow
import { connect } from 'react-redux'
import { getVlogs } from 'routes/Student/modules/vlogs'
import Banner from './Banner'

const mapActionCreators = {
  getVlogs
}

const mapStateToProps = (state: Object): Object => {
  return {
    active: state.vlogs.active
  }
}

export default connect(mapStateToProps, mapActionCreators)(Banner)
