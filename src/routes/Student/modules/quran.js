import request from 'superagent'
import update from 'immutability-helper'
import { APIBASE } from 'utils'
import { RESET_RECORDER } from 'components/HTML5VideoRecorder/module'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_QURAN_RECORDINGS_REQUEST = 'GET_QURAN_RECORDINGS_REQUEST'
export const GET_QURAN_RECORDINGS_FAILURE = 'GET_QURAN_RECORDINGS_FAILURE'
export const GET_QURAN_RECORDINGS_SUCCESS = 'GET_QURAN_RECORDINGS_SUCCESS'
export const GET_QURAN_RECORDINGS_LOADED = 'GET_QURAN_RECORDINGS_LOADED'

export const STORE_QURAN_RECORDINGS_REQUEST = 'STORE_QURAN_RECORDINGS_REQUEST'
export const STORE_QURAN_RECORDINGS_FAILURE = 'STORE_QURAN_RECORDINGS_FAILURE'
export const STORE_QURAN_RECORDINGS_SUCCESS = 'STORE_QURAN_RECORDINGS_SUCCESS'

export const GET_QURAN_EXTENDS_REQUEST = 'GET_QURAN_EXTENDS_REQUEST'
export const GET_QURAN_EXTENDS_FAILURE = 'GET_QURAN_EXTENDS_FAILURE'
export const GET_QURAN_EXTENDS_SUCCESS = 'GET_QURAN_EXTENDS_SUCCESS'

export const GET_QURAN_PAGES_REQUEST = 'GET_QURAN_PAGES_REQUEST'
export const GET_QURAN_PAGES_FAILURE = 'GET_QURAN_PAGES_FAILURE'
export const GET_QURAN_PAGES_SUCCESS = 'GET_QURAN_PAGES_SUCCESS'

export const POST_QURAN_ACCEPT_RECORDING_REQUEST = 'POST_QURAN_ACCEPT_RECORDING_REQUEST'
export const POST_QURAN_ACCEPT_RECORDING_SUCCESS = 'POST_QURAN_ACCEPT_RECORDING_SUCCESS'

export const DECREASE_REMAINING_REQUEST = 'quran.DECREASE_REMAINING_REQUEST'
export const DECREASE_REMAINING_SUCCESS = 'quran.DECREASE_REMAINING_SUCCESS'

export const TOGGLE_QURAN_EXAM_RULES = 'TOGGLE_QURAN_EXAM_RULES'
// api/quran/accept
// ------------------------------------
// Actions
// ------------------------------------
//

// store quran recording
export function toggleQuranExamRules (visible = false) {
  return {
    type: TOGGLE_QURAN_EXAM_RULES,
    payload: visible
  }
}

export function resetRecorder () {
  return {
    type: RESET_RECORDER
  }
}

function storeQuranRecordingSuccess (recording = {}) {
  return {
    type: STORE_QURAN_RECORDINGS_SUCCESS,
    payload: recording
  }
}
function storeQuranRecordingRequest () {
  return {
    type: STORE_QURAN_RECORDINGS_REQUEST
  }
}

export function storeQuranRecording (subjectId = 0, pageNumber = 0, streamName = '', streamDuration = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(storeQuranRecordingRequest())
    return request.post(APIBASE + '/api/quran/store')
      .set('x-access-token', token)
      .send({ quran_video: streamName, page: pageNumber, subject_id: subjectId })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(storeQuranRecordingSuccess(res.body))
        } else {

        }
      })
  }
}
// store quran recording
function postAcceptRecordingSuccess (recording = {}) {
  return {
    type: POST_QURAN_ACCEPT_RECORDING_SUCCESS,
    payload: recording
  }
}
function postAcceptRecordingRequest () {
  return {
    type: POST_QURAN_ACCEPT_RECORDING_REQUEST
  }
}

export function postAcceptRecording (subjectId = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(postAcceptRecordingRequest())
    return request.post(APIBASE + '/api/quran/accept')
      .set('x-access-token', token)
      .send({ subject_id: subjectId })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(postAcceptRecordingSuccess(res.body))
        } else {

        }
      })
  }
}
// decrease remaining retries

function decreaseRemainingRequest () {
  return {
    type: DECREASE_REMAINING_REQUEST
  }
}

export function decreaseRemaining (subjectId = 0) {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(decreaseRemainingRequest())
    return request.post(APIBASE + '/api/quran/recording_started')
      .set('x-access-token', token)
      .send({ subject_id: subjectId })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(postAcceptRecordingSuccess(res.body))
        } else {

        }
      })
  }
}

// get auran recordings
function getQuranRecordingsLoaded (data = []) {
  return {
    type: GET_QURAN_RECORDINGS_LOADED
  }
}
function getQuranRecordingsSuccess (data = []) {
  return {
    type: GET_QURAN_RECORDINGS_SUCCESS,
    payload: data
  }
}
function getQuranRecordingsRequest () {
  return {
    type: GET_QURAN_RECORDINGS_REQUEST
  }
}

export function getQuranRecordings () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getQuranRecordingsRequest())
    let lastupdatedrecordings = state.quran.lastupdatedrecordings
    if (lastupdatedrecordings !== null) {
      const now = new Date()
      const dif = lastupdatedrecordings - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getQuranRecordingsLoaded())
        return {}
      }
    }

    return request.get(APIBASE + '/api/quran/recordings/all')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getQuranRecordingsSuccess(res.body))
        } else {

        }
      })
  }
}

