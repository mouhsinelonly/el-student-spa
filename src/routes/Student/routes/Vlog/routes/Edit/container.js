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
    firstTime: state.vlogs.firstTime,
    profile: state.student.profile
  }
}

export default connect(mapStateToProps, mapActionCreators)(Home)
