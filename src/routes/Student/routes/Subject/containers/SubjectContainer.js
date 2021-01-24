// @flow
import { connect } from 'react-redux'
import { showLessonMenu, hideLessonMenu } from 'routes/Student/modules/ui'
import { getLessons, setActiveSubjectLesson } from 'routes/Student/modules/lessons'
import { getSubjectLessons } from 'routes/Student/modules/subjects'
import { showMoreQuranSubject, hideMoreQuranSubject } from '../modules/quran_subject'

import Subject from '../components/Subject'

const mapActionCreators = {
  getLessons,
  showMoreQuranSubject,
  hideMoreQuranSubject,
  setActiveSubjectLesson,
  getSubjectLessons,
  showLessonMenu,
  hideLessonMenu
}

const mapStateToProps = (state: Object): Object => {
  return {
    // lessons: state.lessons.data,
    sessions: state.sessions.data,
    events: state.semester_events.data,
    serverdate: state.serverdate,
    subjects: state.subjects.data,
    loading: state.subjects.loading,
    loadingLessons: state.subjects.loadingLessons,
    active: state.lessons.active,
    lessonmenuvisible: state.studentui.lessonmenuvisible,
    isMobile: state.ui.isMobile,
    showmore: state.quran_subject.showmore
  }
}

export default connect(mapStateToProps, mapActionCreators)(Subject)
