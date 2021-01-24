import { connect } from 'react-redux'
import {createCommunityPost}
from 'routes/Student/modules/community'

import Create from '../components/Create'

const mapActionCreators = {
  createCommunityPost
}

const mapStateToProps = (state) => {
  return {
    inserting: state.studentCommunity.inserting
  }
}

export default connect(mapStateToProps, mapActionCreators)(Create)
