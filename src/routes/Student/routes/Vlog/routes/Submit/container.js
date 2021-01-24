// @flow
import { connect } from 'react-redux'
import { storeVlog } from 'routes/Student/modules/vlogs'

import Home from './Home'

const mapActionCreators = {
  storeVlog
}

const mapStateToProps = (state: Object): Object => {
  return {
    period: state.vlogs.active,
    loading: state.vlogs.inserting
  }
}

export default connect(mapStateToProps, mapActionCreators)(Home)
