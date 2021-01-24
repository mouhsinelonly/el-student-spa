import { postAcceptRecording } from 'routes/Student/modules/quran'
import { actions as thesisActions, postConfirmTeacher, postChooseTitle } from 'routes/Student/modules/thesis'
import { resetRecorder } from 'components/HTML5VideoRecorder/module'
import { resetQuranRecording } from 'routes/Student/routes/Exams/routes/QuranV2/modules/quran_recorder'
import { resetRecorderInstance } from 'routes/Student/routes/Exams/routes/QuranV2/module'
import { isEmpty } from 'utils'
const { postChooseTeacher } = thesisActions
// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_GLOBAL_MODAL = 'modals.SHOW_GLOBAL_MODAL'
export const HIDE_GLOBAL_MODAL = 'modals.HIDE_GLOBAL_MODAL'
export const TOGGLE_MODAL_VISIBILITY = 'modals.TOGGLE_MODAL_VISIBILITY'
export const ANSWER_YES = 'modals.ANSWER_YES'
export const ANSWER_NO = 'modals.ANSWER_NO'

// ------------------------------------
// Actions
// ------------------------------------
//
//
export function answerYes () {
  return (dispatch, getState) => {
    const quranState = getState().quran
    const modalsState = getState().modals
    if (quranState && modalsState) {
      if (modalsState.name === 'yes' && modalsState.data && modalsState.data.tag === 'THESIS_TEACHER_CHOSEN') {
        dispatch(postConfirmTeacher())
      }
      if (modalsState.name === 'yesno' && modalsState.data && modalsState.data.tag === 'THESIS_TITLE_CHOSEN') {
        dispatch(postChooseTitle({ id: modalsState.data.titleId }))
      } else if (modalsState.name === 'yesno' &&
      modalsState.data &&
      modalsState.data.tag === 'QURAN_RECORDING_ACCEPT') {
        dispatch(postAcceptRecording(modalsState.data.subjectId))
      } else if (modalsState.name === 'yesno' && modalsState.data && modalsState.data.tag === 'THESIS_CHOOSE_TEACHER') {
        dispatch(postChooseTeacher(modalsState.data.teacherId))
      } else if (modalsState.name === 'yesno' && modalsState.data && modalsState.data.tag === 'THESIS_CHOOSE_TEACHER') {
        dispatch(postChooseTeacher(modalsState.data.teacherId))
      } else if (modalsState.name === 'yesno' && modalsState.data && modalsState.data.tag === 'QURAN_RECORDING_RETRY') {
        // console.log('retru')
        dispatch(resetRecorder())
        dispatch(resetQuranRecording())
        dispatch(resetRecorderInstance())
      }
    }
    dispatch({
      type: ANSWER_YES
    })
  }
}

export function answerNo () {
  return (dispatch) => {
    dispatch({
      type: ANSWER_NO
    })
  }
}

export function showModal (name = '', data = {}, closable = true, fixed = false, size = '') {
  return {
    type: SHOW_GLOBAL_MODAL,
    payload: {
      name,
      data,
      size,
      closable,
      fixed
    }
  }
}
export function closeModal () {
  return {
    type: HIDE_GLOBAL_MODAL
  }
}

export function toggleModalVisibility (visible = false) {
  return {
    type: TOGGLE_MODAL_VISIBILITY,
    payload: visible
  }
}

export const actions = {
  showModal,
  closeModal,
  answerYes,
  answerNo
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_GLOBAL_MODAL]: (state, action) =>
  Object.assign({}, state, { name: action.payload.name,
    data: action.payload.data,
    size: action.payload.size,
    fixed: action.payload.fixed,
    closable: action.payload.closable,
    visible: true }),
  [HIDE_GLOBAL_MODAL]: (state, action) => Object.assign({}, state, { visible: false, data: {} }),
  [TOGGLE_MODAL_VISIBILITY]: (state, action) => Object.assign({}, state, { visible: isEmpty(state.data) ? false : action.payload }),
  [ANSWER_YES]: (state, action) => Object.assign({}, state, { visible: false })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  size: '',
  visible: false,
  fixed: false,
  closable: true,
  name: '',
  data: {}
}

export default function globalModalsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
