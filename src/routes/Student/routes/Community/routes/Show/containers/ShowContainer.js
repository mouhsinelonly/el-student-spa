import { connect } from 'react-redux'
import { createCommunityPost } from 'routes/Student/modules/community'
import { toggleSupportFloatingButton } from 'modules/ui'

import Show from '../components/Show'

const mapActionCreators = {
  createCommunityPost,
  toggleSupportFloatingButton
}

const mapStateToProps = (state) => {
  return {
    posts: state.studentCommunity.posts,
    inserting: state.studentCommunity.inserting,
    serverdate: state.serverdate
  }
}

export default connect(mapStateToProps, mapActionCreators)(Show)
