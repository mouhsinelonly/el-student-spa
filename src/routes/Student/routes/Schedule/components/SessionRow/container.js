import { connect } from 'react-redux'

import SessionRow from './SessionRow'

const mapStateToProps = (state) => {
  return {
    serverdate: state.serverdate
  }
}

export default connect(mapStateToProps)(SessionRow)
