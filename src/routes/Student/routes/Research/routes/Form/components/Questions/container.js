import { connect } from 'react-redux'
import {setQuestionVisible, unSetQuestionVisible, storeResearchActivity,
  unlockResearchActivity} from 'routes/Student/modules/researches'
import {updateLocation} from 'store/location'

import Questions from './Questions'

const mapActionCreators = {
  setQuestionVisible,
  unSetQuestionVisible,
  updateLocation,
  storeResearchActivity,
  unlockResearchActivity
}

const mapStateToProps = (state) => {
  return {
    windowHeight: state.studentui.windowHeight,
    visibileQuestions: state.researches.visibileQuestions
  }
}

export default connect(mapStateToProps, mapActionCreators)(Questions)
