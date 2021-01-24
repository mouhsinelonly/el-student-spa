import { connect } from 'react-redux'

import Details from './Details'

const mapActionCreators = {}

const mapStateToProps = (state) => {
  return {
    activities: state.researches.activities
  }
}

export default connect(mapStateToProps, mapActionCreators)(Details)