// get quran extends for student
function getQuranExtendsSuccess (data = []) {
  return {
    type: GET_QURAN_EXTENDS_SUCCESS,
    payload: data
  }
}
function getQuranExtendsRequest () {
  return {
    type: GET_QURAN_EXTENDS_REQUEST
  }
}

export function getQuranExtends () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getQuranExtendsRequest())
    let lastupdatedextends = state.quran.lastupdatedextends
    if (lastupdatedextends !== null) {
      const now = new Date()
      const dif = lastupdatedextends - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getQuranExtendsSuccess(state.quran.extendings))
        return {}
      }
    }

    return request.get(APIBASE + '/api/quran/extendings/all')
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getQuranExtendsSuccess(res.body))
        } else {

        }
      })
  }
}

// get quran pages
function getQuranPagesSuccess (data = []) {
  return {
    type: GET_QURAN_PAGES_SUCCESS,
    payload: data
  }
}
function getQuranPagesRequest () {
  return {
    type: GET_QURAN_PAGES_REQUEST
  }
}

export function getQuranPages () {
  return function (dispatch, getState) {
    const state = getState()
    const token = state.auth.token
    dispatch(getQuranPagesRequest())
    let lastupdatedpages = state.quran.lastupdatedpages
    if (lastupdatedpages !== null) {
      const now = new Date()
      const dif = lastupdatedpages - now.getTime()
      const secondsFrom = dif / 1000
      const secondsBetween = Math.abs(secondsFrom)
      if (secondsBetween <= (60 * 60)) {
        dispatch(getQuranPagesSuccess(state.quran.pages))
        return {}
      }
    }

    return request.get(APIBASE + '/api/quran/pages/all')
       .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(getQuranPagesSuccess(res.body))
        } else {

        }
      })
  }
}

export const actions = {
  getQuranRecordings,
  getQuranExtends,
  getQuranPages,
  storeQuranRecording
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_QURAN_RECORDINGS_REQUEST]: (state, action) => Object.assign({}, state, {
    recordingsloading: true
  }),
  [GET_QURAN_RECORDINGS_SUCCESS]: (state, action) => {
    let _recordings = {}

    for (let recording of action.payload) {
      _recordings = {
        ..._recordings,
        ['recording-' + recording.id]: recording
      }
    }
    return Object.assign({}, state, {
      recordings: _recordings,
      recordingsloading: false,
      lastupdatedrecordings: new Date().getTime()
    })
  },
  [GET_QURAN_PAGES_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      pages: action.payload,
      pagesloading: false,
      lastupdatedpages: new Date().getTime()
    })
  },
  [GET_QURAN_PAGES_REQUEST]: (state, action) => Object.assign({}, state, {
    pagesloading: true
  }),
  [STORE_QURAN_RECORDINGS_SUCCESS]: (state, action) => {
    let recordings
    const subjectExtendings = state.extendings.filter(e => e.subject_id === action.payload.subject_id)
    let extendIndex
    let extend
    if (subjectExtendings.length) {
      extendIndex = subjectExtendings.length - 1
      extend = subjectExtendings[extendIndex]
    }
    let extendings = []
    if (extend) {
      extendings = update(state.extendings, {
        [extendIndex]: { $merge: { maximum_recordings: extend.maximum_recordings - 1 } }
      })
    }

    recordings = update(state.recordings, { ['recording-' + action.payload.id]: { $set: action.payload } })

    return Object.assign({}, state, {
      recordings: recordings,
      extendings: extendings
    })
  },
  [POST_QURAN_ACCEPT_RECORDING_SUCCESS]: (state, action) => {
    // const recording = state.recordings['recording-' + action.payload.id]
    const subjectExtendings = state.extendings.filter(e => e.subject_id === action.payload.subject_id)
    let extendIndex
    let extend
    if (subjectExtendings.length) {
      extendIndex = subjectExtendings.length - 1
      extend = subjectExtendings[extendIndex]
    }
    let extendings = []
    if (extend) {
      extendings = update(state.extendings, {
        [extendIndex]: { $merge: { maximum_recordings: 0 } }
      })
    }
    // console.log(extendings)
    return Object.assign({}, state, {
      recordings: update(state.recordings, { ['recording-' + action.payload.id]: { $set: action.payload } }),
      extendings: extendings
    })
  },
  [GET_QURAN_EXTENDS_REQUEST]: (state, action) => Object.assign({}, state, {
    extendsloading: true
  }),
  [GET_QURAN_EXTENDS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      extendings: action.payload,
      extendsloading: false,
      lastupdatedextends: new Date().getTime()
    })
  },
  [GET_QURAN_RECORDINGS_LOADED]: (state, action) => {
    return Object.assign({}, state, {
      recordingsloading: false
    })
  },
  [TOGGLE_QURAN_EXAM_RULES]: (state, action) => {
    return Object.assign({}, state, {
      rulesvisible: action.payload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  recordings: {},
  extendings: [],
  pages: [],
  rulesvisible: true,
  recordingsloading: false,
  extendsloading: false,
  pagesloading: false,
  lastupdatedrecordings: null,
  lastupdatedpages: null,
  lastupdatedextends: null
}

export default function quranReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
