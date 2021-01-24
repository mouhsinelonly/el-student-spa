import request from 'superagent'
import update from 'immutability-helper'
import { addFileProgress, removeFileProgress, incrementFileProgress } from 'modules/upload'
import laroute from 'utils/laroute.js'

export const UPLOAD_SESSION_EXCUSES_FILE_SUCCESS = 'UPLOAD_SESSION_EXCUSES_FILE_SUCCESS'
export const UPLOAD_SESSION_EXCUSES_FILE_REQUEST = 'UPLOAD_SESSION_EXCUSES_FILE_REQUEST'
export const UPLOAD_SESSION_EXCUSES_FILE_FAILURE = 'UPLOAD_SESSION_EXCUSES_FILE_FAILURE'

export const SEND_SESSION_EXCUSES_ORDER_SUCCESS = 'SEND_SESSION_EXCUSES_ORDER_SUCCESS'
export const SEND_SESSION_EXCUSES_ORDER_REQUEST = 'SEND_SESSION_EXCUSES_ORDER_REQUEST'
export const SEND_SESSION_EXCUSES_ORDER_FAILURE = 'SEND_SESSION_EXCUSES_ORDER_FAILURE'

export const SET_SESSION_EXCUSE_REASON = 'session_excuse.SET_SESSION_EXCUSE_REASON'
export const SET_SESSION_EXCUSE_STEP = 'session_excuse.SET_SESSION_EXCUSE_STEP'
// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------
//

// send the order
export function sendSessionExcusesOrder (values = {}) {
  return function (dispatch, getState) {
    const state = getState()
    const reason = state.session_excuse.reason
    const token = state.auth.token
    dispatch(sendSessionExcusesOrderRequest())
    return request.post(laroute.route('api.v1.students.orders.session_excuses.store'))
    .set('Authorization', 'Bearer ' + token)
    .send(Object.assign(values, { reason }))
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then(res => {
      dispatch(sendSessionExcusesOrderSuccess(res.body))
    }).catch(err => {
      dispatch(sendSessionExcusesOrderFailure(err.response.body))
    })
  }
}
function sendSessionExcusesOrderRequest () {
  return {
    type: SEND_SESSION_EXCUSES_ORDER_REQUEST
  }
}

export function setExcuseReason (reason = '') {
  return {
    type: SET_SESSION_EXCUSE_REASON,
    payload: reason
  }
}

export function changeStep (step = 1) {
  return {
    type: SET_SESSION_EXCUSE_STEP,
    payload: step
  }
}

function sendSessionExcusesOrderFailure () {
  return {
    type: SEND_SESSION_EXCUSES_ORDER_FAILURE
  }
}
function sendSessionExcusesOrderSuccess (order = {}) {
  return {
    type: SEND_SESSION_EXCUSES_ORDER_SUCCESS,
    payload: order
  }
}
// upload a file for the order
function uploadFileSuccess ({ id, file }, index = 0) {
  return {
    type: UPLOAD_SESSION_EXCUSES_FILE_SUCCESS,
    payload: {
      preview: file.original,
      id,
      index
    }
  }
}

function uploadFileError () {
  return {
    type: UPLOAD_SESSION_EXCUSES_FILE_FAILURE
  }
}

function uploadFileRequest () {
  return {
    type: UPLOAD_SESSION_EXCUSES_FILE_REQUEST
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
  uploadFile,
  sendSessionExcusesOrder
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SEND_SESSION_EXCUSES_ORDER_REQUEST]: (state, action) => Object.assign({}, state, {
    submitting: true
  }),
  [SEND_SESSION_EXCUSES_ORDER_FAILURE]: (state, action) => Object.assign({}, state, {
    submitting: false
  }),
  [SET_SESSION_EXCUSE_REASON]: (state, action) => Object.assign({}, state, {
    reason: action.payload
  }),
  [SET_SESSION_EXCUSE_STEP]: (state, action) => Object.assign({}, state, {
    step: action.payload
  }),
  [SEND_SESSION_EXCUSES_ORDER_SUCCESS]: (state, action) => Object.assign({}, state, {
    submitting: false,
    files: [],
    orders: update(state.orders, { $unshift: [action.payload] })
  }),
  [UPLOAD_SESSION_EXCUSES_FILE_SUCCESS]: (state, action) => Object.assign({}, state, {
    files: update(state.files, { $push: [{
      preview: action.payload.preview,
      index: action.payload.index,
      id: action.payload.id
    }] })
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  submitting: false,
  files: [],
  step: 1,
  reason: '',
  orders: []
}

export default function sessionExcusesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
