import request from 'superagent'
import update from 'immutability-helper'
import {addFileProgress, removeFileProgress, incrementFileProgress} from 'modules/upload'
import laroute from 'utils/laroute.js'

export const UPLOAD_QURAN_RECORDING_FILE_SUCCESS = 'UPLOAD_QURAN_RECORDING_FILE_SUCCESS'
export const UPLOAD_QURAN_RECORDING_FILE_REQUEST = 'UPLOAD_QURAN_RECORDING_FILE_REQUEST'
export const UPLOAD_QURAN_RECORDING_FILE_FAILURE = 'UPLOAD_QURAN_RECORDING_FILE_FAILURE'

export const SEND_QURAN_RECORDING_ORDER_SUCCESS = 'SEND_QURAN_RECORDING_ORDER_SUCCESS'
export const SEND_QURAN_RECORDING_ORDER_REQUEST = 'SEND_QURAN_RECORDING_ORDER_REQUEST'
export const SEND_QURAN_RECORDING_ORDER_FAILURE = 'SEND_QURAN_RECORDING_ORDER_FAILURE'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_QURAN_RECORDING_ACTIVE_PAGE = 'SET_QURAN_RECORDING_ACTIVE_PAGE'

// ------------------------------------
// Actions
// ------------------------------------
//

// set active form page
export function setQuranRecordingActivePage (active = 0) {
  return {
    type: SET_QURAN_RECORDING_ACTIVE_PAGE,
    payload: active
  }
}
// send the order
export function sendQuranRecordingOrder (values = {}) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(sendQuranRecordingOrderRequest())
    return request.post(laroute.route('api.v1.students.orders.quran_recording_excuses.store'))
    .set('Authorization', 'Bearer ' + token)
    .send(values)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then(res => {
      dispatch(sendQuranRecordingOrderSuccess(res.body))
    }).catch(err => {
      dispatch(sendQuranRecordingOrderFailure(err.response.body))
    })
  }
}
function sendQuranRecordingOrderRequest () {
  return {
    type: SEND_QURAN_RECORDING_ORDER_REQUEST
  }
}
function sendQuranRecordingOrderFailure () {
  return {
    type: SEND_QURAN_RECORDING_ORDER_FAILURE
  }
}
function sendQuranRecordingOrderSuccess (order = {}) {
  return {
    type: SEND_QURAN_RECORDING_ORDER_SUCCESS,
    payload: order
  }
}
// upload a file for the order
function uploadFileSuccess ({id, file}, index = 0) {
  return {
    type: UPLOAD_QURAN_RECORDING_FILE_SUCCESS,
    payload: {
      preview: file.original,
      id,
      index
    }
  }
}

function uploadFileError () {
  return {
    type: UPLOAD_QURAN_RECORDING_FILE_FAILURE
  }
}

function uploadFileRequest () {
  return {
    type: UPLOAD_QURAN_RECORDING_FILE_REQUEST
  }
}

export function uploadFile (files = [], type = '', index = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    const req = request.post(laroute.route('api.v1.students.orders.upload'))
    .set('Authorization', 'Bearer ' + token)

    dispatch(uploadFileRequest())
    dispatch(addFileProgress(type))
    files.forEach((file) => req.attach('file', file))
    req.field('type', type)
    .on('progress', (e) => {
      dispatch(incrementFileProgress(type, e.percent))
    })
    .then((res) => {
      dispatch(removeFileProgress(type))

      if (res.ok) {
        dispatch(uploadFileSuccess(res.body, index))
      } else {
        dispatch(uploadFileError())
      }
    })

    return req
  }
}
export const actions = {
  setQuranRecordingActivePage,
  uploadFile,
  sendQuranRecordingOrder
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_QURAN_RECORDING_ACTIVE_PAGE]: (state, action) => Object.assign({}, state, {
    active: action.payload
  }),
  [SEND_QURAN_RECORDING_ORDER_REQUEST]: (state, action) => Object.assign({}, state, {
    submitting: true
  }),
  [SEND_QURAN_RECORDING_ORDER_FAILURE]: (state, action) => Object.assign({}, state, {
    submitting: false,
    active: 1
  }),
  [SEND_QURAN_RECORDING_ORDER_SUCCESS]: (state, action) => Object.assign({}, state, {
    submitting: false,
    files: [],
    active: 1,
    orders: update(state.orders, {$unshift: [action.payload]})
  }),
  [UPLOAD_QURAN_RECORDING_FILE_SUCCESS]: (state, action) => Object.assign({}, state, {
    files: update(state.files, {$push: [{
      preview: action.payload.preview,
      index: action.payload.index,
      id: action.payload.id
    }]})
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  active: 1,
  submitting: false,
  files: [],
  orders: []
}

export default function quranRecordingsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
