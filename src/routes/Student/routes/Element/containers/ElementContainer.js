// @flow
import { connect } from 'react-redux'
import { setActiveSubjectLesson } from 'routes/Student/modules/lessons'
import { showLessonMenu, hideLessonMenu, showStudentNavbar, hideStudentNavbar } from 'routes/Student/modules/ui'
import { getElementPosts, createElementPost, likeElementPost } from '../modules/community'
import {
  startWatching,
  watchingPaused,
  resetWatching,
  setWatchingElementId,
  setVideoWatched
} from 'routes/Student/modules/element_video'

import Element from '../components/Element'

const mapActionCreators = {
  setActiveSubjectLesson,
  likeElementPost,
  showStudentNavbar,
  hideStudentNavbar,
  showLessonMenu,
  hideLessonMenu,
  getElementPosts,
  createElementPost,
  startWatching,
  watchingPaused,
  resetWatching,
  setWatchingElementId,
  setVideoWatched
}

const mapStateToProps = (state: Object): Object => {
  return {
    subjects: state.subjects.data,
    events: state.semester_events.data,
    serverdate: state.serverdate,
    loading: state.subjects.loading,
    activeLesson: state.lessons.active,
    lessonmenuvisible: state.studentui.lessonmenuvisible,
    posts: state.element_community.posts,
    seeking: state.elementvideo.seeking,
    pagination: state.element_community.pagination,
    videoTimer: state.elementvideo.timer,
    watchedLoading: state.elementvideo.watchedLoading,
    currentWatchingElementId: state.elementvideo.currentWatchingElementId,
    insertingIds: state.element_community.inserting,
    likingIds: state.element_community.liking,
    student: state.student.profile
  }
}

export default connect(mapStateToProps, mapActionCreators)(Element)
