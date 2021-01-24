// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_QURAN_RECORDER_ACTIVITY_LEVEL = 'quran_recorder.UPDATE_QURAN_RECORDER_ACTIVITY_LEVEL'
export const ENABLE_QURAN_RECORDER_VIDEO_GUIDE = 'quran_recorder.ENABLE_QURAN_RECORDER_VIDEO_GUIDE'
export const DISABLE_QURAN_RECORDER_VIDEO_GUIDE = 'quran_recorder.DISABLE_QURAN_RECORDER_VIDEO_GUIDE'
export const START_QURAN_RECORDER = 'quran_recorder.START_QURAN_RECORDER'
export const STOP_QURAN_RECORDER = 'quran_recorder.STOP_QURAN_RECORDER'
export const SET_QURAN_RECORDER_RANDOM_PAGE = 'quran_recorder.SET_QURAN_RECORDER_RANDOM_PAGE'
export const SET_QURAN_IS_RECORDED = 'quran_recorder.SET_QURAN_IS_RECORDED'
export const RESET_QURAN_RECORDING = 'quran_recorder.RESET_QURAN_RECORDING'

// ------------------------------------
// Actions
// ------------------------------------
//

// SHOW HIDE STUDENT NAVBAR
export function resetQuranRecording () {
  return {
    type: RESET_QURAN_RECORDING
  }
}
export function setRandomPageNumber (number = 0) {
  return {
    type: SET_QURAN_RECORDER_RANDOM_PAGE,
    payload: number
  }
}

export function setQuranRecorded () {
  return {
    type: SET_QURAN_IS_RECORDED
  }
}

export function updateActivityLevel (level = 0) {
  return {
    type: UPDATE_QURAN_RECORDER_ACTIVITY_LEVEL,
    payload: level
  }
}

export function recordingStarted () {
  return {
    type: START_QURAN_RECORDER
  }
}

export function recordingStoped (level = 0) {
  return {
    type: STOP_QURAN_RECORDER
  }
}

export function enableVideoGuide () {
  return {
    type: ENABLE_QURAN_RECORDER_VIDEO_GUIDE
  }
}

export function disableVideoGuide () {
  return {
    type: DISABLE_QURAN_RECORDER_VIDEO_GUIDE
  }
}

export const actions = {
  updateActivityLevel,
  recordingStarted,
  recordingStoped,
  enableVideoGuide,
  disableVideoGuide,
  setQuranRecorded,
  resetQuranRecording,
  setRandomPageNumber
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_QURAN_RECORDER_ACTIVITY_LEVEL]: (state, action) => Object.assign({}, state, { soundlevel: action.payload }),
  [ENABLE_QURAN_RECORDER_VIDEO_GUIDE]: (state, action) => Object.assign({}, state, { videoguideenabled: true }),
  [DISABLE_QURAN_RECORDER_VIDEO_GUIDE]: (state, action) => Object.assign({}, state, { videoguideenabled: false }),
  [START_QURAN_RECORDER]: (state, action) => Object.assign({}, state, { isrecording: true }),
  [SET_QURAN_RECORDER_RANDOM_PAGE]: (state, action) => Object.assign({}, state, { randompagenumber: action.payload }),
  [SET_QURAN_IS_RECORDED]: (state, action) => Object.assign({}, state, { isrecorded: true }),
  [STOP_QURAN_RECORDER]: (state, action) =>
    Object.assign({}, state, {
      isrecording: false
    }),
  [RESET_QURAN_RECORDING]: (state, action) =>
    Object.assign({}, state, {
      isrecording: false,
      isrecorded: false,
      saved: false,
      randompagenumber: 0,
      videoguideenabled: false
    })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  soundlevel: 0,
  isrecording: false,
  isrecorded: false,
  saved: false,
  randompagenumber: 0,
  videoguideenabled: false
}

export default function quranRecorderReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
