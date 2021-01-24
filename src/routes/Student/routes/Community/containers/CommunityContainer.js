// @flow
import { connect } from 'react-redux'
import { getCommunityPosts, createCommunityPost,
  setCommunitySearchQuery, setCommunityTab, getMyCommunityPosts }
from 'routes/Student/modules/community'
import { toggleSupportFloatingButton } from 'modules/ui'
import Community from '../components/Community'

const mapActionCreators = {
  getCommunityPosts,
  toggleSupportFloatingButton,
  setCommunitySearchQuery,
  createCommunityPost,
  setCommunityTab,
  getMyCommunityPosts
}

const mapStateToProps = (state: Object): Object => {
  return {
    posts: state.studentCommunity.posts,
    pagination: state.studentCommunity.pagination,
    mypagination: state.studentCommunity.mypagination,
    insertingIds: state.studentCommunity.inserting,
    likingIds: state.studentCommunity.liking,
    student: state.student.profile,
    sessions: state.sessions.data,
    serverdate: state.serverdate,
    query: state.studentCommunity.query,
    // reasearchActivities: state.researches.activities,
    tab: state.studentCommunity.tab
  }
}

export default connect(mapStateToProps, mapActionCreators)(Community)
