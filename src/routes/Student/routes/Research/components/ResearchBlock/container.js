import { connect } from 'react-redux'
import {toggleNotesVisiblity, uploadResearch} from 'routes/Student/modules/researches'

import ResearchBlock from './ResearchBlock'

const mapActionCreators = {
  uploadResearch,
  toggleNotesVisiblity
}

const mapStateToProps = (state) => {
  return {
    events: state.semester_events.data,
    serverdate: state.serverdate,
    notesVisible: state.researches.notesVisible,
    uploadedActivities: state.researches.uploadedActivities,
    savingIds: state.researches.savingIds
  }
}

export default connect(mapStateToProps, mapActionCreators)(ResearchBlock)
