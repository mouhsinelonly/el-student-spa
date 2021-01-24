import { connect } from 'react-redux'
import {setActiveSubjectLesson} from 'routes/Student/modules/lessons'

import LessonMenu from './LessonMenu'

const mapActionCreators = {
  setActiveSubjectLesson
}

const mapStateToProps = (state) => {
  return {
    loading: state.subjects.loading,
    active: state.lessons.active
  }
}

export default connect(mapStateToProps, mapActionCreators)(LessonMenu)
