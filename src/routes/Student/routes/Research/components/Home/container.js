import { connect } from 'react-redux'

import Home from './Home'

const mapActionCreators = {}

const mapStateToProps = (state) => {
  return {
    activities: state.researches.activities,
    serverdate: state.serverdate
  }
}

export default connect(mapStateToProps, mapActionCreators)(Home)
