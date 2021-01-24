import { connect } from 'react-redux'
import { incrementServerTime } from './modules'
import Sandbox from './components/Sandbox'

const mapActionCreators = {
  incrementServerTime
}

const mapStateToProps = (state) => {
  return {
    servertime: state.sandbox.servertime
  }
}

export default connect(mapStateToProps, mapActionCreators)(Sandbox)
