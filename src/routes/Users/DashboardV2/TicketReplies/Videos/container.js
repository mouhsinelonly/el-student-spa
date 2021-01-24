// @flow
import { connect } from 'react-redux'
import { toggleVideosVisibility } from 'routes/Users/modules/tickets'

import Videos from './Videos'
const mapActionCreators = {
  toggleVideosVisibility
}

const mapStateToProps = (state: Object): Object => {
  return {
    visible: state.user_tickets.videosVisible,
    videosLoading: state.user_tickets.videosLoading,
    videos: state.user_tickets.videos
  }
}

export default connect(mapStateToProps, mapActionCreators)(Videos)
