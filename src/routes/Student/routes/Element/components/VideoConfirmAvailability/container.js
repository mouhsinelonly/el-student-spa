// @flow
import { connect } from 'react-redux'
import VideoConfirmAvailability from './VideoConfirmAvailabilityV2'

const mapActionCreators = {}

const mapStateToProps = (state: Object): Object => {
  return {
    timer: state.elementvideo.timer,
    cycle: state.elementvideo.cycle,
    threshold: state.elementvideo.threshold,
    chance: state.elementvideo.chance,
    seeking: state.elementvideo.seeking,
    showgrademessage: state.elementvideo.showgrademessage,
    videoelement: state.elementvideo.videoelement
  }
}

export default connect(mapStateToProps, mapActionCreators)(VideoConfirmAvailability)
