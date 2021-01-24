import { connect } from 'react-redux'

import App from './App'

const mapActionCreators = {}

const mapStateToProps = (state) => {
  return {
    appVersion: state.ui.appVersion
  }
}

export default connect(mapStateToProps, mapActionCreators)(App)
