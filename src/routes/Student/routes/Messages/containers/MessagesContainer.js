import { connect } from 'react-redux'

import Messages from '../components/Messages'

const mapActionCreators = {
}

const mapStateToProps = (state) => {
  return {
    loading: state.messages.loading,
    messages: state.messages.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(Messages)
