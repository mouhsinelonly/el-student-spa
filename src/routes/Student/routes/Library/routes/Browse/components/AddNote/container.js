import { connect } from 'react-redux'
import {setHilightedPopUpVisibility, setHilightedText, storeNote} from 'routes/Student/modules/library'

import AddNote from './AddNote'

const mapActionCreators = {
  storeNote,
  setHilightedPopUpVisibility,
  setHilightedText
}

const mapStateToProps = (state) => {
  return {
    x: state.library.hilighted.x,
    y: state.library.hilighted.y,
    page: state.library.hilighted.page,
    popupVisible: state.library.hilighted.popup,
    text: state.library.hilighted.text
  }
}

export default connect(mapStateToProps, mapActionCreators)(AddNote)
