// @flow
import { connect } from 'react-redux'
import CountDownHeader from './index'
const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    serverdate: state.serverdate
  }
}

export default connect(mapStateToProps, mapActionCreators)(CountDownHeader)
