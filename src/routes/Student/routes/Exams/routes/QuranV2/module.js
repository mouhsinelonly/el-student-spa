// @flow
// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_RECORDING_STEP = 'quranrecordingv2.CHANGE_RECORDING_STEP'
export const SET_RECORDER_INSTANCE = 'quranrecordingv2.SET_RECORDER_INSTANCE'

export function changeStep (name: string = 'test') {
  return {
    type: CHANGE_RECORDING_STEP,
    payload: name
  }
}

export function resetRecorderInstance () {
  return (dispatch: Function, getState: Function) => {
    const state = getState().quranexamv2
  }
}
export function setRecorderInstance (instance) {
  return {
    type: SET_RECORDER_INSTANCE,
    payload: instance
  }
}

export const actions = {
  changeStep
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGE_RECORDING_STEP]: (state, action) => Object.assign({}, state, { step: action.payload }),
  [SET_RECORDER_INSTANCE]: (state, action) => Object.assign({}, state, { recorder: action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  step: 'test',
  recorder: null
}

export default function quranExamReducer (state: Object = initialState, action: Object) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
