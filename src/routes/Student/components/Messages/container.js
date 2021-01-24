// @flow
import { connect } from 'react-redux'

import Messages from './Messages'

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    serverdate: state.serverdate,
    messages: state.messages.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(Messages)
