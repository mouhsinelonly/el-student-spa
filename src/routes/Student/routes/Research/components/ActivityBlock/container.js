import { connect } from 'react-redux'
import {toggleNotesVisiblity} from 'routes/Student/modules/researches'

import ActivityBlock from './ActivityBlock'

const mapActionCreators = {
  toggleNotesVisiblity
}

const mapStateToProps = (state) => {
  return {
    serverdate: state.serverdate,
    notesVisible: state.researches.notesVisible,
    savingIds: state.researches.savingIds
  }
}

export default connect(mapStateToProps, mapActionCreators)(ActivityBlock)
