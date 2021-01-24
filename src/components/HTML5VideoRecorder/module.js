// ------------------------------------
// Constants
// ------------------------------------
import request from 'superagent'
const INCREMENT_RECORDED = 'html5recorder.INCREMENT_RECORDED'
const START = 'html5recorder.START'
export const RESET_RECORDER = 'html5recorder.RESET_RECORDER'
const UPLOAD_PERCENTAGE = 'html5recorder.UPLOAD_PERCENTAGE'
const UPLOAD_FINISHED = 'html5recorder.UPLOAD_FINISHED'
const UPLOAD_REQUEST = 'html5recorder.UPLOAD_REQUEST'
const SET_BLOB = 'html5recorder.SET_BLOB'
const SET_HAS_CAMERA = 'html5recorder.SET_HAS_CAMERA'
const STOP = 'html5recorder.STOP'
let interval = 0
// ------------------------------------
// Actions
// ------------------------------------
export function start (videoId) {
  return function (dispatch) {
    interval = setInterval(() => {
      dispatch({
        type: INCREMENT_RECORDED
      })
    }, 1000)
    dispatch({
      type: START,
      payload: videoId
    })
  }
}

export function upload (blob, videoId) {
  return dispatch => {
    dispatch(uploadRequest())
    return request
      .post('https://tilawa.el-css.edu.om/upload')
      .field('filename', videoId)
      .attach('stream_name', blob)
      .on('progress', function (e) {
        dispatch(uploadingPercentage(e.percent))
      })
      .then(() => {
        dispatch(uploadFinished())
      })
      .catch((res, err) => {

      })
  }
}

export function stop () {
  return dispatch => {
    clearInterval(interval)
    dispatch({
      type: STOP
    })
  }
}

export function resetRecorder () {
  return {
    type: RESET_RECORDER
  }
}

export function uploadRequest () {
  return {
    type: UPLOAD_REQUEST
  }
}

export function setBlob (blob) {
  return {
    type: SET_BLOB,
    payload: blob
  }
}

export function uploadingPercentage (percentage) {
  return {
    type: UPLOAD_PERCENTAGE,
    payload: percentage
  }
}

export function uploadFinished () {
  return {
    type: UPLOAD_FINISHED
  }
}

export function setHasCamera (status = false) {
  return {
    type: SET_HAS_CAMERA,
    payload: status
  }
}

export const actions = {
  start,
  uploadingPercentage,
  stop
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INCREMENT_RECORDED]: (state, action) => Object.assign({}, state, {
    recordedSeconds: state.recordedSeconds + 1
  }),
  [START]: (state, action) =>
    Object.assign({}, state, {
      recording: true, recordedSeconds: 0, videoId: action.payload
    }),
  [STOP]: (state, action) => Object.assign({}, state, { recording: false, recorded: true }),
  [SET_BLOB]: (state, action) => Object.assign({}, state, { blob: action.payload }),
  [UPLOAD_FINISHED]: (state, action) =>
    Object.assign({}, state, {
      uploadPercentage: 0,
      uploading: false,
      uploaded: true
    }),
  [UPLOAD_PERCENTAGE]: (state, action) => Object.assign({}, state, { uploadPercentage: action.payload }),
  [SET_HAS_CAMERA]: (state, action) => Object.assign({}, state, { hasCamera: action.payload }),
  [UPLOAD_REQUEST]: (state, action) => Object.assign({}, state, { uploading: true }),
  [RESET_RECORDER]: (state, action) =>
    Object.assign({}, state, {
      blob: null,
      uploadPercentage: 0,
      uploading: false,
      recording: false,
      recorded: false,
      uploaded: false,
      recordedSeconds: 0,
      maxrecorded: 10,
      volume: 0
    })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  blob: null,
  videoId: 'videoIdRandom',
  uploadPercentage: 0,
  hasCamera: true,
  uploading: false,
  recording: false,
  recorded: false,
  uploaded: false,
  recordedSeconds: 0,
  maxrecorded: 10,
  volume: 0
}

export default function windowReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
