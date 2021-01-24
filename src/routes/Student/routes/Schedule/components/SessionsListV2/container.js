import { connect } from 'react-redux'

import SessionsListV2 from './SessionsListV2'

const mapStateToProps = (state) => {
  return {
    subjects: state.subjects.data,
    serverdate: state.serverdate
  }
}

export default connect(mapStateToProps)(SessionsListV2)
