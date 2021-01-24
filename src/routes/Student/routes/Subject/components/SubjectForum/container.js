// @flow
import { connect } from 'react-redux'
import { submitForumPost } from 'routes/Student/modules/subjects'
import SubjectForum from './SubjectForum'

const mapActionCreators = {
  submitForumPost
}

const mapStateToProps = (state: Object): Object => {
  return {
    loading: state.subjects.loadingForums,
    forums: state.subjects.forums,
    serverdate: state.serverdate,
    studentId: state.student.profile.id,
    events: state.semester_events.data
  }
}

export default connect(mapStateToProps, mapActionCreators)(SubjectForum)
